import { useEffect, useState } from "react";

import { SimulationQueueElement } from "../interfaces/SimulationQueue";
import queuedService from "../services/queued.service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

function SimulationQueue() {

    const [queuedSims, setQueuedSims] = useState<SimulationQueueElement[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchQueuedSims = async () => {
        setLoading(true);
        const data = await queuedService.getQueuedSimulation();
        setQueuedSims(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchQueuedSims();
    }, [])

    const renderDate = (date?: Date) => {
        if (!date) return "";

        return new Date(date).toLocaleString();
    }

    return (
        <>
            <DataTable value={queuedSims} sortOrder={1}>
                <Column
                    field="index"
                    header="Index"
                    align="center"
                    sortable
                    style={{ maxWidth: "1vw" }}
                    body={(data: SimulationQueueElement) => {
                        return <>
                            <Button
                                label={data.index?.toString()}
                                severity={data.being_processed ? "danger" : "success"}
                            />
                        </>
                    }}
                />
                <Column field="id" header="ID" />
                <Column field="issuer" header="Issued By" />
                <Column
                    field="issued_at"
                    header="Issued at"
                    sortable
                    body={(data: SimulationQueueElement) => renderDate(data.completed_at)}
                />
            </DataTable>
        </>
    );
}

export default SimulationQueue;