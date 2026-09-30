import math
from typing import List, Dict, Any

def predict_batch(X: List[List[float]], weights: List[float]) -> List[float]:
    preds = []
    dim = len(weights)
    for row in X:
        dot = sum(row[i] * weights[i] for i in range(dim))
        preds.append(max(0.1, dot))
    return preds

def calculate_metrics(y_true: List[float], y_pred: List[float]) -> Dict[str, float]:
    n = len(y_true)
    if n == 0:
        return {'mae': 0.0, 'rmse': 0.0, 'r2': 0.0}

    # Mean Absolute Error
    mae = sum(abs(y_t - y_p) for y_t, y_p in zip(y_true, y_pred)) / n

    # Root Mean Squared Error
    mse = sum((y_t - y_p) ** 2 for y_t, y_p in zip(y_true, y_pred)) / n
    rmse = math.sqrt(mse)

    # R-squared (Coefficient of Determination)
    y_mean = sum(y_true) / n
    ss_tot = sum((y_t - y_mean) ** 2 for y_t in y_true)
    ss_res = sum((y_t - y_p) ** 2 for y_t, y_p in zip(y_true, y_pred))

    r2 = 1.0 - (ss_res / ss_tot) if ss_tot > 1e-12 else 0.0

    return {
        'mae': round(mae, 4),
        'rmse': round(rmse, 4),
        'r2': round(r2, 4),
        'test_samples': n
    }
