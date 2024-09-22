```
# %%
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchviz import make_dot
 
# %%
# class MiniResidualBlock(nn.Module):
#     def __init__(self, in_channels, out_channels):
#         super().__init__()
#         self.conv0 = nn.Conv2d(in_channels, 128, kernel_size=3, padding=1)
#         self.groupnorm_in = nn.GroupNorm(32, 128)
#         self.conv1 = nn.Conv2d(128, out_channels, kernel_size=3, padding=1)
#         self.groupnorm_out = nn.GroupNorm(32, out_channels)
#         self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1)
 
#         if in_channels == out_channels:
#             self.residual_layer = nn.Identity()
#         else:
#             self.residual_layer = nn.Conv2d(in_channels, out_channels, kernel_size=1, padding=0)
 
#     def forward(self, x):
#         """
#         x -> {Residual Block} -> x' + residue 
#         """
#         residue = x
#         #TODO: Check is SILU before or after Convolution.
#         x = self.conv0(x)
#         x = self.groupnorm_in(x)
#         x = F.silu(x)
#         x = self.conv1(x)
#         x = self.groupnorm_out(x)
#         x = F.silu(x)
#         x = self.conv2(x)
 
#         return x + self.residual_layer(residue)
 
# %%
import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
model = models.resnet50(pretrained=True)

# 2. Set the model to evaluation mode
# This disables dropout and batch normalization layers, which should not be active during inference.
model.eval()

# %%
import torch.fx as fx
from torch.fx import symbolic_trace
symbolic_traced : torch.fx.GraphModule = symbolic_trace(model)
# print(symbolic_traced.graph)
 
# %%
def transform_first(m: torch.nn.Module, frac , 
              tracer_class : type = fx.Tracer) -> torch.nn.Module:
    graph : fx.Graph = tracer_class().trace(m)
 

    
    initial_nodes   =  int  (( len(graph.nodes) - 1 ) * frac)
    # Take all nodes till index i 
 
 
    n = len(graph.nodes)
    A = [ node for node in graph.nodes]
    C = [ [] for i in range ( n ) ]
    P = [ [] for i in range ( n ) ]
    M = {}
    for i,node in enumerate(graph.nodes) : 
        M[node.name] = i
    for node in graph.nodes :
        for in_node in node.all_input_nodes :
            C[M[in_node.name]] += [ M[node.name] ]
            P[M[node.name]] += [ M[in_node.name] ]
 
    Pc = [ len(P[i]) for i in range ( n ) ]
    for i in range ( initial_nodes + 1 ) :
        for par in P[i] :
            Pc[par] -= 1
 
    L = []
    for i in range ( initial_nodes + 1 ) :
        if Pc[i] != 0 :
            L += [i]
 
    for i in range ( len(graph.nodes) - 1 , initial_nodes , -1 ) :
        graph.erase_node(A[i])
 
    X = [ A[a] for a in L ]
    graph.output(tuple(X))
 
    graph.lint() # Does some checks to make sure the
                 # Graph is well-formed.
 
    return fx.GraphModule(m, graph)
 
# %%
model_first = transform_first(model, 0.5)
 
# %%
def transform_second(m: torch.nn.Module,frac , 
              tracer_class : type = fx.Tracer) -> torch.nn.Module:
    graph : fx.Graph = tracer_class().trace(m)
 
 
    initial_nodes   = int  (( len(graph.nodes) - 1 ) * frac  )
    # Take all nodes till index i
 
    n = len(graph.nodes)
    A = [ node for node in graph.nodes]
    C = [ [] for i in range ( n ) ]
    P = [ [] for i in range ( n ) ]
    M = {}
    for i,node in enumerate(graph.nodes) : 
        M[node.name] = i
    for node in graph.nodes :
        for in_node in node.all_input_nodes :
            C[M[in_node.name]] += [ M[node.name] ]
            P[M[node.name]] += [ M[in_node.name] ]
 
    Pc = [ len(P[i]) for i in range ( n ) ]
    for i in range ( initial_nodes + 1 ) :
        for par in P[i] :
            Pc[par] -= 1
 
    L = []
    for i in range ( initial_nodes + 1 ) :
        if Pc[i] != 0 :
            L += [i]
 
    LL = {}
    for i in range ( len(L) ) :
        LL[L[i]] = i 
 
 
    input_count = len(L)
    initial_node = A[0]
    all_inputs = [] 
    for i in range ( input_count ) :
        graph.placeholder(f"made_input_{i+1}")
 
    for node in graph.nodes :
        if node.name[:10] == "made_input" :
            all_inputs += [node]
            initial_node.prepend(node)
 
 
 
 
    Pv = [ [ 0 ] * len(P[i]) for i in range ( n )  ]
 
    for i in range ( initial_nodes + 1 , len(A) ) :
        for j,p in enumerate(P[i]) :
            if p <= initial_nodes :
                Pv[i][j] = 1
 
 
    for i in range ( initial_nodes + 1 , len(A) ) :
        for j in range ( len( P[i] ) ) :
            if Pv[i][j] == 1 :
                # print(i, j, all_inputs[LL[P[i][j]]])
                A[i].update_arg(j,all_inputs[LL[P[i][j]]])
 
    for i in range ( initial_nodes , -1 , -1 ) :
        graph.erase_node(A[i])
 
 
    graph.lint() # Does some checks to make sure the
                 # Graph is well-formed.
 
    return fx.GraphModule(m, graph)
 
# %%
model_second = transform_second(model, 0.5)
model_scripted = torch.jit.script(model_second) # Export to TorchScript
model_scripted.save('model_scripted.pt') # Save

 
# print(model_scripted.code)
# print(model_scripted.graph)
# print(model_scripted.code_with_constants)
# print(model_scripted.inlined_graph)
# %%
 
```