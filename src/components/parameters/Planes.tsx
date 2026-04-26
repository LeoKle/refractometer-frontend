import VectorInputField from "./VectorInput";
import { useParameterContext } from "../../context/ParameterProvider";
import { Vector } from "../../interfaces/Vector.interface";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";

function Geometry() {
    const { geometryParameters, setGeometryParameters } = useParameterContext();

    return (
        <div className="grid gap-4">
            {/* <div className="flex items-center mb-2">
                <label className="mr-2">Base Vector</label>
                <VectorInputField vector={geometryParameters.planes.base_vector}
                    setFunction={(value: Vector) => {
                        setGeometryParameters({
                            ...geometryParameters,
                            planes: {
                                ...geometryParameters.planes,
                                base_vector: value
                            }
                        }
                        )
                    }}
                />
            </div> */}
            <div className="flex items-center mb-2">
                <label className="mr-2">Distance Plane 1</label>
                <InputNumber
                    value={geometryParameters.planes.distance1 * 100}
                    onChange={(e: InputNumberChangeEvent) => {
                        if (!e.value) return;

                        setGeometryParameters({
                            ...geometryParameters, planes: {
                                ...geometryParameters.planes,
                                distance1: e.value / 100
                            }
                        })
                    }}
                    suffix=" cm" />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Distance Plane 2</label>
                <InputNumber
                    value={geometryParameters.planes.distance2 * 100}
                    onChange={(e: InputNumberChangeEvent) => {
                        if (!e.value) return;

                        setGeometryParameters({
                            ...geometryParameters, planes: {
                                ...geometryParameters.planes,
                                distance2: e.value / 100
                            }
                        })
                    }}
                    suffix=" cm" />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Entry angle</label>
                <InputNumber
                    value={geometryParameters.planes.entry_angle}
                    onChange={(e: InputNumberChangeEvent) => {
                        if (!e.value) return;

                        setGeometryParameters({
                            ...geometryParameters, planes: {
                                ...geometryParameters.planes,
                                entry_angle: e.value
                            }
                        })
                    }}
                    suffix="°" />
            </div>
            <div className="flex items-center mb-2">
                <label className="mr-2">Prism angle</label>
                <InputNumber
                    value={geometryParameters.planes.prism_angle}
                    onChange={(e: InputNumberChangeEvent) => {
                        if (!e.value) return;

                        setGeometryParameters({
                            ...geometryParameters, planes: {
                                ...geometryParameters.planes,
                                prism_angle: e.value
                            }
                        })
                    }}
                    suffix="°" />
            </div>
        </div>
    );
}

export default Geometry;
