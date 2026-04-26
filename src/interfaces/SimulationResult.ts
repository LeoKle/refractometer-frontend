import { SimulationParameters } from "./SimulationParameters.interface";

export interface SimulationResult {
    id?: string,
    name?: string,
    parameters: SimulationParameters,
    image_id?: string,
    issued_at: Date,
    completed_at?: Date
}