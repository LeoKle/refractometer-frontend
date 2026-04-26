import Plot from 'react-plotly.js';
import { DetectorImage } from '../interfaces/DetectorImage.interface';

interface PlotDetectorImageProps {
    image?: DetectorImage;
}

const PlotDetectorImage: React.FC<PlotDetectorImageProps> = ({ image }) => {
    if (!image) return null;

    const { matrix } = image;

    return (
        <div>
            {matrix && (
                <Plot
                    data={[
                        {
                            z: matrix,
                            type: 'heatmap',
                            colorscale: 'Viridis',
                            showscale: true,
                            colorbar: { title: 'Intensity' },
                        }
                    ]}
                    layout={{
                        width: 1920,  // Set plot width
                        height: 1080, // Set plot height
                        xaxis: { title: 'Pixel X' },
                        yaxis: { title: 'Pixel Y' },
                    }}
                    config={{ responsive: true }}
                />
            )}
        </div>
    );
};

export default PlotDetectorImage;
