import { WavelengthCalibration } from "./WavelengthCalibration.interface";

export interface DetectorParameters {
    distance3: number,
    normal_vector: WavelengthCalibration,
    height_pixels: number,
    width_pixels: number,
    pixel_size_meters_per_pixel: number,
}