const rootId = '1';

export const layout = (getEdges: any, setNodes: any, fitView: any) => {
    const edges = getEdges();
    const levels: Map<number, string[]> = new Map();
    const visited: Set<string> = new Set();    
    const queue: { nodeId: string, level: number }[] = [{ nodeId: rootId, level: 0 }];
    visited.add(rootId);    
    while (queue.length > 0) {
        const { nodeId, level } = queue.shift()!;
        if (!levels.has(level)) {
            levels.set(level, []);
        }
        levels.get(level)!.push(nodeId);
        edges.forEach((edge: any) => {
            const neighbor = edge.source === nodeId ? edge.target : edge.source;
            if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push({ nodeId: neighbor, level: level + 1 });
            }
        });
    }
    
    setNodes((nodes: any) => {
        return nodes.map((node: any) => {
            const level = [...levels].find(([_, ids]) => ids.includes(node.id))?.[0]!;
            const numNodes = levels.get(level)!.length;
            const angleStep = (2 * Math.PI) / numNodes;
            const radius = level * 200;
            const index = levels.get(level)!.indexOf(node.id);
            const angle = index * angleStep;
            const newX = radius * Math.cos(angle);
            const newY = radius * Math.sin(angle);
            return { ...node, position: { x: newX, y: newY } };
        });
    });

    setTimeout(() => fitView({ padding: 0.1, duration: 500 }));
};