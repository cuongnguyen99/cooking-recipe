import random

import pandas as pd
import numpy as np
from scipy import sparse
from sklearn.metrics.pairwise import cosine_similarity
import warnings
warnings.filterwarnings('ignore')

from fastapi import FastAPI

# Data prepare
my_df = pd.read_csv('./data/dataset.csv')
recipe_titles = pd.read_csv('./data/data_recipe.csv', encoding='utf-8')
my_df = pd.merge(my_df, recipe_titles, on='post_id')
feedback = pd.DataFrame(my_df.groupby('post_id')['point'].mean())
feedback['number_of_feedback'] = my_df.groupby('post_id')['point'].count()

recipe_matrix_UII = my_df.pivot_table(index='username', columns='post_id', values='point')
recipe_matrix_UII = recipe_matrix_UII.fillna(0)

def standardize(row):
    new_row = (row - row.mean()) / (row.max() - row.min())
    return new_row
feedback_std = recipe_matrix_UII.apply(standardize)
# Taking a transpose since we want similarity between items which need to be in rows
item_similarity = cosine_similarity(feedback_std.T)
item_similarity_df = recipe_matrix_UII.corr(method='pearson')

def get_similar_recipe(item_id):
    if item_id in item_similarity_df.keys():
        similar_score = item_similarity_df[item_id]
        similar_score = similar_score.sort_values(ascending=False)
        similar_score = similar_score.drop([item_id])
        similar_score = similar_score.head(4)
        similar_score = list(similar_score.keys())
        return similar_score
    else:
        similar_score = [random.choice(list(item_similarity_df)) for i in range(4)]
        # similar_score = list(similar_score.keys())
        return similar_score

app = FastAPI()

@app.get("/api/{post_id}")
def root(post_id: int):
    result = get_similar_recipe(post_id)
    return result