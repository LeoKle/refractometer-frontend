import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { useParameterContext } from "../../context/ParameterProvider";
import { Vector } from "../../interfaces/Vector.interface";
import VectorInputField from "./VectorInput";

function LightsourceParameters() {
    const { lightsource_parameters, setLightsourceParameters } = useParameterContext();

    return (
        <div className="grid">
            <div className="flex items-center mb-2">
                <label className="mr-2">Direction vector:</label>
                <VectorInputField
                    vector={lightsource_parameters.direction_vector}
                    setFunction={(value: Vector) => {
                        setLightsourceParameters({
                            ...lightsource_parameters,
                            direction_vector: value,
                        });
                    }}
                />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Support vector:</label>
                <VectorInputField
                    vector={lightsource_parameters.support_vector}
                    setFunction={(value: Vector) => {
                        setLightsourceParameters({
                            ...lightsource_parameters,
                            support_vector: value,
                        });
                    }}
                />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Aperature width:</label>
                <InputNumber
                    value={lightsource_parameters.gap_width_meters * 1000}
                    onValueChange={(event: InputNumberValueChangeEvent) => {
                        if (!event.value) return;

                        setLightsourceParameters({
                            ...lightsource_parameters,
                            gap_width_meters: event.value / 1000,
                        });
                    }}
                    maxFractionDigits={0}
                    suffix=" mm"
                />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Ray count (along width):</label>
                <InputNumber
                    value={lightsource_parameters.count_rays_width}
                    onValueChange={(event: InputNumberValueChangeEvent) => {
                        if (!event.value) return;

                        setLightsourceParameters({
                            ...lightsource_parameters,
                            count_rays_width: event.value,
                        });
                    }}
                    maxFractionDigits={0}
                    suffix=" rays"
                />
            </div>

            <div className="flex items-center mb-2">
                <label className="mr-2">Aperature height:</label>
                <InputNumber
                    value={lightsource_parameters.gap_height_meters * 1000}
                    onValueChange={(event: InputNumberValueChangeEvent) => {
                        if (!event.value) return;

                        setLightsourceParameters({
                            ...lightsource_parameters,
                            gap_height_meters: event.value / 1000,
                        });
                    }}
                    maxFractionDigits={0}
                    suffix=" mm"
                />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Ray count (along height):</label>
                <InputNumber
                    value={lightsource_parameters.count_rays_height}
                    onValueChange={(event: InputNumberValueChangeEvent) => {
                        if (!event.value) return;

                        setLightsourceParameters({
                            ...lightsource_parameters,
                            count_rays_height: event.value,
                        });
                    }}
                    maxFractionDigits={0}
                    suffix=" rays"
                />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Ray divergence:</label>
                <InputNumber
                    value={lightsource_parameters.ray_divergence_degrees}
                    onValueChange={(event: InputNumberValueChangeEvent) => {
                        if (!event.value) return;

                        setLightsourceParameters({
                            ...lightsource_parameters,
                            ray_divergence_degrees: event.value,
                        });
                    }}
                    maxFractionDigits={5}
                    suffix="°"
                />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Ray count (diverging):</label>
                <InputNumber
                    value={lightsource_parameters.count_diverging_rays}
                    onValueChange={(event: InputNumberValueChangeEvent) => {
                        if (!event.value) return;

                        setLightsourceParameters({
                            ...lightsource_parameters,
                            count_diverging_rays: event.value,
                        });
                    }}
                    maxFractionDigits={0}
                    suffix=" diverging rays"
                />
            </div>
        </div>
    );
}

export default LightsourceParameters;
