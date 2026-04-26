import { Vector } from "./Vector.interface";

export interface Plane {
    normal_vector: Vector,
    support_vector: Vector,
}

export interface PlaneGeometry {
    base_vector: Vector,
    entry_angle: number,
    prism_angle: number,
    distance1: number,
    distance2: number,
}