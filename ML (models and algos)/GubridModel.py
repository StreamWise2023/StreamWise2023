import pandas as pd
import numpy as np
from sklearn.metrics import average_precision_score
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity
from time import time

# Загрузка данных
player_starts_train = pd.read_parquet('player_starts_train.parquet')
videos = pd.read_parquet('videos.parquet')
emotions = pd.read_csv('emotions.csv')

# Слияние данных в один DataFrame
df_merged = pd.merge(player_starts_train, videos, on='video_id', how='left')
df_merged = pd.merge(df_merged, emotions, on=['user_id', 'video_id'], how='left')

# Label Encoding
user_enc = LabelEncoder()
video_enc = LabelEncoder()

df_merged['user'] = user_enc.fit_transform(df_merged['user_id'])
df_merged['item'] = video_enc.fit_transform(df_merged['video_id'])

# Создание user-item матрицы
user_item_matrix = pd.pivot_table(df_merged, index='user', columns='item', values='watch_time', aggfunc='sum',
                                  fill_value=0).values

# SVD
n_components = 50
svd = TruncatedSVD(n_components=n_components)
U = svd.fit_transform(user_item_matrix)
Vt = svd.components_


# Функция рекомендации
def hybrid_recommendations(user_id):
    user_idx = user_enc.transform([user_id])[0]
    user_profile = U[user_idx]

    # Вычисление косинусной близости
    cos_similarity = cosine_similarity(user_profile.reshape(1, -1), U).flatten()

    # Получение индексов наиболее похожих пользователей
    similar_users = cos_similarity.argsort()[-10:][::-1]

    # Составление рекомендаций
    similar_users_matrix = user_item_matrix[similar_users, :]
    rec_vector = similar_users_matrix.mean(axis=0)
    item_idx_recommend = np.argsort(rec_vector)[-10:][::-1]

    recs = video_enc.inverse_transform(item_idx_recommend)
    return recs


# Тестирование и метрики
map_scores = []
inference_times = []

user_ids = df_merged['user_id'].unique()[:10]  # Ограничиваем для демонстрации

for user_id in user_ids:
    start_time = time()

    recs = hybrid_recommendations(user_id)

    end_time = time()
    inference_times.append(end_time - start_time)

    true_data = df_merged[df_merged['user_id'] == user_id]['video_id'].unique().tolist()
    y_pred = [1 if r in true_data else 0 for r in recs]

    map_scores.append(average_precision_score([1] * len(true_data), y_pred))

final_map = np.mean(map_scores)
final_inference_time = np.mean(inference_times)

print(f"Final MAP: {final_map}")
print(f"Average Inference Time: {final_inference_time} seconds")
