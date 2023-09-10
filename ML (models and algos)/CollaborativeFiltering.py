from collections import defaultdict
import pandas as pd
import gc
from tqdm import tqdm


def calc_pairs(train, top_n=10):
    print("Calculating pairs...")
    group = train.groupby(['user_id', 'date_short'], observed=True)['item_id'].apply(list).reset_index(name='item_list')

    records = []
    for _, row in tqdm(group.iterrows(), total=len(group)):
        item_list = row['item_list']
        for item in item_list:
            records.append([item, item_list])

    df = pd.DataFrame(records, columns=['item_id', 'item_list'])
    df['item_list'] = df['item_list'].apply(lambda x: [item for item in x if item != x[0]])

    df = df.explode('item_list')
    count_df = df.groupby(['item_id', 'item_list']).size().reset_index(name='count')

    print("Calculating scores...")
    count_df['score'] = count_df.groupby('item_id')['count'].transform('sum')
    count_df['score'] = count_df['count'] / count_df['score']
    count_df = count_df.sort_values('score', ascending=False).groupby('item_id').head(top_n).reset_index(drop=True)

    return count_df[['item_id', 'item_list', 'score']]


def get_recommendations_for_user(user_id, train, rules, top_n=10):
    watched_videos = train[train['user_id'] == user_id]['item_id'].unique()
    recommendations = defaultdict(int)

    for video in watched_videos:
        recs = rules[rules['item_id'] == video].sort_values('score', ascending=False).head(top_n)['item_list'].tolist()

        for rec in recs:
            recommendations[rec] += 1

    sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)[:top_n]
    return [item[0] for item in sorted_recommendations]


print("Loading data...")
hack = pd.read_csv("small_player_starts_train.csv")
hack['date_short'] = hack['date'].str.split(" ").str[0]

gc.collect()

rules = calc_pairs(hack[['user_id', 'item_id', 'date_short']])

with open("recommendations.csv", "w") as f:
    f.write("user_id,recs\n")

unique_users = hack['user_id'].unique()
for user in tqdm(unique_users):
    user_recommendations = get_recommendations_for_user(user, hack, rules)
    user_recommendations_str = ",".join([str(i) for i in user_recommendations])

    with open("recommendations.csv", "a") as f:
        f.write(f"{user},\"[{user_recommendations_str}]\"\n")