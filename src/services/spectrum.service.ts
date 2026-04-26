import axios from 'axios';
import { Spectrum } from '../interfaces/Spectrum.interface';

export async function getSpectrums(): Promise<Spectrum[]> {
  try {
    const response = await axios.get('/api/spectrums');

    const spectrumData: Spectrum[] = response.data.map(item => ({
      name: item.name,
      _id: item.id,
      wavelengths: item.wavelengths,
      intensities: item.intensities
    }));

    return spectrumData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default { getSpectrums };