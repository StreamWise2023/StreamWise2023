from sklearn.metrics import average_precision_score
from time import time
import itertools


# Функция для расчета MAP
def mean_average_precision(y_true, y_pred):
    return np.mean([average_precision_score(a, p) for a, p in zip(y_true, y_pred)])


# Функция для расчета Diversity
def diversity(recommendations):
    flatten_recs = list(itertools.chain.from_iterable(recommendations.values()))
    unique_recs = len(set(flatten_recs))
    total_recs = len(flatten_recs)
    return unique_recs / total_recs


# Инициализация метрик
map_scores = []
diversity_score = 0
inference_times = []

# Тестирование гибридной модели с метриками
user_ids = df_merged['user_id'].unique()[:10]  # Ограничиваем для демонстрации
recommendations = {}
y_true = []

for user_id in user_ids:
    # Реальные данные для MAP (в данном случае просто пример)
    true_data = df_merged[df_merged['user_id'] == user_id]['item_id'].unique().tolist()
    y_true.append(true_data)

    # Время Inference
    start_time = time()

    recs = hybrid_recommendations(user_id)
    recommendations[user_id] = recs

    end_time = time()
    inference_times.append(end_time - start_time)

    # Предсказания для MAP
    y_pred = [1 if r in true_data else 0 for r in recs]

    map_scores.append(average_precision_score([1] * len(true_data), y_pred))

# Расчет метрик
final_map = np.mean(map_scores)
final_diversity = diversity(recommendations)
final_inference_time = np.mean(inference_times)

print(f"Final MAP: {final_map}")
print(f"Final Diversity: {final_diversity}")
print(f"Average Inference Time: {final_inference_time} seconds")

# Сохранение результатов в CSV
df_recs = pd.DataFrame(list(recommendations.items()), columns=['user_id', 'recs'])
df_recs.to_csv('hybrid_recommendations.csv', index=False)
