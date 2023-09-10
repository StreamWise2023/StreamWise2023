from pyspark.sql import SparkSession
from pyspark.ml.recommendation import ALS
from pyspark.ml.feature import StringIndexer
from pyspark.sql import functions as F
from pyspark.ml import Pipeline
from tqdm import tqdm
import csv

# Инициализация Spark
print("Initializing Spark...")
spark = SparkSession.builder.appName('rutube_recommender').getOrCreate()

# Загрузка данных
print("Loading data...")
player_starts_train = spark.read.parquet('player_starts_train.parquet')
emotions = spark.read.csv('emotions.csv', header=True)
videos = spark.read.parquet('videos.parquet')

# Предобработка: преобразование строковых идентификаторов в числовые
print("Preprocessing data...")
string_columns = ['user_id', 'item_id']
indexers = [StringIndexer(inputCol=column, outputCol=f"{column}_index") for column in string_columns]

# Создание конвейера для преобразования данных
pipeline = Pipeline(stages=indexers)
pipeline_model = pipeline.fit(player_starts_train)
player_starts_train = pipeline_model.transform(player_starts_train)

# Формирование датасета для обучения ALS модели
print("Preparing ALS dataset...")
als_data = player_starts_train.select(
    F.col("user_id_index").alias("user"),
    F.col("item_id_index").alias("item"),
    F.col("watch_time").alias("rating")
)

# Обучение ALS модели
print("Training ALS model...")
als = ALS(
    userCol="user",
    itemCol="item",
    ratingCol="rating",
    coldStartStrategy="drop",
    nonnegative=True
)
model = als.fit(als_data)

# Получение рекомендаций и запись в файл
print("Generating and saving recommendations...")
with open('rutube_recommendations.csv', 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(['user_id', 'recs'])

    user_ids = [row.user for row in als_data.select('user').distinct().collect()]
    for user_id in tqdm(user_ids):
        single_user = als_data.filter(als_data['user'] == user_id)
        recommendations = model.recommendForUserSubset(single_user, 10)

        # Обратное преобразование индексов в оригинальные идентификаторы
        recommendations = recommendations.join(
            pipeline_model.stages[0].labels,
            F.col("user") == F.col("user_id_index"),
            "left"
        )
        recommendations = recommendations.select("user_id", F.col("recommendations.item").alias("recs"))

        # Преобразование идентификаторов
        recs_list = [str(row.item) for row in recommendations.select("recs").collect()]
        csvwriter.writerow([user_id, ", ".join(recs_list)])
