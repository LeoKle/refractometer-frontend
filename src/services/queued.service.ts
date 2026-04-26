import axios from "axios";
import { SimulationResult } from "../interfaces/SimulationResult";
import { SimulationQueueElement } from "../interfaces/SimulationQueue";

export async function getQueuedSimulation(): Promise<SimulationQueueElement[]> {
    try {
        const response = await axios.get("/api/queued");

        const queuedSimulations: SimulationQueueElement[] = response.data.map(item => ({
            id: item.id,
            parameters: item.parameters,
            issued_at: item.issued_at,
            completed_at: item.completed_at,
            index: item.index,
            issuer: item.issuer,
            being_processed: item.being_processed,
            callback_url: item.callback_url
        } as SimulationQueueElement));

        return queuedSimulations
    } catch (error) {
        console.error(error);
        return [];
    }
}

export enum queueSimulationResponse {
    FAILURE,
    SUCCESS
}

export async function queueSimulation(data: SimulationQueueElement): Promise<queueSimulationResponse> {
    try {
        const response = await axios.post("/api/queue", data);

        return queueSimulationResponse.SUCCESS;
    } catch (error) {
        console.error(error);
        return queueSimulationResponse.FAILURE;
    }
}

export default { getQueuedSimulation, queueSimulation, queueSimulationResponse };
