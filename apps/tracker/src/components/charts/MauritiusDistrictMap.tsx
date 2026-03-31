import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

interface DistrictMetric {
  district: string;
  value: number;
  baseSize: number;
}

interface MauritiusDistrictMapProps {
  metricData: DistrictMetric[];
  metric: string;
  colorScale?: string;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  district: string;
  value: number;
  baseSize: number;
}

type GeoFeature = GeoJSON.Feature<GeoJSON.Geometry, { name: string; nameFr: string; code: string }>;
type GeoCollection = GeoJSON.FeatureCollection<GeoJSON.Geometry, { name: string; nameFr: string; code: string }>;

/**
 * Maps user-facing district names to GeoJSON district names.
 * The shapefile uses 9 administrative districts; the 4 city-level names
 * (Beau-Bassin/Rose-Hill, Quatre-Bornes, Vacoas/Phoenix, Curepipe)
 * all fall within the Plaine Wilhems district.
 */
const DISTRICT_NAME_MAP: Record<string, string> = {
  'Port Louis': 'Port Louis',
  'Pamplemousses': 'Pamplemousses',
  'Riviere du Rempart': 'Riviere du Rempart',
  'Flacq': 'Flacq',
  'Grand Port': 'Grand Port',
  'Savanne': 'Savanne',
  'Moka': 'Moka',
  'Black River': 'Black River',
  'Riviere Noire': 'Black River',
  'Plaine Wilhems': 'Plaine Wilhems',
  'Plaines Wilhems': 'Plaine Wilhems',
  'Beau-Bassin/Rose-Hill': 'Plaine Wilhems',
  'Quatre-Bornes': 'Plaine Wilhems',
  'Vacoas/Phoenix': 'Plaine Wilhems',
  'Curepipe': 'Plaine Wilhems',
};

const INITIAL_TOOLTIP: TooltipState = {
  visible: false,
  x: 0,
  y: 0,
  district: '',
  value: 0,
  baseSize: 0,
};

function resolveDistrictName(name: string): string {
  return DISTRICT_NAME_MAP[name] ?? name;
}

function buildMetricLookup(data: readonly DistrictMetric[]): Map<string, DistrictMetric> {
  const lookup = new Map<string, DistrictMetric>();
  for (const item of data) {
    const resolved = resolveDistrictName(item.district);
    const existing = lookup.get(resolved);
    if (existing) {
      // Average values for sub-districts mapping to same GeoJSON district
      lookup.set(resolved, {
        district: resolved,
        value: (existing.value + item.value) / 2,
        baseSize: existing.baseSize + item.baseSize,
      });
    } else {
      lookup.set(resolved, { ...item, district: resolved });
    }
  }
  return lookup;
}

export default function MauritiusDistrictMap({
  metricData,
  metric,
}: MauritiusDistrictMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [geojson, setGeojson] = useState<GeoCollection | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(INITIAL_TOOLTIP);
  const [dimensions, setDimensions] = useState({ width: 400, height: 480 });

  // Load GeoJSON
  useEffect(() => {
    fetch('/mauritius-districts.geojson')
      .then((res) => res.json())
      .then((data: GeoCollection) => setGeojson(data))
      .catch(() => {
        // GeoJSON load failed - component will show empty state
      });
  }, []);

  // Observe container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width } = entry.contentRect;
        setDimensions({ width, height: Math.max(320, width * 1.2) });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Render map
  useEffect(() => {
    if (!geojson || !svgRef.current) return;

    const { width, height } = dimensions;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const metricLookup = buildMetricLookup(metricData);
    const values = Array.from(metricLookup.values()).map((d) => d.value);
    const minVal = Math.min(...values, 0);
    const maxVal = Math.max(...values, 100);

    // Color scale: light to dark cyan
    const color = d3
      .scaleLinear<string>()
      .domain([minVal, maxVal])
      .range(['#0a2a3a', '#00D4FF'])
      .clamp(true);

    // Projection fitted to container
    const projection = d3.geoMercator().fitSize([width, height - 60], geojson);
    const pathGenerator = d3.geoPath().projection(projection);

    const g = svg.append('g');

    // Draw districts
    g.selectAll<SVGPathElement, GeoFeature>('path')
      .data(geojson.features as GeoFeature[])
      .join('path')
      .attr('d', (d) => pathGenerator(d) ?? '')
      .attr('fill', (d) => {
        const data = metricLookup.get(d.properties.name);
        return data ? color(data.value) : '#0a2a3a';
      })
      .attr('stroke', 'rgba(0, 212, 255, 0.3)')
      .attr('stroke-width', 0.8)
      .attr('cursor', 'pointer')
      .style('transition', 'fill 0.4s ease, stroke-width 0.2s ease')
      .on('mouseenter', function () {
        d3.select(this).attr('stroke', '#00D4FF').attr('stroke-width', 2);
      })
      .on('mouseleave', function () {
        d3.select(this).attr('stroke', 'rgba(0, 212, 255, 0.3)').attr('stroke-width', 0.8);
      });

    // District labels
    g.selectAll<SVGTextElement, GeoFeature>('text')
      .data(geojson.features as GeoFeature[])
      .join('text')
      .attr('x', (d) => {
        const centroid = pathGenerator.centroid(d);
        return centroid[0];
      })
      .attr('y', (d) => {
        const centroid = pathGenerator.centroid(d);
        return centroid[1];
      })
      .text((d) => d.properties.name)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', '#FFFFFF')
      .attr('font-size', '9px')
      .attr('font-family', '"JetBrains Mono", monospace')
      .attr('pointer-events', 'none')
      .attr('opacity', 0.85);

    // Legend
    const legendWidth = Math.min(200, width - 40);
    const legendHeight = 10;
    const legendX = (width - legendWidth) / 2;
    const legendY = height - 40;

    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'map-legend-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%');

    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#0a2a3a');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#00D4FF');

    const legend = svg.append('g').attr('transform', `translate(${legendX}, ${legendY})`);

    legend
      .append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('rx', 3)
      .attr('fill', 'url(#map-legend-gradient)');

    legend
      .append('text')
      .attr('x', 0)
      .attr('y', legendHeight + 14)
      .text(`${minVal.toFixed(0)}%`)
      .attr('fill', '#64748B')
      .attr('font-size', '10px')
      .attr('font-family', '"JetBrains Mono", monospace');

    legend
      .append('text')
      .attr('x', legendWidth)
      .attr('y', legendHeight + 14)
      .text(`${maxVal.toFixed(0)}%`)
      .attr('fill', '#64748B')
      .attr('font-size', '10px')
      .attr('font-family', '"JetBrains Mono", monospace')
      .attr('text-anchor', 'end');

    legend
      .append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -6)
      .text(metric)
      .attr('fill', '#94A3B8')
      .attr('font-size', '10px')
      .attr('font-family', '"JetBrains Mono", monospace')
      .attr('text-anchor', 'middle');
  }, [geojson, metricData, metric, dimensions]);

  // Attach mouse events via React (cleaner than D3 for tooltip state)
  useEffect(() => {
    if (!geojson || !svgRef.current) return;

    const svg = svgRef.current;
    const paths = svg.querySelectorAll('path');
    const features = geojson.features as GeoFeature[];
    const metricLookup = buildMetricLookup(metricData);

    const handlers: Array<{ path: Element; move: (e: MouseEvent) => void; leave: () => void }> = [];

    paths.forEach((path, i) => {
      const feature = features[i];
      if (!feature) return;

      const move = (e: MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const name = feature.properties.name;
        const data = metricLookup.get(name);
        setTooltip({
          visible: true,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          district: name,
          value: data?.value ?? 0,
          baseSize: data?.baseSize ?? 0,
        });
      };

      const leave = () => setTooltip(INITIAL_TOOLTIP);

      path.addEventListener('mousemove', move as EventListener);
      path.addEventListener('mouseleave', leave);
      handlers.push({ path, move, leave });
    });

    return () => {
      for (const { path, move, leave } of handlers) {
        path.removeEventListener('mousemove', move as EventListener);
        path.removeEventListener('mouseleave', leave);
      }
    };
  }, [geojson, metricData]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full h-auto"
      />

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute pointer-events-none z-10"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 10,
            transform: 'translateY(-100%)',
          }}
        >
          <div
            className="px-3 py-2 rounded-lg text-xs font-mono"
            style={{
              background: '#1A2332',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div className="text-white font-medium mb-1">{tooltip.district}</div>
            <div className="text-pulse-cyan">
              {metric}: {tooltip.value.toFixed(1)}%
            </div>
            <div className="text-pulse-meta text-[10px]">n={tooltip.baseSize}</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
