class EdgeWeightedGraphAdjList {
  constructor(V) {
    this.V = V;
    this.adj = new Array(V).fill(null).map(() => []);
  }

  addEdge(v, w, weight) {
    this.adj[v].push(new Edge(v, w, weight));
    this.adj[w].push(new Edge(w, v, weight));
  }

  hasEdge(v, w) {
    let adjListV = this.adj[v];
    for (let i = 0; i < adjListV.length; i++) {
      if (adjListV[i].w === w){
        return true;
      }
    }
    return false;
  }

  getEdgeWeight(u, v){
    let adjListU = this.adj[u];
    for (let i = 0; i < adjListV.length; i++) {
      if (adjListU[i].v === v){
        return adjListU[i].weight;
      }
    }
  }

  getEdge(u, v){
    let adjListU = this.adj[u];
    for (let i = 0; i < adjListU.length; i++) {
      if (adjListU[i].w === v){
        return adjListU[i];
      }
    }
  }

  primMST() {
    const pq = new MinPriorityQueue();
    const marked = new Array(this.V).fill(false);
    const mst = [];

    this.visit(0, pq, marked);

    while (!pq.isEmpty()) {
      const edge = pq.deleteMin();
      const v = edge.either();
      const w = edge.other(v);

      if (marked[v] && marked[w]) continue;

      mst.push(edge);

      if (!marked[v]) this.visit(v, pq, marked);
      if (!marked[w]) this.visit(w, pq, marked);
    }

    return mst;
  }

  visit(v, pq, marked) {
    marked[v] = true;

    for (const edge of this.adj[v]) {
      if (!marked[edge.other(v)]) pq.insert(edge);
    }
  }
}

class Edge {
  constructor(v, w, weight) {
    this.v = v;
    this.w = w;
    this.weight = weight;
  }

  either() {
    return this.v;
  }

  other(vertex) {
    if (vertex === this.v) return this.w;
    if (vertex === this.w) return this.v;
    throw new Error('Illegal endpoint');
  }

  compareTo(other) {
    return this.weight - other.weight;
  }
}

class MinPriorityQueue {
  constructor() {
    this.pq = [];
  }

  isEmpty() {
    return this.pq.length === 0;
  }

  insert(x) {
    this.pq.push(x);
    this.swim(this.pq.length - 1);
  }

  deleteMin() {
    if (this.isEmpty()) throw new Error('Priority queue underflow');
    this.swap(0, this.pq.length - 1);
    const min = this.pq.pop();
    this.sink(0);
    return min;
  }

  swim(k) {
    while (k > 0 && this.less(k, Math.floor((k - 1) / 2))) {
      this.swap(k, Math.floor((k - 1) / 2));
      k = Math.floor((k - 1) / 2);
    }
  }

  sink(k) {
    while (2 * k + 1 < this.pq.length) {
      let j = 2 * k + 1;

      if (j < this.pq.length - 1 && this.less(j + 1, j)) j++;

      if (this.less(k, j)) break;

      this.swap(k, j);

      k = j;
    }
  }

  less(i, j) {
    return this.pq[i].compareTo(this.pq[j]) < 0;
  }

  swap(i, j) {
    const temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }
}

class EdgeWeightedGraphAdjMatrix {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.numEdges = 0;
    this.adjMatrix = [];

    for (let i = 0; i < numVertices; i++) {
      this.adjMatrix[i] = new Array(numVertices).fill(null);
    }
  }

  addEdge(v, w, weight) {
    this.adjMatrix[v][w] = { v, w, weight };
    this.adjMatrix[w][v] = { v: w, w: v, weight };
    this.numEdges++;
  }

  adj(v) {
    const adj = [];

    for (let i = 0; i < this.numVertices; i++) {
      if (this.adjMatrix[v][i] !== null) {
        adj.push(this.adjMatrix[v][i]);
      }
    }

    return adj;
  }

  getEdges() {
    const edges = [];

    for (let v = 0; v < this.numVertices; v++) {
      for (let w = v + 1; w < this.numVertices; w++) {
        if (this.adjMatrix[v][w] !== null) {
          edges.push(this.adjMatrix[v][w]);
        }
      }
    }

    return edges;
  }

  getNumVertices() {
    return this.numVertices;
  }

  getNumEdges() {
    return this.numEdges;
  }
}

function generateFigureOneGraphAdjList() {
  n = 9;
  m = 14;
  const graph = new EdgeWeightedGraphAdjList(n);

  graph.addEdge(0,1,4);
  graph.addEdge(0,7,8);
  graph.addEdge(1,2,8);
  graph.addEdge(1,7,11);
  graph.addEdge(2,3,7);
  graph.addEdge(2,5,4);
  graph.addEdge(2,8,2);
  graph.addEdge(3,4,9);
  graph.addEdge(3,5,14);
  graph.addEdge(4,5,10);
  graph.addEdge(5,6,2);
  graph.addEdge(6,8,6);
  graph.addEdge(6,7,1);
  graph.addEdge(7,8,7);

  return graph;
}

function generateFigureOneGraphAdjMatrix() {
  n = 9;
  m = 14;
  const graph = new EdgeWeightedGraphAdjMatrix(n);

  graph.addEdge(0,1,4);
  graph.addEdge(0,7,8);
  graph.addEdge(1,2,8);
  graph.addEdge(1,7,11);
  graph.addEdge(2,3,7);
  graph.addEdge(2,5,4);
  graph.addEdge(2,8,2);
  graph.addEdge(3,4,9);
  graph.addEdge(3,5,14);
  graph.addEdge(4,5,10);
  graph.addEdge(5,6,2);
  graph.addEdge(6,8,6);
  graph.addEdge(6,7,1);
  graph.addEdge(7,8,7);

  return graph;
}

function generateRandomGraphAdjList(n, m) {
  const graph = new EdgeWeightedGraphAdjList(n);

  let numEdges = 0;

  while (numEdges < m) {
    const v = Math.floor(Math.random() * n);
    const w = Math.floor(Math.random() * n);
    const weight = Math.floor(Math.random() * m * 10) + 1; // random weight between 1 and m*10

    if (v != w && !graph.hasEdge(v, w)) {
      graph.addEdge(v, w, weight);
      numEdges++;
    }
  }

  return graph;
}

function generateRandomGraphAdjMatrix(n, m) {
  const graph = new EdgeWeightedGraphAdjMatrix(n);

  let numEdges = 0;

  while (numEdges < m) {
    const v = Math.floor(Math.random() * n);
    const w = Math.floor(Math.random() * n);
    const weight = Math.floor(Math.random() * m * 10) + 1; // random weight between 1 and m*10

    if (v != w && graph.adjMatrix[v][w] === null) {
      graph.addEdge(v, w, weight);
      numEdges++;
    }
  }

  return graph;
}

function MSTPrimAdjacencyList(G){
  const n = G.V;
  let startNode = Math.floor(Math.random() * n); // random weight between 0 and n-1
  startNode = 0; //temp
  const V = new Set([])
  for (i = 0; i < n; i++){
    V.add(i)
  }
  const A = new Set([]);
  const S = new Set([startNode])
  let unset = 0;
  while (S.size + unset < n){
    possibleEdges = []
    for (const u of S) {
      for (const v of V) {
        if (!S.has(v)){
          edge = G.getEdge(u,v);
          if (edge !== undefined){
            possibleEdges.push(edge)
          }
        }
      }
    }
    let minEdge = possibleEdges[0];
    for (i = 1; i < possibleEdges.length; i++){
      if (possibleEdges[i].weight < minEdge.weight){
        minEdge = possibleEdges[i]
      }
    }
    if (minEdge !== undefined){
      A.add(minEdge)
      S.add(minEdge.w)
    } else {
      unset++;
    }
  }

  return A
}

function MSTPrimAdjacencyMatrix(G){
  const n = G.numVertices;
  let startNode = Math.floor(Math.random() * n); // random weight between 0 and n-1
  startNode = 0;
  const V = new Set([])
  let unset = 0
  for (i = 0; i < n; i++){
    V.add(i)
  }
  const A = new Set([]);
  const S = new Set([startNode])
  while (S.size + unset < n){
    possibleEdges = []
    for (const u of S) {
      for (const v of V) {
        if (!S.has(v)){
          edge = G.adjMatrix[u][v];
          if (edge !== null){
            possibleEdges.push(edge)
          }
        }
      }
    }
    let minEdge = possibleEdges[0];
    for (i = 1; i < possibleEdges.length; i++){
      if (possibleEdges[i].weight < minEdge.weight){
        minEdge = possibleEdges[i]
      }
    }
    if (minEdge !== undefined){
      A.add(minEdge)
      S.add(minEdge.w)
    } else {
      unset++;
    }

  }
  return A
}

function calculateFigureOneRuntimes(){
  console.log(`Runtimes for Figure 1 (n = 9, m = 14)`);
  let G = generateFigureOneGraphAdjList();
  let start = performance.now();
  MSTPrimAdjacencyList(G); // This is the function you want to time
  let end = performance.now();
  console.log(`        Adjacency List: ${end - start} milliseconds`);
  G = generateFigureOneGraphAdjMatrix();
  start = performance.now();
  MSTPrimAdjacencyMatrix(G); // This is the function you want to time
  end = performance.now();
  console.log(`        Adjacency Matrix: ${end - start} milliseconds`);
}

function calculateGeneratedRuntimes(){
  nArray = [100, 200, 400, 800]
  for (const n of nArray){
    console.log(`Runtimes for n = ${n}`);

    let m = 3*n;
    console.log(`    m = 3n`);
    let G = generateRandomGraphAdjList(n, m);
    let start = performance.now();
    MSTPrimAdjacencyList(G); // This is the function you want to time
    let end = performance.now();
    console.log(`        Adjacency List: ${end - start} milliseconds`);
    G = generateRandomGraphAdjMatrix(n, m);
    start = performance.now();
    MSTPrimAdjacencyMatrix(G); // This is the function you want to time
    end = performance.now();
    console.log(`        Adjacency Matrix: ${end - start} milliseconds`);

    m = Math.pow(n, 1.5);
    console.log(`    m = n^1.5`);
    G = generateRandomGraphAdjList(n, m);
    start = performance.now();
    MSTPrimAdjacencyList(G);
    end = performance.now();
    console.log(`        Adjacency List: ${end - start} milliseconds`);
    G = generateRandomGraphAdjMatrix(n, m);
    start = performance.now();
    MSTPrimAdjacencyMatrix(G);
    end = performance.now();
    console.log(`        Adjacency Matrix: ${end - start} milliseconds`);

    m = (n * (n - 1))/2
    console.log(`    m = n(n-1)/2`);
    G = generateRandomGraphAdjList(n, m);
    start = performance.now();
    MSTPrimAdjacencyList(G);
    end = performance.now();
    console.log(`        Adjacency List: ${end - start} milliseconds`);
    G = generateRandomGraphAdjMatrix(n, m);
    start = performance.now();
    MSTPrimAdjacencyMatrix(G);
    end = performance.now();
    console.log(`        Adjacency Matrix: ${end - start} milliseconds`);
  }
}

calculateFigureOneRuntimes();
calculateGeneratedRuntimes();
