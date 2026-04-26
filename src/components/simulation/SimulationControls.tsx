import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';

import { useParameterContext } from '../../context/ParameterProvider';
import { SimulationParameters } from '../../interfaces/SimulationParameters.interface';
import { SimulationQueueElement } from '../../interfaces/SimulationQueue';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import queuedService, { queueSimulationResponse } from '../../services/queued.service';

function SimulationControls() {
    const [simName, setSimName] = useState<string>("");
    const { lightsource_parameters, selectedSpectrum, selectedSample, geometryParameters, detectorParameters } = useParameterContext();

    const [parametersValid, setParametersValid] = useState<boolean>(false);


    useEffect(() => {
        if (!lightsource_parameters || !selectedSpectrum || !selectedSample || !geometryParameters || !detectorParameters)
            setParametersValid(true)
        else
            setParametersValid(false);
    }, [lightsource_parameters, selectedSpectrum, selectedSample, geometryParameters, detectorParameters])

    const toast = useRef<Toast>(null);

    return (
        <>
            <Toast ref={toast} />
            <Button
                label='Queue Simulation'
                disabled={parametersValid}
                style={{ marginRight: '0.5rem' }}
                onClick={async () => {
                    if (!lightsource_parameters || !selectedSpectrum || !selectedSample || !geometryParameters || !detectorParameters)
                        return;

                    const simulation_parameters: SimulationParameters = {
                        lightsource: lightsource_parameters,
                        spectrum: selectedSpectrum,
                        sample: selectedSample,
                        planes: geometryParameters.planes,
                        detector: detectorParameters
                    }

                    const element_to_queue: SimulationQueueElement = {
                        parameters: simulation_parameters,
                        issuer: "User",
                        name: simName,
                        issued_at: new Date(),
                    }

                    const responseState = await queuedService.queueSimulation(element_to_queue);

                    if (responseState == queueSimulationResponse.SUCCESS) {
                        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Simulation queued' });
                    } else {
                        toast.current?.show({ severity: 'error', summary: 'Failed', detail: 'Could not queue simulation' });
                    }
                }}
            />
            <InputText placeholder='Simulation name' value={simName} onChange={(e) => setSimName(e.target.value)} />
        </>
    );
}

export default SimulationControls;