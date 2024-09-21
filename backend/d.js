let code = `


import torch.fx as fx
from torch.fx import symbolic_trace
fx.wrap("len")

def transform_first(m: torch.nn.Module, frac ,
              tracer_class : type = fx.Tracer) -> torch.nn.Module:
    graph : fx.Graph = tracer_class().trace(m)


    initial_nodes   = int ( ( len(graph.nodes) - 1 ) * frac ) 
    # Take all nodes till index i




    n = len(graph.nodes)
    A = [ node for node in graph.nodes]
    C = [ [] for i in range ( n ) ]
    P = [ [] for i in range ( n ) ]
    M = {}
    for i,node in enumerate(graph.nodes) : 
        M[node.name] = i
    for node in graph.nodes :
        for in_node in node.args :
            if ( type(in_node) !=  type(node) ) :
                P[M[node.name]] += [-1] 
                continue 
            C[M[in_node.name]] += [ M[node.name] ]
            P[M[node.name]] += [ M[in_node.name] ]

    Pc = [ len(C[i]) for i in range ( n ) ]
    for i in range ( initial_nodes + 1 ) :
        for par in P[i] :
            if par == -1 : continue 
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


def transform_second(m: torch.nn.Module, frac , 
              tracer_class : type = fx.Tracer) -> torch.nn.Module:
    graph : fx.Graph = tracer_class().trace(m)


    initial_nodes   = int ( ( len(graph.nodes) - 1 ) * frac  )
    # Take all nodes till index i




    n = len(graph.nodes)
    A = [ node for node in graph.nodes]
    C = [ [] for i in range ( n ) ]
    P = [ [] for i in range ( n ) ]
    M = {}
    for i,node in enumerate(graph.nodes) : 
        M[node.name] = i
    for node in graph.nodes :
        for in_node in node.args :
            if ( type(in_node) !=  type(node) ) :
                P[M[node.name]] += [-1] 
                continue 
            C[M[in_node.name]] += [ M[node.name] ]
            P[M[node.name]] += [ M[in_node.name] ]

    Pc = [ len(C[i]) for i in range ( n ) ]
    for i in range ( initial_nodes + 1 ) :
        for par in P[i] :
            if par == -1 : continue 
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
            if p <= initial_nodes and p != -1 :
                Pv[i][j] = 1
    

    for i in range ( initial_nodes + 1 , len(A) ) :
        for j in range ( len( P[i] ) ) :
            if Pv[i][j] == 1 :
                A[i].update_arg(j,all_inputs[LL[P[i][j]]])

    # for i in range ( initial_nodes , -1 , -1 ) :
    #     graph.erase_node(A[i])
    

    graph.lint() # Does some checks to make sure the
                 # Graph is well-formed.

    return fx.GraphModule(m, graph)


model_first = transform_first(model,0.5)
model_scripted = torch.jit.script(model_first) # Export to TorchScript
model_scripted.save('model_scripted_first.pt') # Save

model_second = transform_second(model,0.5)
model_scripted = torch.jit.script(model_second) # Export to TorchScript
model_scripted.save('model_scripted_second.pt') # Save


`




let fileList ;
const work_func = async (event) => { 
        fileList = event.target.files;
        console.log(fileList);

        let a = await fileList[0].text();

        console.log(a);

        let content = a + code ;

        const file = new Blob([content], { type: 'text/plain' });
        const link = document.createElement("a");
         link.href = URL.createObjectURL(file);
         link.download = "sample.py";
         link.click();
         URL.revokeObjectURL(link.href);
};

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', work_func);

