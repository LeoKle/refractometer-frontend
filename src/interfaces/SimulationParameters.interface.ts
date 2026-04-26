import { DetectorParameters } from "./Detector.interface";
import { LightsourceParameters } from "./Lightsource.interface";
import { Plane } from "./Plane.interface";
import { SampleParameters } from "./Sample.interface";
import { Spectrum } from "./Spectrum.interface";

export interface SimulationParameters {
    lightsource: LightsourceParameters,
    spectrum: Spectrum,
    sample: SampleParameters,
    planes: Plane[],
    detector: DetectorParameters
}