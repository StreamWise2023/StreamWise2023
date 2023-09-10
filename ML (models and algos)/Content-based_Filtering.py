import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# Загрузка датасетов
player_starts_train = pd.read_parquet('player_starts_train.parquet')
videos = pd.read_parquet('videos.parquet')
emotions = pd.read_csv('emotions.csv')


# Векторизация текстовых данных с использованием TF-IDF
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(videos['video_title'] + ' ' + videos['video_description'])

# Косинусное сходство между видео
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)


# Функция для рекомендации
def recommend(user_id, num_recommendations=10):
    # Получение списка просмотренных пользователем видео
    watched_videos = player_starts_train[player_starts_train['user_id'] == user_id]['item_id'].tolist()

    # Вычисление суммарного сходства между просмотренными и всеми другими видео
    sim_scores = np.sum(cosine_sim[watched_videos], axis=0)

    # Ранжирование видео по уровню сходства
    video_indices = np.argsort(-sim_scores)

    # Получение рекомендованных видео
    recommended_video_indices = [x for x in video_indices if x not in watched_videos][:num_recommendations]
    recommended_video_ids = ['video_' + str(videos.iloc[x]['item_id']) for x in recommended_video_indices]

    return recommended_video_ids


# Составление списка рекомендаций для каждого пользователя
user_ids = player_starts_train['user_id'].unique()
recommendations = {}

for user_id in user_ids:
    recommendations[user_id] = recommend(user_id)

# Сохранение рекомендаций в CSV-файл
recommendation_df = pd.DataFrame(list(recommendations.items()), columns=['user_id', 'recs'])
recommendation_df['recs'] = recommendation_df['recs'].apply(lambda x: str(x))
recommendation_df.to_csv('recommendations.csv', index=False)
