# RGCN held-out evaluation

`rgcn_heldout_eval.py` trains its own copy of the RGCN architecture in `services/gnn/main.py` (3 layers, 64 hidden units, 5 relation types) on synthetic data that follows the service's fund-flow generator. It splits nodes 70/15/15 into train/validation/test, picks the epoch with the best validation F1, and reports metrics on the test nodes only, over 5 seeds.

Two things to keep in mind:

- The evaluation is transductive: test labels are held out, but the test nodes' features and edges are part of the graph during training.
- The graph differs from the service's. `main.py` chains all normal nodes first, then all anomalous ones. This script shuffles the nodes before building the chain, so neighbouring nodes are not grouped by label.

| Metric | Mean | Std |
|---|---|---|
| Precision | 0.935 | 0.050 |
| Recall | 0.973 | 0.014 |
| F1 | 0.953 | 0.028 |
| ROC-AUC | 0.999 | 0.001 |

The data is synthetic (Gaussian features, chain topology), so these numbers show that the model and pipeline learn the generator's anomaly signal. They are not evidence of performance on real disbursement data. The accuracy that `main.py` logs is computed on the training set.

Run: `python services/gnn/eval/rgcn_heldout_eval.py`
