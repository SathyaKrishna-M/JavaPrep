'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Model Evaluation',
  subtitle: 'Metrics for regression and classification, overfitting, and cross-validation',
  co: 'CO6 — Visualization & Decision Making',

  overview: (
    <>
      <p>
        <strong className="text-white">Model evaluation</strong> measures how well a model
        generalises to new, unseen data. In-sample metrics (on training data) are misleading
        — a sufficiently complex model can memorise training data perfectly (overfitting) while
        failing completely on new examples. All meaningful evaluation is done on held-out data.
      </p>
      <p>
        For <strong className="text-white">regression</strong>, key metrics are RMSE (root
        mean squared error — in the same units as Y), MAE (mean absolute error — robust to
        outliers), and R² (proportion of variance explained). For{' '}
        <strong className="text-white">classification</strong>, accuracy is often misleading
        for imbalanced classes — use precision, recall, F1-score, ROC-AUC, and the confusion matrix.
      </p>
      <p>
        <strong className="text-white">Cross-validation</strong> (especially k-fold) gives a
        reliable estimate of generalisation performance by averaging over multiple train/test
        splits. The bias-variance tradeoff explains why simpler models sometimes outperform
        complex ones: high complexity reduces bias but increases variance (sensitivity to the
        specific training sample).
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: An exam score measures how much a student learned (generalisation)
        — not how well they memorised the answer key (overfitting). Cross-validation is like
        giving multiple different exams and averaging the score.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Key Metrics</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { name: 'RMSE', formula: '√(Σ(y−ŷ)²/n)', note: 'Regression. Same units as Y. Penalises large errors.', color: 'blue' },
            { name: 'MAE', formula: 'Σ|y−ŷ|/n', note: 'Regression. Robust to outliers. Easier to interpret.', color: 'violet' },
            { name: 'Accuracy', formula: '(TP+TN)/(all)', note: 'Classification. Misleading for imbalanced classes.', color: 'amber' },
            { name: 'F1-Score', formula: '2×P×R/(P+R)', note: 'Balances Precision and Recall. Good for imbalanced.', color: 'emerald' },
            { name: 'Precision', formula: 'TP/(TP+FP)', note: 'Of predicted positives, how many are real?', color: 'pink' },
            { name: 'Recall', formula: 'TP/(TP+FN)', note: 'Of actual positives, how many did we catch?', color: 'cyan' },
          ].map(({ name, formula, note, color }) => (
            <div key={name} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-2`}>
              <div className="flex gap-2 items-baseline">
                <span className={`text-${color}-300 font-bold`}>{name}</span>
                <span className="text-gray-300 font-mono text-[10px]">{formula}</span>
              </div>
              <p className="text-gray-500 text-[10px] mt-1">{note}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">Bias-Variance Tradeoff</p>
        <div className="space-y-1 text-gray-400">
          <p>Total Error = Bias² + Variance + Irreducible Noise</p>
          <p><span className="text-red-400">High bias</span> = underfitting (model too simple, misses patterns)</p>
          <p><span className="text-red-400">High variance</span> = overfitting (model too complex, fits noise)</p>
          <p><span className="text-green-400">Goal</span> = find the sweet spot in model complexity</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'RMSE',              definition: 'Root Mean Squared Error = √(Σ(yᵢ−ŷᵢ)²/n). In same units as Y. Penalises large errors more than MAE. The most common regression metric.' },
    { term: 'MAE',               definition: 'Mean Absolute Error = Σ|yᵢ−ŷᵢ|/n. More robust to outliers than RMSE. Easier to explain: "on average, predictions are off by X units."' },
    { term: 'Confusion matrix',  definition: 'For classification: 2×2 table of TP, TN, FP, FN. All classification metrics derive from it. Essential for understanding the types of errors a model makes.' },
    { term: 'Precision',         definition: 'TP / (TP + FP). Of all predicted positives, what fraction are correct? High precision = few false positives. Important when false alarms are costly (spam filter).' },
    { term: 'Recall (Sensitivity)', definition: 'TP / (TP + FN). Of all actual positives, what fraction did we detect? High recall = few missed positives. Important when missing cases is costly (cancer screening).' },
    { term: 'F1-Score',          definition: 'Harmonic mean of Precision and Recall: 2×P×R/(P+R). Balances both. Use when classes are imbalanced and both false positives and false negatives matter.' },
    { term: 'k-fold cross-validation', definition: 'Splits data into k folds. Train on k−1 folds, test on 1, rotate k times. Average test metric = cross-validated score. Less sensitive to a particular train/test split than a single hold-out.' },
  ],

  code: {
    title: 'Regression and Classification Evaluation in Scikit-Learn',
    language: 'python',
    snippet: `import numpy as np
from sklearn.datasets import load_iris, make_regression
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score, KFold
from sklearn.metrics import (
    mean_squared_error, mean_absolute_error, r2_score,
    classification_report, confusion_matrix, roc_auc_score, ConfusionMatrixDisplay
)
import matplotlib.pyplot as plt

np.random.seed(42)

# ─── REGRESSION EVALUATION ────────────────────────────────────
X, y = make_regression(n_samples=200, n_features=5, noise=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

lr = LinearRegression().fit(X_train, y_train)
y_pred = lr.predict(X_test)

rmse = np.sqrt(mean_squared_error(y_test, y_pred))
mae  = mean_absolute_error(y_test, y_pred)
r2   = r2_score(y_test, y_pred)
print(f"Regression — RMSE: {rmse:.2f}  MAE: {mae:.2f}  R²: {r2:.4f}")

# k-fold cross-validation (more reliable than single split)
kf = KFold(n_splits=5, shuffle=True, random_state=42)
cv_r2 = cross_val_score(LinearRegression(), X, y, cv=kf, scoring='r2')
print(f"5-fold CV R²: {cv_r2.mean():.4f} ± {cv_r2.std():.4f}")

# ─── CLASSIFICATION EVALUATION ────────────────────────────────
iris = load_iris()
Xc, yc = iris.data, (iris.target > 0).astype(int)  # binary: setosa vs rest
Xc_train, Xc_test, yc_train, yc_test = train_test_split(Xc, yc, test_size=0.3, random_state=42)

clf = LogisticRegression(max_iter=200).fit(Xc_train, yc_train)
yc_pred = clf.predict(Xc_test)
yc_prob = clf.predict_proba(Xc_test)[:, 1]

print("\\nClassification Report:")
print(classification_report(yc_test, yc_pred, target_names=['setosa', 'others']))
print(f"ROC-AUC: {roc_auc_score(yc_test, yc_prob):.4f}")

# Confusion matrix plot
cm = confusion_matrix(yc_test, yc_pred)
disp = ConfusionMatrixDisplay(cm, display_labels=['setosa', 'others'])
disp.plot(cmap='Blues')
plt.title('Confusion Matrix')
plt.show()

# ─── BIAS-VARIANCE: validation curve ─────────────────────────
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline

train_scores, test_scores = [], []
degrees = range(1, 10)
X1 = X[:, 0:1]

for d in degrees:
    pipe = Pipeline([('poly', PolynomialFeatures(d)), ('lr', LinearRegression())])
    tr = cross_val_score(pipe, X1, y, cv=5, scoring='r2').mean()
    te = cross_val_score(pipe, X1, y, cv=5, scoring='neg_root_mean_squared_error').mean()
    train_scores.append(tr)
    test_scores.append(-te)

plt.figure(figsize=(8, 4))
plt.plot(degrees, train_scores, label='Train R²')
plt.xlabel('Polynomial Degree'); plt.ylabel('R²')
plt.title('Bias-Variance: Underfitting vs Overfitting')
plt.legend(); plt.show()`,
    explanation: 'classification_report gives precision, recall, and F1 for each class in one call. Notice how in imbalanced scenarios, accuracy can be high (predict the majority class always) while recall for the minority class is 0. Always check the full report.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Choosing the wrong metric can lead to dangerous decisions.</strong>{' '}
        A cancer screening model that predicts "no cancer" for everyone achieves 99% accuracy
        on a dataset where 1% have cancer — but has 0% recall for the positive class. In
        medical, fraud detection, and safety-critical applications, recall (don't miss
        positives) is far more important than overall accuracy.
      </p>
      <p>
        Cross-validation is non-negotiable in any serious data science project. A single
        train/test split can be lucky or unlucky depending on which data points end up in
        each set. Five-fold CV gives five independent evaluations — the average is a far
        more reliable estimate of how the model will perform in deployment.
      </p>
    </>
  ),

  commonMistakes: [
    'Evaluating on training data — this measures memorisation, not learning. Always evaluate on held-out data or use cross-validation.',
    'Using accuracy for imbalanced classes — a model predicting only the majority class gets high accuracy but is useless. Use F1, precision, recall, or ROC-AUC.',
    'Not looking at the confusion matrix — aggregate metrics hide what kinds of errors the model makes. A model might have high F1 but systematically fail on a specific subgroup.',
    'Data leakage: fitting preprocessing (scaler, imputer) on the full dataset before splitting — this leaks test-set information into training. Always fit preprocessing on training data only, then transform both.',
    'Confusing precision and recall — precision: "are my positive predictions correct?" Recall: "did I find all the positives?" The right one to optimise depends on the cost of each error type.',
  ],

  summary: [
    'Regression metrics: RMSE (penalises large errors, same units as Y), MAE (robust to outliers), R² (variance explained).',
    'Classification: Confusion matrix → TP, TN, FP, FN. Precision = TP/(TP+FP). Recall = TP/(TP+FN). F1 = harmonic mean.',
    'Accuracy is misleading for imbalanced classes. Use F1, ROC-AUC, or precision-recall curves.',
    'Cross-validation: k-fold CV gives k independent test scores. Average ± std is the reliable generalisation estimate.',
    'Bias-variance tradeoff: underfitting (high bias, simple model) vs overfitting (high variance, complex model).',
    'Data leakage: fit all preprocessing steps on training data only. Never let test data influence the training pipeline.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A fraud detection model has 99.9% accuracy on a dataset where 0.1% of transactions are fraudulent. Is this a good model?',
      hint: 'No. A model that always predicts "not fraud" gets 99.9% accuracy. The recall for fraud is 0% — it never catches any fraud. Use F1-score or recall for the fraud class instead. This is the classic imbalanced-class accuracy trap.',
    },
    {
      type: 'question',
      text: 'Explain the difference between precision and recall. For a spam filter, which would you prioritise?',
      hint: 'Precision: of emails flagged as spam, how many actually are? Recall: of all spam emails, how many did we catch? For spam: prioritise precision — a false positive (legitimate email goes to spam) is more damaging than missing some spam. Contrast: for cancer screening, prioritise recall (missing cancer = far worse than a false alarm).',
    },
    {
      type: 'question',
      text: 'What is data leakage and give an example of how it can occur during preprocessing?',
      hint: 'Data leakage = test data information influences the model before evaluation, making performance estimates falsely optimistic. Example: fitting a StandardScaler on the full dataset before splitting. The scaler computes mean/std from test data too, so the "test" performance is artificially good. Fix: use sklearn Pipeline so the scaler fits on training folds only.',
    },
    {
      type: 'task',
      text: 'Load the sklearn breast cancer dataset. Train a LogisticRegression. Report: accuracy, precision, recall, F1, and ROC-AUC. Then compare 5-fold CV accuracy vs single train/test split accuracy. Plot the confusion matrix.',
      hint: 'from sklearn.datasets import load_breast_cancer. X,y=load_breast_cancer(return_X_y=True). Split, fit LogisticRegression(max_iter=10000). classification_report(), roc_auc_score(), ConfusionMatrixDisplay. cross_val_score(clf, X, y, cv=5, scoring="accuracy").mean().',
    },
  ],
}

export default function ModelEvaluationPage() {
  return <FEDFTopicPage content={content} />
}
