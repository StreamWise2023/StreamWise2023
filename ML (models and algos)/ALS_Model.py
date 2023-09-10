from pyspark.sql import SparkSession
from pyspark.ml.recommendation import ALS
from pyspark.ml.feature import StringIndexer
from pyspark.sql import functions as F
from pyspark.ml import Pipeline

# Инициализация Spark
spark = SparkSession.builder.appName('rutube_recommender').getOrCreate()

# Загрузка данных
player_starts_train = spark.read.parquet('player_starts_train.parquet')
emotions = spark.read.csv('emotions.csv', header=True)
videos = spark.read.parquet('videos.parquet')

# Предобработка: преобразование строковых идентификаторов в числовые
string_columns = ['user_id', 'item_id']
indexers = [StringIndexer(inputCol=column, outputCol=f"{column}_index") for column in string_columns]

# Создание конвейера для преобразования данных
pipeline = Pipeline(stages=indexers)
pipeline_model = pipeline.fit(player_starts_train)
player_starts_train = pipeline_model.transform(player_starts_train)

# Формирование датасета для обучения ALS модели
# (Можно добавить дополнительные признаки и условия на основе вашего датасета)
als_data = player_starts_train.select(
    F.col("user_id_index").alias("user"),
    F.col("item_id_index").alias("item"),
    F.col("watch_time").alias("rating")
)

# Обучение ALS модели
als = ALS(
    userCol="user",
    itemCol="item",
    ratingCol="rating",
    coldStartStrategy="drop",
    nonnegative=True
)
model = als.fit(als_data)

# Получение рекомендаций
recommendations = model.recommendForAllUsers(10)

# Обратное преобразование индексов в оригинальные идентификаторы
# и экспорт результатов в CSV
recommendations = recommendations.join(pipeline_model.stages[0].labels, F.col("user") == F.col("user_id_index"), "left")
recommendations = recommendations.select("user_id", F.col("recommendations.item").alias("recs"))
recommendations = recommendations.withColumn("recs", F.expr("transform(recs, x -> cast(x as string))"))
recommendations = recommendations.withColumn("recs", F.concat_ws(", ", F.col("recs")))

recommendations.write.csv('rutube_recommendations.csv')
