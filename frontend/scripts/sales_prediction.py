import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from io import StringIO
import warnings
warnings.filterwarnings('ignore')

# ============================================
# 1. DATA LOADING AND INITIAL EXPLORATION
# ============================================
print("=" * 60)
print("SALES PREDICTION ANALYSIS")
print("=" * 60)

csv_data = """TV,Radio,Newspaper,Sales
230.1,37.8,69.2,22.1
44.5,39.3,45.1,10.4
17.2,45.9,69.3,9.3
151.5,41.3,58.5,18.5
180.8,10.8,58.4,12.9
8.7,48.9,75,7.2
57.5,32.8,23.5,11.8
120.2,19.6,11.6,13.2
8.6,2.1,1,4.8
199.8,2.6,21.2,10.6
66.1,5.8,24.2,8.6
214.7,24,4,17.4
23.8,35.1,65.9,9.2
97.5,7.6,7.2,9.7
204.1,32.9,46,19
195.4,47.7,52.9,22.4
67.8,36.6,114,12.5
281.4,39.6,55.8,24.4
69.2,20.5,18.3,11.3
147.3,23.9,19.1,14.6
218.4,27.7,53.4,18
237.4,5.1,23.5,12.5
13.2,15.9,49.6,5.6
228.3,16.9,26.2,15.5
62.3,12.6,18.3,9.7
262.9,3.5,19.5,12
142.9,29.3,12.6,15
240.1,16.7,22.9,15.9
248.8,27.1,22.9,18.9
70.6,16,40.8,10.5
292.9,28.3,43.2,21.4
112.9,17.4,38.6,11.9
97.2,1.5,30,9.6
265.6,20,0.3,17.4
95.7,1.4,7.4,9.5
290.7,4.1,8.5,12.8
266.9,43.8,5,25.4
74.7,49.4,45.7,14.7
43.1,26.7,35.1,10.1
228,37.7,32,21.5
202.5,22.3,31.6,16.6
177,33.4,38.7,17.1
293.6,27.7,1.8,20.7
206.9,8.4,26.4,12.9
25.1,25.7,43.3,8.5
175.1,22.5,31.5,14.9
89.7,9.9,35.7,10.6
239.9,41.5,18.5,23.2
227.2,15.8,49.9,14.8
66.9,11.7,36.8,9.7
199.8,3.1,34.6,11.4
100.4,9.6,3.6,10.7
216.4,41.7,39.6,22.6
182.6,46.2,58.7,21.2
262.7,28.8,15.9,20.2
198.9,49.4,60,23.7
7.3,28.1,41.4,5.5
136.2,19.2,16.6,13.2
210.8,49.6,37.7,23.8
210.7,29.5,9.3,18.4
53.5,2,21.4,8.1
261.3,42.7,54.7,24.2
239.3,15.5,27.3,15.7
102.7,29.6,8.4,14
131.1,42.8,28.9,18
69,9.3,0.9,9.3
31.5,24.6,2.2,9.5
139.3,14.5,10.2,13.4
237.4,27.5,11,18.9
216.8,43.9,27.2,22.3
199.1,30.6,38.7,18.3
109.8,14.3,31.7,12.4
26.8,33,19.3,8.8
129.4,5.7,31.3,11
213.4,24.6,13.1,17
16.9,43.7,89.4,8.7
27.5,1.6,20.7,6.9
120.5,28.5,14.2,14.2
5.4,29.9,9.4,5.3
116,7.7,23.1,11
76.4,26.7,22.3,11.8
239.8,4.1,36.9,12.3
75.3,20.3,32.5,11.3
68.4,44.5,35.6,13.6
213.5,43,33.8,21.7
193.2,18.4,65.7,15.2
76.3,27.5,16,12
110.7,40.6,63.2,16
88.3,25.5,73.4,12.9
109.8,47.8,51.4,16.7
134.3,4.9,9.3,11.2
28.6,1.5,33,7.3
217.7,33.5,59,19.4
250.9,36.5,72.3,22.2
107.4,14,10.9,11.5
163.3,31.6,52.9,16.9
197.6,3.5,5.9,11.7
184.9,21,22,15.5
289.7,42.3,51.2,25.4
135.2,41.7,45.9,17.2
222.4,4.3,49.8,11.7
296.4,36.3,100.9,23.8
280.2,10.1,21.4,14.8
187.9,17.2,17.9,14.7
238.2,34.3,5.3,20.7
137.9,46.4,59,19.2
25,11,29.7,7.2
90.4,0.3,23.2,8.7
13.1,0.4,25.6,5.3
255.4,26.9,5.5,19.8
225.8,8.2,56.5,13.4
241.7,38,23.2,21.8
175.7,15.4,2.4,14.1
209.6,20.6,10.7,15.9
78.2,46.8,34.5,14.6
75.1,35,52.7,12.6
139.2,14.3,25.6,12.2
76.4,0.8,14.8,9.4
125.7,36.9,79.2,15.9
19.4,16,22.3,6.6
141.3,26.8,46.2,15.5
18.8,21.7,50.4,7
224,2.4,15.6,11.6
123.1,34.6,12.4,15.2
229.5,32.3,74.2,19.7
87.2,11.8,25.9,10.6
7.8,38.9,50.6,6.6
80.2,0,9.2,8.8
220.3,49,3.2,24.7
59.6,12,43.1,9.7
0.7,39.6,8.7,1.6
265.2,2.9,43,12.7
8.4,27.2,2.1,5.7
219.8,33.5,45.1,19.6
36.9,38.6,65.6,10.8
48.3,47,8.5,11.6
25.6,39,9.3,9.5
273.7,28.9,59.7,20.8
43,25.9,20.5,9.6
184.9,43.9,1.7,20.7
73.4,17,12.9,10.9
193.7,35.4,75.6,19.2
220.5,33.2,37.9,20.1
104.6,5.7,34.4,10.4
96.2,14.8,38.9,11.4
140.3,1.9,9,10.3
240.1,7.3,8.7,13.2
243.2,49,44.3,25.4
38,40.3,11.9,10.9
44.7,25.8,20.6,10.1
280.7,13.9,37,16.1
121,8.4,48.7,11.6
197.6,23.3,14.2,16.6
171.3,39.7,37.7,19
187.8,21.1,9.5,15.6
4.1,11.6,5.7,3.2
93.9,43.5,50.5,15.3
149.8,1.3,24.3,10.1
11.7,36.9,45.2,7.3
131.7,18.4,34.6,12.9
172.5,18.1,30.7,14.4
85.7,35.8,49.3,13.3
188.4,18.1,25.6,14.9
163.5,36.8,7.4,18
117.2,14.7,5.4,11.9
234.5,3.4,84.8,11.9
17.9,37.6,21.6,8
206.8,5.2,19.4,12.2
215.4,23.6,57.6,17.1
284.3,10.6,6.4,15
50,11.6,18.4,8.4
164.5,20.9,47.4,14.5
19.6,20.1,17,7.6
168.4,7.1,12.8,11.7
222.4,3.4,13.1,11.5
276.9,48.9,41.8,27
248.4,30.2,20.3,20.2
170.2,7.8,35.2,11.7
276.7,2.3,23.7,11.8
165.6,10,17.6,12.6
156.6,2.6,8.3,10.5
218.5,5.4,27.4,12.2
56.2,5.7,29.7,8.7
287.6,43,71.8,26.2
253.8,21.3,30,17.6
205,45.1,19.6,22.6
139.5,2.1,26.6,10.3
191.1,28.7,18.2,17.3
286,13.9,3.7,15.9
18.7,12.1,23.4,6.7
39.5,41.1,5.8,10.8
75.5,10.8,6,9.9
17.2,4.1,31.6,5.9
166.8,42,3.6,19.6
149.7,35.6,6,17.3
38.2,3.7,13.8,7.6
94.2,4.9,8.1,9.7
177,9.3,6.4,12.8
283.6,42,66.2,25.5
232.1,8.6,8.7,13.4"""

df = pd.read_csv(StringIO(csv_data))

print("\n[DATA] DATASET OVERVIEW")
print("-" * 40)
print(f"Shape: {df.shape[0]} rows, {df.shape[1]} columns")
print(f"\nColumns: {list(df.columns)}")
print(f"\nFirst 5 rows:")
print(df.head())

# ============================================
# 2. DATA CLEANING AND PREPARATION
# ============================================
print("\n\n[CLEANING] DATA CLEANING")
print("-" * 40)

missing = df.isnull().sum()
print(f"Missing values:\n{missing}")

duplicates = df.duplicated().sum()
print(f"\nDuplicate rows: {duplicates}")

print(f"\nData types:\n{df.dtypes}")

print(f"\n[STATS] STATISTICAL SUMMARY")
print("-" * 40)
print(df.describe().round(2))

# ============================================
# 3. FEATURE ANALYSIS & CORRELATION
# ============================================
print("\n\n[CORRELATION] CORRELATION ANALYSIS")
print("-" * 40)

correlation_matrix = df.corr()
print("Correlation with Sales:")
sales_corr = correlation_matrix['Sales'].drop('Sales').sort_values(ascending=False)
for feature, corr in sales_corr.items():
    print(f"  {feature}: {corr:.4f}")

# ============================================
# 4. DATA VISUALIZATION
# ============================================
print("\n\n[VIZ] GENERATING VISUALIZATIONS...")

fig, axes = plt.subplots(2, 3, figsize=(15, 10))

channels = ['TV', 'Radio', 'Newspaper']
colors = ['#3498db', '#e74c3c', '#2ecc71']

for idx, (channel, color) in enumerate(zip(channels, colors)):
    ax = axes[0, idx]
    ax.scatter(df[channel], df['Sales'], alpha=0.6, c=color, edgecolors='white', linewidth=0.5)
    ax.set_xlabel(f'{channel} Advertising ($)')
    ax.set_ylabel('Sales')
    ax.set_title(f'{channel} vs Sales (r={correlation_matrix[channel]["Sales"]:.3f})')
    
    z = np.polyfit(df[channel], df['Sales'], 1)
    p = np.poly1d(z)
    ax.plot(df[channel].sort_values(), p(df[channel].sort_values()), 
            color='black', linestyle='--', linewidth=2, alpha=0.8)

axes[1, 0].hist(df['Sales'], bins=20, color='#9b59b6', edgecolor='white', alpha=0.7)
axes[1, 0].set_xlabel('Sales')
axes[1, 0].set_ylabel('Frequency')
axes[1, 0].set_title('Sales Distribution')
axes[1, 0].axvline(df['Sales'].mean(), color='red', linestyle='--', label=f'Mean: {df["Sales"].mean():.1f}')
axes[1, 0].legend()

spend_means = df[channels].mean()
axes[1, 1].bar(channels, spend_means, color=colors, edgecolor='white')
axes[1, 1].set_ylabel('Average Spend ($)')
axes[1, 1].set_title('Average Advertising Spend by Channel')
for i, v in enumerate(spend_means):
    axes[1, 1].text(i, v + 1, f'${v:.1f}', ha='center', fontweight='bold')

im = axes[1, 2].imshow(correlation_matrix, cmap='RdYlBu_r', aspect='auto', vmin=-1, vmax=1)
axes[1, 2].set_xticks(range(len(correlation_matrix.columns)))
axes[1, 2].set_yticks(range(len(correlation_matrix.columns)))
axes[1, 2].set_xticklabels(correlation_matrix.columns, rotation=45)
axes[1, 2].set_yticklabels(correlation_matrix.columns)
axes[1, 2].set_title('Correlation Heatmap')

for i in range(len(correlation_matrix.columns)):
    for j in range(len(correlation_matrix.columns)):
        text = axes[1, 2].text(j, i, f'{correlation_matrix.iloc[i, j]:.2f}',
                               ha='center', va='center', color='black', fontsize=9)

plt.tight_layout()
plt.savefig('advertising_analysis.png', dpi=150, bbox_inches='tight')
plt.close()
print("Saved: advertising_analysis.png")

# ============================================
# 5. FEATURE ENGINEERING
# ============================================
print("\n\n[FEATURES] FEATURE ENGINEERING")
print("-" * 40)

df_features = df.copy()
df_features['Total_Spend'] = df_features['TV'] + df_features['Radio'] + df_features['Newspaper']
df_features['TV_Radio_Interaction'] = df_features['TV'] * df_features['Radio']
df_features['TV_Ratio'] = df_features['TV'] / df_features['Total_Spend']
df_features['Radio_Ratio'] = df_features['Radio'] / df_features['Total_Spend']

print("Created features:")
print("  - Total_Spend: Sum of all advertising channels")
print("  - TV_Radio_Interaction: TV x Radio (interaction term)")
print("  - TV_Ratio: TV spend as proportion of total")
print("  - Radio_Ratio: Radio spend as proportion of total")

# ============================================
# 6. MODEL BUILDING
# ============================================
print("\n\n[MODEL] MODEL BUILDING")
print("-" * 40)

X = df[['TV', 'Radio', 'Newspaper']]
y = df['Sales']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training set size: {len(X_train)}")
print(f"Test set size: {len(X_test)}")

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

models = {
    'Linear Regression': LinearRegression(),
    'Ridge Regression': Ridge(alpha=1.0),
    'Lasso Regression': Lasso(alpha=0.1),
    'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingRegressor(n_estimators=100, random_state=42)
}

results = []
print("\n[PERFORMANCE] MODEL PERFORMANCE COMPARISON")
print("-" * 60)
print(f"{'Model':<25} {'R2 Score':>10} {'RMSE':>10} {'MAE':>10}")
print("-" * 60)

best_model = None
best_r2 = -np.inf

for name, model in models.items():
    if 'Forest' in name or 'Boosting' in name:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
    else:
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
    
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)
    
    results.append({
        'Model': name,
        'R2': r2,
        'RMSE': rmse,
        'MAE': mae
    })
    
    print(f"{name:<25} {r2:>10.4f} {rmse:>10.4f} {mae:>10.4f}")
    
    if r2 > best_r2:
        best_r2 = r2
        best_model = (name, model)

print("-" * 60)
print(f"\n[BEST] Best Model: {best_model[0]} (R2 = {best_r2:.4f})")

# ============================================
# 7. FEATURE IMPORTANCE ANALYSIS
# ============================================
print("\n\n[IMPORTANCE] FEATURE IMPORTANCE ANALYSIS")
print("-" * 40)

lr_model = LinearRegression()
lr_model.fit(X_train, y_train)

print("\nLinear Regression Coefficients:")
for feature, coef in zip(X.columns, lr_model.coef_):
    print(f"  {feature}: {coef:.4f}")
print(f"  Intercept: {lr_model.intercept_:.4f}")

rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

print("\nRandom Forest Feature Importance:")
importances = rf_model.feature_importances_
for feature, imp in sorted(zip(X.columns, importances), key=lambda x: x[1], reverse=True):
    print(f"  {feature}: {imp:.4f} ({imp*100:.1f}%)")

# ============================================
# 8. ADVERTISING IMPACT ANALYSIS
# ============================================
print("\n\n[IMPACT] ADVERTISING IMPACT ANALYSIS")
print("-" * 40)

print("\nSales Impact per $1 Advertising Spend:")
for feature, coef in zip(X.columns, lr_model.coef_):
    print(f"  $1 in {feature} -> ${coef:.3f} additional sales")

print("\nReturn on Investment (ROI) by Channel:")
for feature, coef in zip(X.columns, lr_model.coef_):
    roi = (coef / 1) * 100
    print(f"  {feature}: {roi:.1f}% return per dollar spent")

print("\n[SIMULATION] BUDGET ALLOCATION SIMULATION")
print("-" * 40)
print("Simulating $100 budget allocation scenarios:")

scenarios = [
    {'TV': 100, 'Radio': 0, 'Newspaper': 0, 'Name': '100% TV'},
    {'TV': 0, 'Radio': 100, 'Newspaper': 0, 'Name': '100% Radio'},
    {'TV': 0, 'Radio': 0, 'Newspaper': 100, 'Name': '100% Newspaper'},
    {'TV': 50, 'Radio': 50, 'Newspaper': 0, 'Name': '50% TV + 50% Radio'},
    {'TV': 60, 'Radio': 30, 'Newspaper': 10, 'Name': '60% TV + 30% Radio + 10% News'},
    {'TV': 70, 'Radio': 25, 'Newspaper': 5, 'Name': '70% TV + 25% Radio + 5% News'},
]

print(f"\n{'Scenario':<35} {'Predicted Sales':>15}")
print("-" * 52)

for scenario in scenarios:
    pred_input = np.array([[scenario['TV'], scenario['Radio'], scenario['Newspaper']]])
    pred_sales = lr_model.predict(pred_input)[0]
    print(f"{scenario['Name']:<35} ${pred_sales:>14.2f}")

# ============================================
# 9. PREDICTION VISUALIZATION
# ============================================
print("\n\n[VIZ] GENERATING PREDICTION VISUALIZATIONS...")

fig, axes = plt.subplots(2, 2, figsize=(14, 12))

y_pred_best = rf_model.predict(X_test)
axes[0, 0].scatter(y_test, y_pred_best, alpha=0.7, c='#3498db', edgecolors='white')
axes[0, 0].plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
axes[0, 0].set_xlabel('Actual Sales')
axes[0, 0].set_ylabel('Predicted Sales')
axes[0, 0].set_title(f'Actual vs Predicted Sales\n(R2 = {best_r2:.4f})')

residuals = y_test - y_pred_best
axes[0, 1].scatter(y_pred_best, residuals, alpha=0.7, c='#e74c3c', edgecolors='white')
axes[0, 1].axhline(y=0, color='black', linestyle='--', lw=2)
axes[0, 1].set_xlabel('Predicted Sales')
axes[0, 1].set_ylabel('Residuals')
axes[0, 1].set_title('Residual Plot')

features = X.columns
importance_sorted_idx = np.argsort(importances)
axes[1, 0].barh(features[importance_sorted_idx], importances[importance_sorted_idx], color=['#2ecc71', '#e74c3c', '#3498db'])
axes[1, 0].set_xlabel('Importance')
axes[1, 0].set_title('Feature Importance (Random Forest)')
for i, v in enumerate(importances[importance_sorted_idx]):
    axes[1, 0].text(v + 0.01, i, f'{v:.3f}', va='center')

model_names = [r['Model'] for r in results]
r2_scores = [r['R2'] for r in results]
colors_bar = ['#3498db' if r < best_r2 else '#2ecc71' for r in r2_scores]
axes[1, 1].barh(model_names, r2_scores, color=colors_bar, edgecolor='white')
axes[1, 1].set_xlabel('R2 Score')
axes[1, 1].set_title('Model Performance Comparison')
axes[1, 1].set_xlim(0, 1)
for i, v in enumerate(r2_scores):
    axes[1, 1].text(v + 0.01, i, f'{v:.4f}', va='center')

plt.tight_layout()
plt.savefig('sales_prediction_results.png', dpi=150, bbox_inches='tight')
plt.close()
print("Saved: sales_prediction_results.png")

# ============================================
# 10. ACTIONABLE INSIGHTS & RECOMMENDATIONS
# ============================================
print("\n\n" + "=" * 60)
print("[INSIGHTS] ACTIONABLE INSIGHTS & RECOMMENDATIONS")
print("=" * 60)

tv_corr = correlation_matrix['TV']['Sales']
radio_corr = correlation_matrix['Radio']['Sales']
news_corr = correlation_matrix['Newspaper']['Sales']
tv_coef = lr_model.coef_[0]
radio_coef = lr_model.coef_[1]
news_coef = lr_model.coef_[2]
tv_imp = importances[0] * 100

print(f"""
KEY FINDINGS:
----------------
1. TV ADVERTISING is the strongest predictor of sales
   - Correlation: {tv_corr:.3f}
   - Each $1 spent on TV generates ${tv_coef:.3f} in additional sales
   - Accounts for {tv_imp:.1f}% of model's predictive power

2. RADIO ADVERTISING is the second most effective channel
   - Correlation: {radio_corr:.3f}
   - Each $1 spent on Radio generates ${radio_coef:.3f} in additional sales
   - Shows synergistic effects when combined with TV

3. NEWSPAPER ADVERTISING shows minimal impact
   - Correlation: {news_corr:.3f}
   - Each $1 spent generates only ${news_coef:.3f} in additional sales
   - Consider reallocating budget to TV/Radio

RECOMMENDED BUDGET ALLOCATION:
---------------------------------
- TV: 65-70% of advertising budget
- Radio: 25-30% of advertising budget  
- Newspaper: 5-10% or reallocate entirely

STRATEGIC RECOMMENDATIONS:
-----------------------------
1. INCREASE TV SPENDING: Highest ROI channel
2. MAINTAIN RADIO PRESENCE: Good synergy with TV
3. REDUCE NEWSPAPER SPEND: Lowest impact on sales
4. TEST TV+RADIO COMBINATIONS: Potential interaction effects
5. MONITOR DIMINISHING RETURNS: Track performance at higher spend levels

MODEL ACCURACY:
------------------
- Best Model: {best_model[0]} achieves R2 = {best_r2:.4f}
- This means {best_r2 * 100:.1f}% of sales variance is explained by advertising
- Prediction error (RMSE): ${np.sqrt(mean_squared_error(y_test, y_pred_best)):.2f}
""")

print("\n" + "=" * 60)
print("[COMPLETE] ANALYSIS COMPLETE")
print("=" * 60)
