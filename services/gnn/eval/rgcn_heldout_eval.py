"""Held-out evaluation of a copy of the PRAMAANIK RGCN (architecture, lr, weight decay and epoch count as in
services/gnn/main.py). Data is synthetic, following the service's fund-flow generator, but nodes are shuffled
before the chain graph is built (main.py leaves them grouped by label). Nodes are split 70/15/15
(train/val/test). The evaluation is transductive: test labels are held out, but test node features and
edges are visible during training. 5 seeds."""
import json, os, numpy as np, torch, torch_geometric.nn as pyg_nn
from sklearn.metrics import precision_recall_fscore_support, roc_auc_score

class RGCN(torch.nn.Module):
    def __init__(s, i=16, h=64, o=1, r=5):
        super().__init__()
        s.c1=pyg_nn.RGCNConv(i,h,r); s.b1=torch.nn.BatchNorm1d(h)
        s.c2=pyg_nn.RGCNConv(h,h,r); s.b2=torch.nn.BatchNorm1d(h)
        s.c3=pyg_nn.RGCNConv(h,o,r); s.d=torch.nn.Dropout(0.3)
    def forward(s,x,ei,et):
        x=s.d(torch.relu(s.b1(s.c1(x,ei,et)))); x=s.d(torch.relu(s.b2(s.c2(x,ei,et))))
        return torch.sigmoid(s.c3(x,ei,et))

def data(seed):
    rng=np.random.RandomState(seed)
    X=np.vstack([rng.randn(800,16)*0.5, rng.randn(200,16)*1.5+1.0]).astype(np.float32)
    y=np.r_[np.zeros(800),np.ones(200)].astype(np.float32)
    p=rng.permutation(1000); X,y=X[p],y[p]          # shuffle so the chain graph is not label-sorted
    n=len(y)
    ei=torch.tensor([[i,i+1] for i in range(n-1)]+[[i+1,i] for i in range(n-1)]).T
    et=torch.zeros(ei.shape[1],dtype=torch.long); et[::5]=1; et[1::5]=2; et[2::5]=3; et[3::5]=4
    return torch.tensor(X),torch.tensor(y).unsqueeze(1),ei,et,rng

res=[]
for seed in range(5):
    torch.manual_seed(seed)
    x,y,ei,et,rng=data(seed); n=len(y); idx=rng.permutation(n)
    tr,va,te=idx[:700],idx[700:850],idx[850:]
    m=RGCN(); opt=torch.optim.Adam(m.parameters(),lr=0.01,weight_decay=1e-4); crit=torch.nn.BCELoss()
    best,state=-1,None
    for ep in range(50):
        m.train(); opt.zero_grad(); out=m(x,ei,et); loss=crit(out[tr],y[tr]); loss.backward(); opt.step()
        m.eval()
        with torch.no_grad():
            pv=m(x,ei,et)[va].squeeze().numpy(); f=precision_recall_fscore_support(y[va].squeeze().numpy(),pv>=.5,average='binary',zero_division=0)[2]
        if f>best: best,state=f,{k:v.clone() for k,v in m.state_dict().items()}
    m.load_state_dict(state); m.eval()
    with torch.no_grad(): pt=m(x,ei,et)[te].squeeze().numpy()
    yt=y[te].squeeze().numpy()
    P,R,F,_=precision_recall_fscore_support(yt,pt>=.5,average='binary',zero_division=0)
    res.append({"seed":seed,"precision":P,"recall":R,"f1":F,"auc":roc_auc_score(yt,pt),"val_f1":best,"test_n":len(yt),"test_anomalies":int(yt.sum())})
    print(res[-1])
mean={k:round(float(np.mean([r[k] for r in res])),3) for k in("precision","recall","f1","auc")}
std={k:round(float(np.std([r[k] for r in res])),3) for k in("precision","recall","f1","auc")}
print("MEAN",mean,"STD",std)
json.dump({"per_seed":res,"mean":mean,"std":std,"note":"synthetic fund-flow data, held-out test labels (transductive), 5 seeds"},open(os.path.join(os.path.dirname(os.path.abspath(__file__)),"results.json"),"w"),indent=2,default=float)
