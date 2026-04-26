import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";
import { LightsourceParameters } from "../interfaces/Lightsource.interface";
import { Vector } from "../interfaces/Vector.interface";
import { Spectrum } from "../interfaces/Spectrum.interface";
import { SampleParameters } from "../interfaces/Sample.interface";
import { Geometry } from "../interfaces/Geometry.interface";
import { DetectorParameters } from "../interfaces/Detector.interface";
import { PlaneGeometry } from "../interfaces/Plane.interface";
import { WavelengthCalibration } from "../interfaces/WavelengthCalibration.interface";

type ParameterContextType = {
    lightsource_parameters: LightsourceParameters,
    setLightsourceParameters: Dispatch<SetStateAction<LightsourceParameters>>,
    selectedSpectrum: Spectrum | null,
    setSelectedSpectrum: Dispatch<SetStateAction<Spectrum | null>>,
    selectedSample: SampleParameters | null,
    setSelectedSample: Dispatch<SetStateAction<SampleParameters | null>>,
    geometryParameters: Geometry,
    setGeometryParameters: Dispatch<SetStateAction<Geometry>>,
    detectorParameters: DetectorParameters,
    setDetectorParameters: Dispatch<SetStateAction<DetectorParameters>>,
};

const GlobalContext = createContext<ParameterContextType | undefined>(undefined);

export const ParameterProvider = ({ children }: { children: ReactNode }) => {
    const [lightsource_parameters, setLightsourceParameters] = useState<LightsourceParameters>({
        direction_vector: { x: 1, y: 0, z: 0 } as Vector,
        support_vector: { x: 0, y: 0, z: 0 } as Vector,
        gap_height_meters: 0.01,
        count_rays_height: 10,
        gap_width_meters: 0.0005,
        count_rays_width: 10,
        ray_divergence_degrees: 1,
        count_diverging_rays: 10
    });

    const [selectedSpectrum, setSelectedSpectrum] = useState<Spectrum | null>(null);
    const [selectedSample, setSelectedSample] = useState<SampleParameters | null>(null);
    const [geometryParameters, setGeometryParameters] = useState<Geometry>(
        {
            planes: {
                base_vector: { x: 1, y: 0, z: 0 },
                entry_angle: 40,
                distance1: 0.135,
                prism_angle: 60,
                distance2: 0.145,
            } as PlaneGeometry
        });

    const [detectorParameters, setDetectorParameters] = useState<DetectorParameters>(
        {
            normal_vector: { wavelength: 632.8 * 1e-9 } as WavelengthCalibration,
            distance3: 0.085,
            height_pixels: 1440,
            width_pixels: 2560,
            pixel_size_meters_per_pixel: 3e-6
        }
    )

    return (
        <GlobalContext.Provider
            value={{
                lightsource_parameters, setLightsourceParameters,
                selectedSpectrum, setSelectedSpectrum,
                selectedSample, setSelectedSample,
                geometryParameters, setGeometryParameters,
                detectorParameters, setDetectorParameters
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useParameterContext = (): ParameterContextType => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useParameterContext must be used within a ParameterProvider');
    }
    return context;
};
