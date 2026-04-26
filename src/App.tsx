import './App.css'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';


import Footer from './components/Footer';
import Navbar from './components/Navbar';
import LightsourceParameters from './components/parameters/Lightsource';
import SpectrumPage from './components/parameters/Spectrum';
import SamplePage from './components/parameters/Sample';
import Planes from './components/parameters/Planes';
import Overview from './components/Overview';
import DetectorParameters from './components/parameters/Detector';
import SimulationResults from './pages/SimulationResults';
import SimulationQueue from './pages/SimulationQueue';
import SimulationPage from './pages/Simulation';


function App() {
    return (
        <>
            <Router>
                <Navbar />
                <div className='m-5'>
                    <Routes>
                        <Route path='/' element={<Overview />} />
                        <Route path='/sim-results' element={<SimulationResults />} />
                        <Route path='/sim-queue' element={<SimulationQueue />} />
                        <Route path='/simulation' element={<SimulationPage />} >
                            <Route index element={<Navigate to="/simulation/lightsource-parameters" />} />
                            <Route path='lightsource-parameters' element={<LightsourceParameters />} />
                            <Route path='spectrums' element={<SpectrumPage />} />
                            <Route path='planes' element={<Planes />} />
                            <Route path='samples' element={<SamplePage />} />
                            <Route path='detector' element={<DetectorParameters />} />
                        </Route>
                    </Routes>
                </div>
                <Footer />
            </Router>
        </>
    )
}

export default App
