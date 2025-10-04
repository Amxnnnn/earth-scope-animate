import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Layer {
  id: string;
  name: string;
  instrument: string;
  description: string;
}

const TERRA_LAYERS: Layer[] = [
  {
    id: 'modis',
    name: 'MODIS',
    instrument: 'Moderate Resolution Imaging Spectroradiometer',
    description: 'Cloud cover, vegetation, ocean temperature',
  },
  {
    id: 'misr',
    name: 'MISR',
    instrument: 'Multi-angle Imaging SpectroRadiometer',
    description: 'Aerosols, clouds, land surface',
  },
  {
    id: 'ceres',
    name: 'CERES',
    instrument: 'Clouds and Earth\'s Radiant Energy System',
    description: 'Earth\'s energy balance',
  },
  {
    id: 'aster',
    name: 'ASTER',
    instrument: 'Advanced Spaceborne Thermal Emission',
    description: 'Temperature, elevation, surface properties',
  },
  {
    id: 'mopitt',
    name: 'MOPITT',
    instrument: 'Measurements of Pollution in the Troposphere',
    description: 'Carbon monoxide, methane',
  },
];

interface LayerSelectorProps {
  activeLayer: string;
  onLayerChange: (layerId: string) => void;
}

const LayerSelector = ({ activeLayer, onLayerChange }: LayerSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Terra Instruments</h3>
        {activeLayer !== 'none' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLayerChange('none')}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        {TERRA_LAYERS.map((layer) => (
          <button
            key={layer.id}
            onClick={() => onLayerChange(layer.id)}
            className={`
              w-full text-left p-4 rounded-lg border transition-all
              ${activeLayer === layer.id 
                ? 'bg-primary/10 border-primary shadow-glow' 
                : 'bg-card border-border hover:border-primary/50'
              }
            `}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-primary">{layer.name}</span>
                  {activeLayer === layer.id && (
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {layer.instrument}
                </p>
                <p className="text-xs text-muted-foreground/80">
                  {layer.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Note:</span> Select an instrument to visualize its data layer on the globe. 
          In production, this would integrate with NASA's Terra data APIs.
        </p>
      </div>
    </div>
  );
};

export default LayerSelector;
