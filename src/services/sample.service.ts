import axios from 'axios';
import { SampleParameters } from '../interfaces/Sample.interface';

export async function getSamples(): Promise<SampleParameters[]> {
    try {
        const response = await axios.get('/api/samples');

        const sampleData: SampleParameters[] = response.data.map(item => ({
            name: item.name,
            _id: item.id,
            sellmeier_coefficients: {
                B: item.sellmeier_coefficients.B,
                C: item.sellmeier_coefficients.C
            }
        }));

        return sampleData;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default { getSamples };