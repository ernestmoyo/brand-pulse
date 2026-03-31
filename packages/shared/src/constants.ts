export const METRIC_LABELS: Record<string, string> = {
  tom_awareness: 'Top of Mind Awareness',
  spontaneous_awareness: 'Spontaneous Awareness',
  aided_awareness: 'Aided / Total Awareness',
  brand_consumed: 'Brand Consumed (Ever)',
  consumption_30day: 'Consumed in Past 30 Days',
  most_often_brand: 'Most Often Brand',
  consideration: 'Consideration',
  trial: 'Trial',
  regular_use: 'Regular Use',
  ad_awareness: 'Advertising Awareness',
  share_of_voice: 'Share of Voice',
  quality_perception: 'Quality Perception',
  value_perception: 'Value for Money',
  nps_proxy: 'Net Promoter Proxy',
};

export const WAVE_STATUS_LABELS: Record<string, string> = {
  PLANNED: 'Planned',
  FIELDWORK: 'Fieldwork',
  PROCESSING: 'Processing',
  PUBLISHED: 'Published',
};

export const REPORT_SECTION_LABELS: Record<string, string> = {
  executive_summary: 'Executive Summary',
  key_learnings: 'Key Learnings & Way Forward',
  sample_profile: 'Sample Profile',
  factors_influencing: 'Factors Influencing Consumption',
  category_consumption: 'Category Consumption',
  brand_awareness: 'Brand Awareness',
  ad_awareness_sov: 'Advertising Awareness & Share of Voice',
  brand_consumption: 'Brand Consumption',
  purchasing_behaviour: 'Purchasing Behaviour',
  place_of_purchase: 'Place of Purchase',
  brand_positioning: 'Brand Positioning',
  pricing_monitoring: 'Price Monitoring',
  competitive_landscape: 'Competitive Landscape',
  district_analysis: 'District-Level Analysis',
  recommendations: 'Recommendations',
};

export const DEMOGRAPHIC_OPTIONS = {
  sex: ['Male', 'Female'],
  ageGroup: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  sec: ['AB', 'C1', 'C2D', 'Students', 'Household Duties', 'Unemployed', 'Retired'],
  zone: ['Urban', 'Rural'],
  district: [
    'Port Louis',
    'Pamplemousses',
    'Riviere du Rempart',
    'Flacq',
    'Grand Port',
    'Savanne',
    'Moka',
    'Riviere Noire',
    'Beau-Bassin/Rose-Hill',
    'Quatre-Bornes',
    'Vacoas/Phoenix',
    'Curepipe',
  ],
  hhIncome: [
    'Less than Rs 10,000',
    'Rs 10,000 – Rs 19,999',
    'Rs 20,000 – Rs 29,999',
    'Rs 30,000 – Rs 49,999',
    'Rs 50,000 – Rs 69,999',
    'Rs 70,000+',
  ],
};

export const SIGNIFICANCE_ALPHA = 0.05;
