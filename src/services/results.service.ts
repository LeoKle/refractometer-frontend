import axios from "axios";
import { SimulationResult } from "../interfaces/SimulationResult";

export async function getSimulationResults(): Promise<SimulationResult[]> {
    try {
        const response = await axios.get("/api/results");

        const simulationResults: SimulationResult[] = response.data.map(item => ({
            id: item.id,
            parameters: item.parameters,
            image_id: item.image_id,
            issued_at: item.issued_at,
            completed_at: item.completed_at
        } as SimulationResult));

        return simulationResults
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function deleteSimulationResult(id: string): Promise<void> {
    try {
        await axios.delete("/api/result/" + id);
    } catch (error) {
        console.error(error);
    }
}

export default { getSimulationResults, deleteSimulationResult };
