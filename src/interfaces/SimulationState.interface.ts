export interface SimulationState {
    severity: "danger" | "success" | "warning" | "secondary" | "info" | "help" | undefined
    text: string
}