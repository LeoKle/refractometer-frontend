import { SimulationResult } from "./SimulationResult";

export interface SimulationQueueElement extends SimulationResult {
    index?: number,
    being_processed?: boolean,
    issuer?: string,
    callback_url?: string,
}