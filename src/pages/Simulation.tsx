import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { Divider } from "primereact/divider";
import SimulationControls from "../components/simulation/SimulationControls";

function SimulationPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const determineSubPage = () => {
        switch (location.pathname) {
            case "/simulation/lightsource-parameters":
                return 0;
            case "/simulation/spectrums":
                return 1;
            case "/simulation/planes":
                return 2;
            case "/simulation/samples":
                return 3;
            case "/simulation/detector":
                return 4;
            default:
                return 0;
        }
    }

    const [activeIndex, setActiveIndex] = useState<number>(determineSubPage());

    useEffect(() => {
        setActiveIndex(determineSubPage())
    }, [location.pathname]);

    const items: MenuItem[] = [
        {
            label: 'Lightsource',
            icon: 'pi pi-lightbulb',
            command: () => navigate("/simulation/lightsource-parameters")

        },
        {
            label: 'Spectrum',
            icon: 'pi pi-barcode',
            command: () => navigate("/simulation/spectrums")

        },
        {
            label: 'Planes',
            icon: 'pi pi-chevron-up',
            command: () => navigate("/simulation/planes")

        },
        {
            label: 'Sample',
            icon: 'pi pi-caret-up',
            command: () => navigate("/simulation/samples")

        },
        {
            label: 'Detector',
            icon: 'pi pi-camera',
            command: () => navigate("/simulation/detector")
        }
    ];

    return (
        <>
            <TabMenu model={items} activeIndex={activeIndex} />
            <Divider />
            <SimulationControls />
            <Divider />
            <Outlet />
        </>
    );
}

export default SimulationPage;