import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useParameterContext } from "../../context/ParameterProvider";
import VectorInputField from "./VectorInput";
import { Vector } from "../../interfaces/Vector.interface";
import { isWavelengthCalibration, WavelengthCalibration } from "../../interfaces/WavelengthCalibration.interface";
import { useEffect, useState } from "react";

function DetectorParameters() {
    const { detectorParameters, setDetectorParameters } = useParameterContext();

    return (
        <>
            <div className="flex items-center mb-2">
                <label className="mr-2">Wavelength Calibration</label>
                <InputNumber
                    suffix=" nm"
                    value={detectorParameters.normal_vector.wavelength / 1e-9}
                    maxFractionDigits={2}
                    onChange={(e: InputNumberChangeEvent) => {
                        if (!e.value) return;

                        setDetectorParameters({
                            ...detectorParameters,
                            normal_vector: {
                                wavelength: e.value * 1e-9
                            }
                        })
                    }}
                />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Distance</label>
                <InputNumber
                    value={detectorParameters.distance3 * 100}
                    onChange={(e: InputNumberChangeEvent) => {
                        if (!e.value) return;

                        setDetectorParameters({
                            ...detectorParameters,
                            distance3: e.value / 100
                        })
                    }}
                    suffix=" cm" />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Detector Pixelheight</label>
                <InputNumber value={detectorParameters.height_pixels}
                    onChange={(e: InputNumberChangeEvent) => {
                        if (!e.value) return;

                        setDetectorParameters({ ...detectorParameters, height_pixels: e.value })
                    }} />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Detector Pixelwidth</label>
                <InputNumber value={detectorParameters.width_pixels}
                    onChange={(e: InputNumberChangeEvent) => {
                        if (!e.value) return;

                        setDetectorParameters({ ...detectorParameters, height_pixels: e.value })
                    }} />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Detector Pixelsize (m/px)</label>
                <InputNumber value={detectorParameters.pixel_size_meters_per_pixel} maxFractionDigits={9}
                    onChange={(e: InputNumberChangeEvent) => {
                        if (!e.value) return;

                        setDetectorParameters({ ...detectorParameters, height_pixels: e.value })
                    }} />
            </div>
        </>
    );
}

export default DetectorParameters;