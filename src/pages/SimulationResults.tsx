import { useEffect, useState } from "react";

import { SimulationResult } from "../interfaces/SimulationResult";
import { DataTable } from "primereact/datatable";
import resultsService from "../services/results.service";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import PlotDetectorImage from "../components/DetectorImage";
import { DetectorImage } from "../interfaces/DetectorImage.interface";
import imageService from "../services/image.service";

function SimulationResults() {
    const [results, setResults] = useState<SimulationResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedImage, setSelectedImage] = useState<DetectorImage | undefined>();
    const [imageLoading, setImageLoading] = useState<boolean>(false);

    const loadResults = async () => {
        setLoading(true);
        const data = await resultsService.getSimulationResults();
        setResults(data);
        setLoading(false);
    };

    useEffect(() => {
        loadResults();
    }, []);

    const tableHeader = (
        <>
            <Button
                label="Reload"
                onClick={() => loadResults()}
                icon="pi pi-refresh"
                disabled={loading}
            />
        </>
    );

    const renderDate = (date?: Date) => {
        if (!date) return "";
        return new Date(date).toLocaleString();
    }

    const actions = (rowData: SimulationResult) => {
        return (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                    label="Copy"
                    severity="info"
                    icon="pi pi-clone"
                    onClick={() => { throw new Error("Not implemented") }}
                />
                <Button
                    label="Delete"
                    severity="danger"
                    icon="pi pi-trash"
                    onClick={() => {
                        if (rowData.id) { resultsService.deleteSimulationResult(rowData.id); loadResults(); }
                    }}
                />
            </div>
        );
    }

    return (
        <>
            <DataTable value={results} header={tableHeader}>
                <Column field="id" header="ID" />
                <Column field="parameters" header="Parameters" body={(data: SimulationResult) => {
                    return JSON.stringify(data.parameters, null, 2);
                }} />
                <Column field="image_id" header="Detector Image" body={(data: SimulationResult) => {
                    return <Button label="View"
                        disabled={imageLoading}
                        onClick={async () => {
                            if (!data.image_id) return;

                            setImageLoading(true);
                            const image = await imageService.getImage(data.image_id)
                            setSelectedImage(image);
                            setImageLoading(false);
                        }} />;
                }} />
                <Column
                    field="issued_at"
                    header="Issued at"
                    sortable
                    body={(data: SimulationResult) => renderDate(data.issued_at)}
                />
                <Column
                    field="completed_at"
                    header="Completed at"
                    sortable
                    body={(data: SimulationResult) => renderDate(data.completed_at)}
                />
                <Column
                    header="Actions"
                    body={actions}
                />
            </DataTable>
            <PlotDetectorImage image={selectedImage} />
        </>
    );
}

export default SimulationResults;