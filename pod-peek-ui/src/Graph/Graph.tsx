import ReactFlow, { Background } from "reactflow";
import type { Node } from 'reactflow';
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";

const nodes: Node[] = [
    {
        id:'1',
        data:{
            label: "Node 1"
        },
        position: {x:0,y:0}
    },
];

export const Graph = () => {
    return (
        <Box height={"500px"} width="500px" border="1px solid white">
            <ReactFlow nodes={nodes} fitView>
                <Background/>
            </ReactFlow>
        </Box>
    )
}