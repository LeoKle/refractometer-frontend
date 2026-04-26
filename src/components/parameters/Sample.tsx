import { DataTable } from "primereact/datatable";
import { useParameterContext } from "../../context/ParameterProvider";
import { SampleParameters } from "../../interfaces/Sample.interface";
import { Column } from "primereact/column";
import SellmeierPlot from "./SellmeierPlot";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import sampleService from "../../services/sample.service";

function SamplePage() {
    const { selectedSample, setSelectedSample } = useParameterContext();

    const [options, setOptions] = useState<SampleParameters[]>([]);

    async function fetchSamples() {
        const samples = await sampleService.getSamples();
        setOptions(samples);

        const updatedSelectedSample = samples.find(spectrum => (spectrum._id === selectedSample?._id));
        setSelectedSample(updatedSelectedSample || null);
    }

    useEffect(() => {
        fetchSamples();
    }, []);

    const renderSellmeierCoefficients = (rowData: SampleParameters) => {
        return (
            <div>
                <strong>B:</strong> {rowData.sellmeier_coefficients.B.join(", ")}<br />
                <strong>C:</strong> {rowData.sellmeier_coefficients.C.map(c => `${c} µm²`).join(", ")}
            </div>
        );
    };

    function isSelectedRow(rowData: SampleParameters) {
        if (rowData._id === undefined || selectedSample === undefined) return false;

        return rowData._id === selectedSample?._id;
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="flex-1 overflow-visible self-center">
                    <SellmeierPlot sample={selectedSample} />
                </div>
                <Button severity="warning" icon="pi pi-sync" onClick={fetchSamples} />
                <div className="flex flex-column h-1/2">
                    <DataTable value={options} style={{ minWidth: '90vw' }}>
                        <Column field="name" header="Name" />
                        <Column field="sellmeierCoefficients" header="Sellmeier Coefficients" body={renderSellmeierCoefficients} />
                        <Column
                            header="Actions"
                            body={(rowData: SampleParameters) => {
                                const rowSelected = isSelectedRow(rowData);

                                return <Button
                                    key={rowData._id}
                                    onClick={() => { setSelectedSample(rowData); }}
                                    label={rowSelected ? "Selected" : "Select"}
                                    severity={rowSelected ? 'success' : 'warning'}
                                />;
                            }}
                        />
                    </DataTable>
                </div>
            </div>
        </>
    );
}


export default SamplePage;
