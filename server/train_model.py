# server/train_model.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

# 1. Create a small synthetic dataset (replace with real data in practice)
#    Each row => [screen_time, unlocks, social_usage, night_usage, gaming_usage, label]
data = {
    'screen_time':  [60,  200, 300, 500, 100, 550, 400, 250],
    'unlocks':      [20,  50,  80,  120, 35,  140, 90,  60],
    'social_usage': [30,  90,  120, 200, 45,  250, 140, 100],
    'night_usage':  [10,  40,  60,  90,  20,  100, 80,  30],
    'gaming_usage': [5,   25,  35,  50,  15,  60,  45,  25],
    'label':        ['Low','Moderate','Moderate','High','Low','High','High','Moderate']
}

df = pd.DataFrame(data)

# 2. Convert labels to numeric
label_map = {'Low': 0, 'Moderate': 1, 'High': 2}
df['label_encoded'] = df['label'].map(label_map)

# 3. Split features & target
#    Make sure you exactly match the columns used in your Flask code
X = df[["screen_time", "unlocks", "social_usage", "night_usage", "gaming_usage"]]
y = df['label_encoded']

# 4. Train a Random Forest
clf = RandomForestClassifier(n_estimators=50, random_state=42)
clf.fit(X, y)

# 5. Save the model to a pickle file
with open('model.pkl', 'wb') as f:
    pickle.dump(clf, f)

print("Model trained and saved as model.pkl!")
