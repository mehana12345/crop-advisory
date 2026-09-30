package com.cropadvisory.adsa;

import java.util.*;

/**
 * ADSA Unit 2: Graph Data Structure for Field Zones and Agronomic Relations.
 * Represents:
 * Farm Node -> Zone Nodes -> Soil Node, Crop Node, Moisture Node, Advisory Status Node.
 * Implemented using an Adjacency List with Graph Traversal (DFS/BFS).
 */
public class FieldGraph {

    public static class Node {
        private final String id;
        private final String label;
        private final String nodeType; // FARM, ZONE, SOIL, CROP, MOISTURE, ADVISORY
        private final Map<String, Object> attributes;

        public Node(String id, String label, String nodeType) {
            this.id = id;
            this.label = label;
            this.nodeType = nodeType;
            this.attributes = new HashMap<>();
        }

        public String getId() { return id; }
        public String getLabel() { return label; }
        public String getNodeType() { return nodeType; }
        public Map<String, Object> getAttributes() { return attributes; }

        public void putAttribute(String key, Object val) {
            this.attributes.put(key, val);
        }
    }

    public static class Edge {
        private final String sourceId;
        private final String targetId;
        private final String relation; // CONTAINS, HAS_SOIL, GROWS, OBSERVES, YIELDS_ADVICE

        public Edge(String sourceId, String targetId, String relation) {
            this.sourceId = sourceId;
            this.targetId = targetId;
            this.relation = relation;
        }

        public String getSourceId() { return sourceId; }
        public String getTargetId() { return targetId; }
        public String getRelation() { return relation; }
    }

    private final Map<String, Node> nodes;
    private final Map<String, List<Edge>> adjacencyList;

    public FieldGraph() {
        this.nodes = new LinkedHashMap<>();
        this.adjacencyList = new LinkedHashMap<>();
    }

    public void addNode(Node node) {
        nodes.put(node.getId(), node);
        adjacencyList.putIfAbsent(node.getId(), new ArrayList<>());
    }

    public void addEdge(String fromNodeId, String toNodeId, String relation) {
        if (!nodes.containsKey(fromNodeId) || !nodes.containsKey(toNodeId)) {
            throw new IllegalArgumentException("Both nodes must exist before creating an edge in ADSA FieldGraph");
        }
        Edge edge = new Edge(fromNodeId, toNodeId, relation);
        adjacencyList.get(fromNodeId).add(edge);
    }

    public Node getNode(String id) {
        return nodes.get(id);
    }

    public List<Edge> getNeighbors(String nodeId) {
        return adjacencyList.getOrDefault(nodeId, Collections.emptyList());
    }

    public Map<String, Node> getAllNodes() {
        return Collections.unmodifiableMap(nodes);
    }

    public Map<String, List<Edge>> getAdjacencyList() {
        return Collections.unmodifiableMap(adjacencyList);
    }

    /**
     * Traverses the graph from a root node using Breadth-First Search (BFS).
     */
    public List<Node> traverseBFS(String startNodeId) {
        List<Node> visitedOrder = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();

        if (!nodes.containsKey(startNodeId)) return visitedOrder;

        queue.add(startNodeId);
        visited.add(startNodeId);

        while (!queue.isEmpty()) {
            String currentId = queue.poll();
            visitedOrder.add(nodes.get(currentId));

            for (Edge edge : adjacencyList.getOrDefault(currentId, Collections.emptyList())) {
                String neighbor = edge.getTargetId();
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }

        return visitedOrder;
    }
}
