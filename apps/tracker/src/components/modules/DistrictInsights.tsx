import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import MauritiusDistrictMap from '../charts/MauritiusDistrictMap';

interface DistrictMetric {
  district: string;
  value: number;
  baseSize: number;
}

type MetricKey =
  | 'TOM Awareness'
  | 'Spontaneous Awareness'
  | 'Consumption P30D'
  | 'Ad Awareness'
  | 'Brand Consideration'
  | 'Net Promoter Score';

interface MetricDataSet {
  label: MetricKey;
  data: DistrictMetric[];
}

interface DistrictInsightsProps {
  metrics?: MetricDataSet[];
}

const DEFAULT_METRICS: MetricDataSet[] = [
  {
    label: 'TOM Awareness',
    data: [
      { district: 'Port Louis', value: 42, baseSize: 90 },
      { district: 'Pamplemousses', value: 38, baseSize: 99 },
      { district: 'Riviere du Rempart', value: 31, baseSize: 85 },
      { district: 'Flacq', value: 35, baseSize: 99 },
      { district: 'Grand Port', value: 29, baseSize: 78 },
      { district: 'Savanne', value: 26, baseSize: 65 },
      { district: 'Moka', value: 40, baseSize: 92 },
      { district: 'Black River', value: 33, baseSize: 70 },
      { district: 'Plaine Wilhems', value: 44, baseSize: 120 },
    ],
  },
  {
    label: 'Consumption P30D',
    data: [
      { district: 'Port Louis', value: 55, baseSize: 90 },
      { district: 'Pamplemousses', value: 48, baseSize: 99 },
      { district: 'Riviere du Rempart', value: 42, baseSize: 85 },
      { district: 'Flacq', value: 39, baseSize: 99 },
      { district: 'Grand Port', value: 36, baseSize: 78 },
      { district: 'Savanne', value: 30, baseSize: 65 },
      { district: 'Moka', value: 51, baseSize: 92 },
      { district: 'Black River', value: 44, baseSize: 70 },
      { district: 'Plaine Wilhems', value: 58, baseSize: 120 },
    ],
  },
  {
    label: 'Ad Awareness',
    data: [
      { district: 'Port Louis', value: 62, baseSize: 90 },
      { district: 'Pamplemousses', value: 55, baseSize: 99 },
      { district: 'Riviere du Rempart', value: 48, baseSize: 85 },
      { district: 'Flacq', value: 51, baseSize: 99 },
      { district: 'Grand Port', value: 45, baseSize: 78 },
      { district: 'Savanne', value: 38, baseSize: 65 },
      { district: 'Moka', value: 58, baseSize: 92 },
      { district: 'Black River', value: 50, baseSize: 70 },
      { district: 'Plaine Wilhems', value: 65, baseSize: 120 },
    ],
  },
  {
    label: 'Brand Consideration',
    data: [
      { district: 'Port Louis', value: 38, baseSize: 90 },
      { district: 'Pamplemousses', value: 34, baseSize: 99 },
      { district: 'Riviere du Rempart', value: 28, baseSize: 85 },
      { district: 'Flacq', value: 31, baseSize: 99 },
      { district: 'Grand Port', value: 25, baseSize: 78 },
      { district: 'Savanne', value: 22, baseSize: 65 },
      { district: 'Moka', value: 36, baseSize: 92 },
      { district: 'Black River', value: 29, baseSize: 70 },
      { district: 'Plaine Wilhems', value: 41, baseSize: 120 },
    ],
  },
  {
    label: 'Spontaneous Awareness',
    data: [
      { district: 'Port Louis', value: 68, baseSize: 90 },
      { district: 'Pamplemousses', value: 61, baseSize: 99 },
      { district: 'Riviere du Rempart', value: 55, baseSize: 85 },
      { district: 'Flacq', value: 58, baseSize: 99 },
      { district: 'Grand Port', value: 50, baseSize: 78 },
      { district: 'Savanne', value: 45, baseSize: 65 },
      { district: 'Moka', value: 64, baseSize: 92 },
      { district: 'Black River', value: 52, baseSize: 70 },
      { district: 'Plaine Wilhems', value: 72, baseSize: 120 },
    ],
  },
  {
    label: 'Net Promoter Score',
    data: [
      { district: 'Port Louis', value: 32, baseSize: 90 },
      { district: 'Pamplemousses', value: 28, baseSize: 99 },
      { district: 'Riviere du Rempart', value: 18, baseSize: 85 },
      { district: 'Flacq', value: 22, baseSize: 99 },
      { district: 'Grand Port', value: 15, baseSize: 78 },
      { district: 'Savanne', value: 10, baseSize: 65 },
      { district: 'Moka', value: 30, baseSize: 92 },
      { district: 'Black River', value: 20, baseSize: 70 },
      { district: 'Plaine Wilhems', value: 35, baseSize: 120 },
    ],
  },
];

function getRankColor(rank: number, total: number): string {
  const ratio = rank / total;
  if (ratio <= 0.33) return 'text-pulse-cyan';
  if (ratio <= 0.66) return 'text-pulse-amber';
  return 'text-pulse-meta';
}

export default function DistrictInsights({ metrics = DEFAULT_METRICS }: DistrictInsightsProps) {
  const [selectedMetricIndex, setSelectedMetricIndex] = useState(0);

  const selectedMetric = metrics[selectedMetricIndex] ?? metrics[0];

  const sortedDistricts = useMemo(() => {
    const data = selectedMetric?.data ?? [];
    return [...data].sort((a, b) => b.value - a.value);
  }, [selectedMetric]);

  const maxValue = useMemo(() => {
    if (sortedDistricts.length === 0) return 100;
    return Math.max(...sortedDistricts.map((d) => d.value));
  }, [sortedDistricts]);

  if (!selectedMetric) return null;

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-pulse-meta font-mono mb-1">
            District Insights
          </h3>
          <p className="text-xs text-pulse-meta">Regional performance across Mauritius</p>
        </div>

        {/* Metric selector */}
        <select
          value={selectedMetricIndex}
          onChange={(e) => setSelectedMetricIndex(Number(e.target.value))}
          className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#111827] text-pulse-body border border-[rgba(0,212,255,0.15)] focus:border-pulse-cyan focus:outline-none transition-colors cursor-pointer"
        >
          {metrics.map((m, i) => (
            <option key={m.label} value={i}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Content: Map + Ranking table */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Map */}
        <div className="lg:col-span-3">
          <MauritiusDistrictMap
            metricData={selectedMetric.data}
            metric={selectedMetric.label}
          />
        </div>

        {/* Ranking sidebar */}
        <div className="lg:col-span-2">
          <div className="mb-3">
            <h4 className="text-xs uppercase tracking-wider text-pulse-meta font-mono">
              Ranking by {selectedMetric.label}
            </h4>
          </div>

          <div className="space-y-2">
            {sortedDistricts.map((item, index) => (
              <motion.div
                key={item.district}
                className="flex items-center gap-3 p-2 rounded-lg bg-[rgba(17,24,39,0.5)]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                {/* Rank */}
                <span
                  className={`text-sm font-mono font-bold w-6 text-right ${getRankColor(index, sortedDistricts.length)}`}
                >
                  {index + 1}
                </span>

                {/* District info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white truncate">{item.district}</span>
                    <span className="text-xs font-mono text-pulse-cyan ml-2">
                      {item.value.toFixed(1)}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1 bg-[rgba(0,212,255,0.1)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #0a2a3a, #00D4FF)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / maxValue) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                    />
                  </div>

                  <span className="text-[10px] text-pulse-meta font-mono">n={item.baseSize}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
