export interface WavelengthCalibration {
    wavelength: number
}

export function isWavelengthCalibration(obj: any): obj is WavelengthCalibration {
    return typeof obj === 'object' &&
        obj !== null &&
        typeof obj.wavelength === 'number';
}