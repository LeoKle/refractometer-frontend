import axios from 'axios';

interface VersionData {
  version: string;
}

export async function getVersion(): Promise<VersionData> {
  try {
    const response = await axios.get<VersionData>('/api/version');

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default { getVersion };