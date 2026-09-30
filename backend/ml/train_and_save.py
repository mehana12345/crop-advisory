import os
import sys
import json

# Ensure project root is in sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from backend.ml.data_loading import generate_demonstration_dataset, load_dataset
from backend.ml.data_preprocessing import preprocess_dataset, get_feature_names
from backend.ml.model_training import train_ridge_regression, save_model
from backend.ml.model_validation import predict_batch, calculate_metrics

def main():
    ml_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(ml_dir, 'crop_yield_data.csv')
    model_path = os.path.join(ml_dir, 'trained_model.json')
    metrics_path = os.path.join(ml_dir, 'metrics.json')

    print(f"1. Loading/generating demonstration dataset at {csv_path}...")
    generate_demonstration_dataset(csv_path, num_records=800)
    data = load_dataset(csv_path)
    print(f"   Loaded {len(data)} agricultural sample records.")

    print("2. Preprocessing features and splitting into 80% train / 20% test...")
    X_train, y_train, X_test, y_test = preprocess_dataset(data, test_ratio=0.2, seed=42)
    feature_names = get_feature_names()
    print(f"   Train samples: {len(X_train)}, Test samples: {len(X_test)}, Feature count: {len(feature_names)}")

    print("3. Training Multiple Linear Regression model...")
    weights = train_ridge_regression(X_train, y_train, l2_reg=0.2)

    print("4. Validating model on held-out test dataset...")
    test_preds = predict_batch(X_test, weights)
    metrics = calculate_metrics(y_test, test_preds)
    print(f"   Test Set Evaluation Metrics:")
    print(f"   - Mean Absolute Error (MAE): {metrics['mae']} tons/ha")
    print(f"   - Root Mean Squared Error (RMSE): {metrics['rmse']} tons/ha")
    print(f"   - R-squared (R²): {metrics['r2']}")

    print("5. Saving model weights and metadata...")
    extra_meta = {
        'metrics': metrics,
        'dataset_type': 'Agronomic Demonstration Dataset (Indian Context)',
        'records_count': len(data),
        'features': feature_names
    }
    save_model(weights, feature_names, model_path, extra_meta)

    with open(metrics_path, 'w', encoding='utf-8') as f:
        json.dump(metrics, f, indent=2)

    print(f"SUCCESS: Trained model saved to {model_path}")
    print(f"SUCCESS: Metrics saved to {metrics_path}")

if __name__ == '__main__':
    main()
