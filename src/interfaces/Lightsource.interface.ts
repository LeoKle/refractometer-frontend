import { Vector } from "./Vector.interface";

export interface LightsourceParameters {
    direction_vector: Vector,
    support_vector: Vector,

    gap_height_meters: number,
    count_rays_height: number,
    gap_width_meters: number,
    count_rays_width: number,

    ray_divergence_degrees: number,
    count_diverging_rays: number
}