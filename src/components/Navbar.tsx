import { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Toolbar } from 'primereact/toolbar';
import { MenuItem } from 'primereact/menuitem';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [tabMenu, setTabMenu] = useState<number>(0);

    const items: MenuItem[] = [
        {
            label: 'Results',
            icon: 'pi pi-list',
            command: () => navigate('/sim-results')
        },
        {
            label: 'Queue',
            icon: 'pi pi-arrows-v',
            command: () => navigate('/sim-queue')
        },
        {
            label: 'Simulation',
            icon: 'pi pi-lightbulb',
            command: () => navigate('/simulation')
        },
        {
            label: 'Optimizer',
            icon: 'pi pi-lightbulb',
            command: () => navigate('/optimizer')
        },
    ];

    useEffect(() => {
        const pathToIndex = {
            '/': 0,
            '/sim-results': 0,
            '/sim-queue': 1,
            '/simulation': 2,
            '/simulation/lightsource-parameters': 2,
            '/simulation/spectrums': 2,
            '/simulation/planes': 2,
            '/simulation/samples': 2,
            '/simulation/detector': 2,
            '/optimizer': 3,
        };
        setTabMenu(pathToIndex[location.pathname] ?? 0);
    }, [location.pathname]);

    const startContent = (
        <>
            <TabMenu model={items} activeIndex={tabMenu} onTabChange={(e) => setTabMenu(e.index)} />
        </>
    );

    const endContent = (
        <>
        </>
    );

    return (
        <>
            <Toolbar start={startContent} end={endContent} />
        </>
    );
}

export default Navbar;
