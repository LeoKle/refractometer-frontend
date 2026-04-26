import axios from "axios";
import { DetectorImage } from "../interfaces/DetectorImage.interface";

export async function getImage(image_id: string) {
    try {
        const response = await axios.get("/api/image/" + image_id);

        const image = {
            matrix: response.data.values
        } as DetectorImage

        return image;
    } catch (error) {
        console.error(error);
    }
}

export default { getImage };