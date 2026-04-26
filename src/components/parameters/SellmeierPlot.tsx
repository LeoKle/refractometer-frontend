import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { SampleParameters } from "../../interfaces/Sample.interface";

interface SellmeierPlotProps {
    sample: SampleParameters | null;
}

export default function SellmeierPlot({ sample }: SellmeierPlotProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sample) return;

        const wavelengths = d3.range(300, 800, 1); // in nm

        // Calculate the refractive index using the Sellmeier equation
        const refractiveIndices = wavelengths.map((wavelength) => {
            const lambda = wavelength * 1e-3; // convert nm to um
            const { B, C } = sample.sellmeier_coefficients;
            const n_squared = 1 + B.reduce((sum, b, i) => {
                return sum + (b * lambda * lambda) / (lambda * lambda - C[i]);
            }, 0);
            return Math.sqrt(n_squared);
        });

        const plotData = wavelengths.map((wavelength, index) => ({
            Wavelength: wavelength,
            RefractiveIndex: refractiveIndices[index],
        }));

        const plot = Plot.plot({
            x: { label: "Wavelength (nm)" },
            y: { label: "Refractive Index", grid: true },
            color: { scheme: "burd" },
            marks: [
                Plot.line(plotData, { x: "Wavelength", y: "RefractiveIndex" }),
            ],
        });

        if (containerRef.current) {
            containerRef.current.innerHTML = ""; // Clear previous plot
            containerRef.current.appendChild(plot);
        }

        return () => {
            if (plot) plot.remove();
        };
    }, [sample]);

    return <div ref={containerRef} />;
}
