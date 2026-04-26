import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { useParameterContext } from "../../context/ParameterProvider";

export default function PlotFigure() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { selectedSpectrum } = useParameterContext();

  useEffect(() => {
    if (!selectedSpectrum) return;

    // Transform the spectrum data into a format suitable for Plot.dot
    const plotData = selectedSpectrum.wavelengths.map((wavelength, index) => ({
      Wavelength: wavelength,
      Intensity: selectedSpectrum.intensities[index],
    }));

    const plot = Plot.plot({
      y: { grid: true },
      color: { scheme: "burd" },
      marks: [
        Plot.ruleY([0]),
        Plot.dot(plotData, { x: "Wavelength", y: "Intensity", stroke: "Intensity" }),
      ],
    });

    if (containerRef.current) {
      containerRef.current.appendChild(plot);
    }

    return () => {
      plot.remove();
    };
  }, [selectedSpectrum]);

  return <div ref={containerRef} />;
}