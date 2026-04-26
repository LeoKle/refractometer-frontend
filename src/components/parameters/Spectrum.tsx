import { useParameterContext } from "../../context/ParameterProvider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { Spectrum } from "../../interfaces/Spectrum.interface";
import { useEffect, useState } from "react";
import spectrumService from "../../services/spectrum.service";
import PlotFigure from "./SpectrumPlot";
function SpectrumPage() {
  const { selectedSpectrum, setSelectedSpectrum } = useParameterContext();

  const [options, setOptions] = useState<Spectrum[]>([]);

  async function fetchSpectrums() {
    const spectrums = await spectrumService.getSpectrums();
    setOptions(spectrums);

    const updatedSelectedSpectrum = spectrums.find(spectrum => (spectrum._id === selectedSpectrum?._id));
    setSelectedSpectrum(updatedSelectedSpectrum || null);
  }

  useEffect(() => {
    fetchSpectrums();

  }, []);

  function renderArray(data: number[], id: string) {
    if (data.length < 10) {
      return (
        data.map((value, index) => (
          <div key={index}>{value}</div>
        ))
      );
    } else {
      return <div key={id}>{data.length} Elements</div>
    }
  }

  function isSelectedRow(rowData: Spectrum) {
    if (rowData._id === undefined || selectedSpectrum === undefined) return false;

    return rowData._id === selectedSpectrum?._id;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-visible self-center">
        <PlotFigure />
      </div>
      <Button severity="warning" icon="pi pi-sync" onClick={fetchSpectrums} />
      <div className="flex flex-column h-1/2">
        <DataTable
          value={options}
          style={{ minWidth: '90vw' }} >
          <Column field="name" header="Name" />
          <Column
            header="Wavelengths"
            body={(rowData: Spectrum) => (renderArray(rowData.wavelengths, rowData._id))}
          />
          <Column
            header="Intensities"
            body={(rowData: Spectrum) => (renderArray(rowData.intensities, rowData._id))}
          />
          <Column
            header="Actions"
            body={(rowData: Spectrum) => {
              const rowSelected = isSelectedRow(rowData);

              return <Button
                key={rowData._id}
                onClick={() => { setSelectedSpectrum(rowData); }}
                label={rowSelected ? "Selected" : "Select"}
                severity={rowSelected ? 'success' : 'warning'}
              />;
            }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default SpectrumPage;