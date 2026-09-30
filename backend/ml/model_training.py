import json
import math
from typing import List, Dict, Any

def transpose(matrix: List[List[float]]) -> List[List[float]]:
    rows = len(matrix)
    cols = len(matrix[0])
    return [[matrix[r][c] for r in range(rows)] for c in range(cols)]

def matmul(A: List[List[float]], B: List[List[float]]) -> List[List[float]]:
    rA = len(A)
    cA = len(A[0])
    cB = len(B[0])
    C = [[0.0 for _ in range(cB)] for _ in range(rA)]
    for i in range(rA):
        for k in range(cA):
            aik = A[i][k]
            if aik == 0.0:
                continue
            for j in range(cB):
                C[i][j] += aik * B[k][j]
    return C

def matvec(A: List[List[float]], x: List[float]) -> List[float]:
    rA = len(A)
    cA = len(A[0])
    y = [0.0] * rA
    for i in range(rA):
        s = 0.0
        for j in range(cA):
            s += A[i][j] * x[j]
        y[i] = s
    return y

def solve_linear_system(A: List[List[float]], b: List[float]) -> List[float]:
    """Solves A x = b using Gauss-Jordan elimination with partial pivoting."""
    n = len(A)
    # Augment matrix
    M = [A[i][:] + [b[i]] for i in range(n)]

    for col in range(n):
        # Pivot selection
        max_row = col
        max_val = abs(M[col][col])
        for r in range(col + 1, n):
            if abs(M[r][col]) > max_val:
                max_val = abs(M[r][col])
                max_row = r

        if max_row != col:
            M[col], M[max_row] = M[max_row], M[col]

        pivot = M[col][col]
        if abs(pivot) < 1e-12:
            pivot = 1e-12

        # Scale pivot row
        for c in range(col, n + 1):
            M[col][c] /= pivot

        # Eliminate other rows
        for r in range(n):
            if r != col:
                factor = M[r][col]
                if abs(factor) > 1e-14:
                    for c in range(col, n + 1):
                        M[r][c] -= factor * M[col][c]

    return [M[i][n] for i in range(n)]

def train_ridge_regression(X: List[List[float]], y: List[float], l2_reg: float = 0.1) -> List[float]:
    """
    Computes closed-form Ridge Regression weights:
    w = (X^T * X + lambda * I)^(-1) * X^T * y
    """
    Xt = transpose(X)
    XtX = matmul(Xt, X)
    dim = len(XtX)

    # Add L2 penalty to diagonal (do not penalize intercept at index 0)
    for i in range(1, dim):
        XtX[i][i] += l2_reg

    Xty = matvec(Xt, y)
    weights = solve_linear_system(XtX, Xty)
    return weights

def save_model(weights: List[float], feature_names: List[str], filepath: str, extra_meta: Dict[str, Any] = None):
    model_data = {
        'model_type': 'Multiple Linear Regression with Ridge Regularization',
        'algorithm': 'Ordinary Least Squares with L2 Penalization (Closed Form)',
        'weights': weights,
        'feature_names': feature_names,
        'metadata': extra_meta or {}
    }
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(model_data, f, indent=2)
    return filepath
