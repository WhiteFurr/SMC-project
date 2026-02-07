import { useState } from "react";
import { cn } from "@/lib/utils";
import { LeafletHeatmap, HotspotData } from "./LeafletHeatmap";

type HeatmapType = "traffic" | "parking" | "hawker" | "reports" | "historical";

interface HeatmapToggle {
  id: HeatmapType;
  label: string;
}

const heatmapToggles: HeatmapToggle[] = [
  { id: "traffic", label: "Traffic Speed" },
  { id: "parking", label: "Parking Impact" },
  { id: "hawker", label: "Hawker / Obstruction" },
  { id: "reports", label: "Report Density" },
  { id: "historical", label: "Historical Pattern" },
];

export function CityHeatmap() {
  const [activeType, setActiveType] = useState<HeatmapType>("traffic");
  const [selectedHotspot, setSelectedHotspot] =
    useState<HotspotData | null>(null);

  return (
    <div className="gov-card overflow-hidden">
      {/* Toggle Buttons */}
      <div className="flex flex-wrap gap-2 border-b border-border p-4">
        {heatmapToggles.map((toggle) => (
          <button
            key={toggle.id}
            onClick={() => setActiveType(toggle.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeType === toggle.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {toggle.label}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative h-[400px] lg:h-[500px]">
        <LeafletHeatmap
          activeType={activeType}
          onHotspotSelect={setSelectedHotspot}
          selectedHotspot={selectedHotspot}
        />

        {/* 🔥 Heatmap Legend */}
        <div className="absolute bottom-4 right-4 z-[1000] rounded-lg border border-border bg-background/95 px-4 py-3 shadow-md backdrop-blur">
          <p className="mb-2 text-xs font-semibold text-foreground">
            Traffic Intensity
          </p>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Slow / Free Flow</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="text-muted-foreground">Moderate</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Heavy Congestion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Caption */}
      <div className="border-t border-border bg-muted/30 px-4 py-2">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Solapur City Traffic Heatmap</span> — Last
          updated: {new Date().toLocaleTimeString("en-IN")} | Click on hotspots
          for details
        </p>
      </div>
    </div>
  );
}
