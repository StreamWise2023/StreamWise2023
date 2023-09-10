import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from tqdm import tqdm
import csv

# Загрузка датасетов
print("Loading data...")
player_starts_train = pd.read_parquet('player_starts_train.parquet')
videos = pd.read_parquet('videos.parquet')
emotions = pd.read_csv('emotions.csv')

# Векторизация текстовых данных с использованием TF-IDF
print("Vectorizing text data...")
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(videos['video_title'].fillna('') + ' ' + videos['video_description'].fillna(''))

# Косинусное сходство между видео
print("Calculating cosine similarity...")
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Функция для рекомендации
def recommend(user_id, num_recommendations=10):
    watched_videos = player_starts_train[player_starts_train['user_id'] == user_id]['item_id'].tolist()
    sim_scores = np.sum(cosine_sim[watched_videos], axis=0)
    video_indices = np.argsort(-sim_scores)
    recommended_video_indices = [x for x in video_indices if x not in watched_videos][:num_recommendations]
    recommended_video_ids = [videos.iloc[x]['item_id'] for x in recommended_video_indices]
    return recommended_video_ids

# Открытие CSV-файла для записи рекомендаций
print("Generating and saving recommendations...")
with open('recommendations.csv', 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(['user_id', 'recs'])

    # Составление списка рекомендаций для каждого пользователя
    user_ids = player_starts_train['user_id'].unique()

    for user_id in tqdm(user_ids):
        recs = recommend(user_id)
        recs_str = ', '.join(map(str, recs))
        csvwriter.writerow([user_id, recs_str])
