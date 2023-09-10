import pandas as pd
import gc
from tqdm import tqdm


def calc_pairs(train):
    print("Calculating pairs...")
    # Группировка данных и создание списка элементов
    group = train.groupby(['user_id', 'date_short'], observed=True)[
        'item_id'].apply(list).reset_index(name='item_list')

    # "Расширение" списка элементов в каждой строке
    records = []
    for _, row in tqdm(group.iterrows(), total=len(group)):
        item_list = row['item_list']
        for item in item_list:
            records.append([item, item_list])

    # Преобразование в DataFrame и фильтрация пар
    df = pd.DataFrame(records, columns=['item_id', 'item_list'])
    df['item_list'] = df['item_list'].apply(
        lambda x: [item for item in x if item != x[0]])

    # Группировка и подсчет встречаемости пар
    df = df.explode('item_list')
    count_df = df.groupby(['item_id', 'item_list']
                          ).size().reset_index(name='count')

    print("Calculating scores...")
    # Расчет оценок
    count_df['score'] = count_df.groupby('item_id')['count'].transform('sum')
    count_df['score'] = count_df['count'] / count_df['score']

    return count_df[['item_id', 'item_list', 'score']]


def get_recommendations_for_user(user_id, train, rules, top_n=10):
    watched_videos = train[train['user_id'] == user_id]['item_id'].unique()
    recommendations = {}

    for video in watched_videos:
        recs = rules[rules['item_id'] == video].sort_values(
            'score', ascending=False).head(top_n)['item_list'].tolist()

        for rec in recs:
            if rec in recommendations:
                recommendations[rec] += 1
            else:
                recommendations[rec] = 1

    sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)[:top_n]
    return [item[0] for item in sorted_recommendations]


# Загрузка данных
print("Loading data...")
hack = pd.read_csv("small_player_starts_train.csv")
hack['date_short'] = hack['date'].str.split(" ").str[0]

# Освобождение памяти
gc.collect()

# Вычисление пар и оценок
rules = calc_pairs(hack[['user_id', 'item_id', 'date_short']])

# Создание файла для сохранения рекомендаций
with open("recommendations.csv", "w") as f:
    f.write("user_id,recs\n")

# Генерация рекомендаций для каждого пользователя
unique_users = hack['user_id'].unique()
for user in tqdm(unique_users):
    user_recommendations = get_recommendations_for_user(user, hack, rules)
    user_recommendations_str = ",".join([str(i) for i in user_recommendations])

    with open("recommendations.csv", "a") as f:
        f.write(f"{user},\"[{user_recommendations_str}]\"\n")