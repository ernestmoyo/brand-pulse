import { PrismaClient, WaveStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.warn('Seeding Exotica database...');

  // ========================================
  // Organizations
  // ========================================
  const exotica = await prisma.organization.create({
    data: {
      name: 'Exotica Agency',
      slug: 'exotica-agency',
      type: 'CONSULTANCY',
    },
  });

  const nestleOrg = await prisma.organization.create({
    data: {
      name: 'Nestle Mauritius',
      slug: 'nestle-mauritius',
      type: 'CLIENT',
    },
  });

  // ========================================
  // Users
  // ========================================
  const adminPassword = await bcrypt.hash('Admin@2024', 12);
  const analystPassword = await bcrypt.hash('Analyst@2024', 12);
  const clientPassword = await bcrypt.hash('Client@2024', 12);

  await prisma.user.create({
    data: {
      email: 'admin@exotica.mu',
      passwordHash: adminPassword,
      name: 'Irfan Mooradun',
      role: 'ADMIN',
      organizationId: exotica.id,
    },
  });

  await prisma.user.create({
    data: {
      email: 'analyst@exotica.mu',
      passwordHash: analystPassword,
      name: 'Priya Doorgakant',
      role: 'ANALYST',
      organizationId: exotica.id,
    },
  });

  await prisma.user.create({
    data: {
      email: 'nestle@client.mu',
      passwordHash: clientPassword,
      name: 'Avinash Doobur',
      role: 'CLIENT_VIEWER',
      organizationId: nestleOrg.id,
    },
  });

  // ========================================
  // Clients & Brands
  // ========================================
  const nestleClient = await prisma.client.create({
    data: {
      name: 'Nestle Mauritius',
      slug: 'nestle-mauritius',
      primaryColor: '#D4001A',
      organizationId: exotica.id,
    },
  });

  const nescafe = await prisma.brand.create({
    data: {
      name: 'Nescafe',
      slug: 'nescafe',
      clientId: nestleClient.id,
    },
  });

  // ========================================
  // Study
  // ========================================
  const study = await prisma.study.create({
    data: {
      name: 'Mauritius Coffee & Hot Beverage Brand Tracker 2023-2024',
      description:
        'Quarterly consumer brand health tracking study for coffee and hot beverage brands in Mauritius. n=900/quarter, telephone interviews (CATI) across all 12 districts.',
      brandId: nescafe.id,
      country: 'Mauritius',
      startDate: new Date('2023-01-01'),
    },
  });

  // ========================================
  // Competitor Brands
  // ========================================
  const competitors = ['Jacobs', 'Douwe Egberts', 'Local/Unbranded', 'Bru Coffee'];
  const competitorRecords = [];
  for (const name of competitors) {
    const comp = await prisma.competitorBrand.create({
      data: { name, studyId: study.id },
    });
    competitorRecords.push(comp);
  }

  // ========================================
  // Waves (Q1-2023 through Q2-2024)
  // ========================================
  const waveDefinitions = [
    { label: 'Q1-2023', period: 'Jan-Mar 2023', start: '2023-01-09', end: '2023-03-24', n: 907, status: 'PUBLISHED' },
    { label: 'Q2-2023', period: 'Apr-Jun 2023', start: '2023-04-10', end: '2023-06-23', n: 894, status: 'PUBLISHED' },
    { label: 'Q3-2023', period: 'Jul-Sep 2023', start: '2023-07-10', end: '2023-09-22', n: 912, status: 'PUBLISHED' },
    { label: 'Q4-2023', period: 'Oct-Dec 2023', start: '2023-10-09', end: '2023-12-15', n: 898, status: 'PUBLISHED' },
    { label: 'Q1-2024', period: 'Jan-Mar 2024', start: '2024-01-08', end: '2024-03-22', n: 905, status: 'PUBLISHED' },
    { label: 'Q2-2024', period: 'Apr-Jun 2024', start: '2024-04-08', end: '2024-06-21', n: 891, status: 'PROCESSING' },
  ];

  const waves = [];
  for (const w of waveDefinitions) {
    const wave = await prisma.wave.create({
      data: {
        label: w.label,
        studyId: study.id,
        period: w.period,
        status: w.status as WaveStatus,
        fieldworkStart: new Date(w.start),
        fieldworkEnd: new Date(w.end),
        targetN: 900,
        actualN: w.n,
      },
    });
    waves.push(wave);
  }

  // ========================================
  // Brand Metrics — Nescafe (primary, dominant brand)
  // ========================================
  const nescafeMetrics: Record<string, number[]> = {
    //                        Q1-23  Q2-23  Q3-23  Q4-23  Q1-24  Q2-24
    tom_awareness:          [33.2,  33.8,  34.1,  34.5,  35.2,  35.4],
    spontaneous_awareness:  [61.5,  62.1,  61.8,  62.4,  62.7,  62.3],
    aided_awareness:        [88.7,  89.1,  89.3,  89.0,  89.5,  89.2],
    brand_consumed:         [54.3,  54.8,  55.1,  54.6,  55.4,  55.2],
    consumption_30day:      [47.5,  48.1,  47.8,  48.3,  48.6,  48.2],
    most_often_brand:       [31.2,  31.5,  31.8,  32.1,  32.5,  32.8],
    ad_awareness:           [38.5,  39.2,  40.1,  40.8,  44.3,  43.7],
    share_of_voice:         [37.2,  38.5,  36.8,  39.1,  38.4,  37.9],
    quality_perception:     [71.5,  72.1,  71.8,  72.3,  72.6,  72.4],
    value_perception:       [57.2,  57.8,  58.1,  57.5,  58.4,  58.2],
    consideration:          [64.3,  64.8,  65.1,  64.7,  65.4,  65.2],
    nps_proxy:              [44.5,  44.8,  45.2,  44.9,  45.5,  45.3],
  };

  for (const [metric, values] of Object.entries(nescafeMetrics)) {
    for (let i = 0; i < waves.length; i++) {
      await prisma.brandMetric.create({
        data: {
          brandId: nescafe.id,
          waveId: waves[i].id,
          metric,
          value: values[i],
          baseSize: waveDefinitions[i].n,
        },
      });
    }
  }

  // ========================================
  // Competitor Metrics
  // ========================================
  const competitorData: Record<string, Record<string, number[]>> = {
    Jacobs: {
      //                        Q1-23  Q2-23  Q3-23  Q4-23  Q1-24  Q2-24
      tom_awareness:          [17.8,  18.1,  17.5,  18.3,  17.9,  18.4],
      spontaneous_awareness:  [34.2,  34.8,  35.1,  34.5,  35.3,  35.0],
      aided_awareness:        [71.5,  72.1,  71.8,  72.4,  72.0,  72.3],
      brand_consumed:         [28.3,  28.8,  28.5,  29.1,  28.7,  29.2],
      consumption_30day:      [24.1,  24.5,  24.3,  24.8,  24.6,  24.9],
      most_often_brand:       [15.2,  15.5,  15.3,  15.8,  15.6,  15.9],
      ad_awareness:           [22.3,  22.8,  23.1,  22.5,  23.4,  23.1],
      share_of_voice:         [24.5,  23.8,  25.1,  24.2,  24.8,  25.3],
      quality_perception:     [65.2,  65.5,  65.8,  65.3,  65.9,  65.6],
      value_perception:       [52.3,  52.8,  52.5,  53.1,  52.7,  53.2],
      consideration:          [48.5,  49.1,  48.8,  49.3,  49.0,  49.4],
      nps_proxy:              [32.1,  32.5,  32.3,  32.8,  32.6,  32.9],
    },
    'Douwe Egberts': {
      tom_awareness:          [11.5,  12.1,  11.8,  12.3,  11.9,  12.4],
      spontaneous_awareness:  [24.3,  24.8,  24.5,  25.1,  24.7,  25.2],
      aided_awareness:        [62.1,  62.5,  62.3,  62.8,  62.4,  62.9],
      brand_consumed:         [18.5,  18.8,  18.3,  19.1,  18.7,  19.2],
      consumption_30day:      [15.2,  15.5,  15.3,  15.8,  15.6,  15.9],
      most_often_brand:       [9.5,   9.8,   9.3,   10.1,  9.7,   10.2],
      ad_awareness:           [14.3,  14.8,  14.5,  15.1,  14.7,  15.2],
      share_of_voice:         [15.8,  16.2,  15.5,  16.5,  15.9,  16.1],
      quality_perception:     [68.5,  68.8,  69.1,  68.6,  69.3,  69.0],
      value_perception:       [48.2,  48.5,  48.8,  48.3,  48.9,  48.6],
      consideration:          [38.5,  39.1,  38.8,  39.3,  39.0,  39.4],
      nps_proxy:              [28.3,  28.5,  28.8,  28.4,  28.9,  28.7],
    },
    'Local/Unbranded': {
      tom_awareness:          [8.2,   7.9,   8.5,   7.8,   8.1,   7.6],
      spontaneous_awareness:  [15.3,  14.8,  15.5,  14.5,  15.1,  14.2],
      aided_awareness:        [42.5,  41.8,  42.8,  41.5,  42.1,  41.2],
      brand_consumed:         [22.3,  22.8,  22.5,  23.1,  22.7,  23.2],
      consumption_30day:      [19.5,  20.1,  19.8,  20.4,  20.0,  20.5],
      most_often_brand:       [12.1,  12.5,  12.3,  12.8,  12.6,  12.9],
      ad_awareness:           [3.2,   2.8,   3.5,   2.5,   3.1,   2.3],
      share_of_voice:         [5.1,   4.8,   5.3,   4.5,   5.0,   4.2],
      quality_perception:     [38.5,  38.1,  38.8,  37.9,  38.3,  37.5],
      value_perception:       [72.3,  72.8,  72.5,  73.1,  72.7,  73.2],
      consideration:          [28.5,  28.1,  28.8,  27.9,  28.3,  27.5],
      nps_proxy:              [15.2,  14.8,  15.5,  14.5,  15.1,  14.2],
    },
    'Bru Coffee': {
      tom_awareness:          [4.5,   4.8,   5.1,   5.3,   5.5,   5.8],
      spontaneous_awareness:  [10.2,  10.8,  11.3,  11.8,  12.2,  12.8],
      aided_awareness:        [38.5,  39.2,  40.1,  40.8,  41.5,  42.3],
      brand_consumed:         [8.2,   8.8,   9.3,   9.8,   10.2,  10.8],
      consumption_30day:      [6.5,   7.1,   7.5,   8.0,   8.4,   8.9],
      most_often_brand:       [3.2,   3.5,   3.8,   4.1,   4.3,   4.6],
      ad_awareness:           [5.8,   6.5,   7.2,   7.8,   8.5,   9.1],
      share_of_voice:         [8.2,   8.8,   9.5,   10.1,  10.8,  11.3],
      quality_perception:     [52.3,  53.1,  53.8,  54.5,  55.1,  55.8],
      value_perception:       [55.8,  56.2,  56.8,  57.3,  57.8,  58.3],
      consideration:          [18.5,  19.2,  20.1,  20.8,  21.5,  22.3],
      nps_proxy:              [18.2,  19.1,  19.8,  20.5,  21.2,  22.0],
    },
  };

  for (const [compName, metrics] of Object.entries(competitorData)) {
    const comp = competitorRecords.find((c) => c.name === compName);
    if (!comp) continue;

    for (const [metric, values] of Object.entries(metrics)) {
      for (let i = 0; i < waves.length; i++) {
        await prisma.brandMetric.create({
          data: {
            brandId: nescafe.id,
            competitorBrandId: comp.id,
            waveId: waves[i].id,
            metric,
            value: values[i],
            baseSize: waveDefinitions[i].n,
          },
        });
      }
    }
  }

  // ========================================
  // Segment Breakdown Metrics (Q2-2024 wave only)
  // ========================================
  const latestWave = waves[waves.length - 1];
  const latestN = waveDefinitions[waveDefinitions.length - 1].n;

  // Helper to create segment metrics for multiple metrics at once
  interface SegmentMetricEntry {
    readonly segment: string;
    readonly segmentValue: string;
    readonly metric: string;
    readonly value: number;
    readonly baseSize: number;
  }

  const segmentEntries: readonly SegmentMetricEntry[] = [
    // ---- Sex ----
    // Male (n~445)
    { segment: 'sex', segmentValue: 'Male', metric: 'tom_awareness', value: 36.1, baseSize: 445 },
    { segment: 'sex', segmentValue: 'Male', metric: 'spontaneous_awareness', value: 63.5, baseSize: 445 },
    { segment: 'sex', segmentValue: 'Male', metric: 'aided_awareness', value: 89.8, baseSize: 445 },
    { segment: 'sex', segmentValue: 'Male', metric: 'brand_consumed', value: 53.8, baseSize: 445 },
    { segment: 'sex', segmentValue: 'Male', metric: 'consumption_30day', value: 49.2, baseSize: 445 },
    { segment: 'sex', segmentValue: 'Male', metric: 'most_often_brand', value: 33.5, baseSize: 445 },
    { segment: 'sex', segmentValue: 'Male', metric: 'ad_awareness', value: 44.1, baseSize: 445 },
    { segment: 'sex', segmentValue: 'Male', metric: 'quality_perception', value: 71.8, baseSize: 445 },
    { segment: 'sex', segmentValue: 'Male', metric: 'value_perception', value: 57.5, baseSize: 445 },
    { segment: 'sex', segmentValue: 'Male', metric: 'consideration', value: 64.8, baseSize: 445 },
    { segment: 'sex', segmentValue: 'Male', metric: 'nps_proxy', value: 44.9, baseSize: 445 },
    // Female (n~446)
    { segment: 'sex', segmentValue: 'Female', metric: 'tom_awareness', value: 34.8, baseSize: 446 },
    { segment: 'sex', segmentValue: 'Female', metric: 'spontaneous_awareness', value: 61.2, baseSize: 446 },
    { segment: 'sex', segmentValue: 'Female', metric: 'aided_awareness', value: 88.7, baseSize: 446 },
    { segment: 'sex', segmentValue: 'Female', metric: 'brand_consumed', value: 56.5, baseSize: 446 },
    { segment: 'sex', segmentValue: 'Female', metric: 'consumption_30day', value: 47.3, baseSize: 446 },
    { segment: 'sex', segmentValue: 'Female', metric: 'most_often_brand', value: 32.1, baseSize: 446 },
    { segment: 'sex', segmentValue: 'Female', metric: 'ad_awareness', value: 43.4, baseSize: 446 },
    { segment: 'sex', segmentValue: 'Female', metric: 'quality_perception', value: 73.1, baseSize: 446 },
    { segment: 'sex', segmentValue: 'Female', metric: 'value_perception', value: 58.9, baseSize: 446 },
    { segment: 'sex', segmentValue: 'Female', metric: 'consideration', value: 65.5, baseSize: 446 },
    { segment: 'sex', segmentValue: 'Female', metric: 'nps_proxy', value: 45.7, baseSize: 446 },

    // ---- Age Group ----
    // 18-24 (n~135): Youth — lower Nescafe, higher for trendier brands
    { segment: 'age_group', segmentValue: '18-24', metric: 'tom_awareness', value: 28.5, baseSize: 135 },
    { segment: 'age_group', segmentValue: '18-24', metric: 'spontaneous_awareness', value: 55.2, baseSize: 135 },
    { segment: 'age_group', segmentValue: '18-24', metric: 'aided_awareness', value: 85.3, baseSize: 135 },
    { segment: 'age_group', segmentValue: '18-24', metric: 'consumption_30day', value: 38.5, baseSize: 135 },
    { segment: 'age_group', segmentValue: '18-24', metric: 'quality_perception', value: 68.2, baseSize: 135 },
    { segment: 'age_group', segmentValue: '18-24', metric: 'consideration', value: 58.3, baseSize: 135 },
    // 25-34 (n~185)
    { segment: 'age_group', segmentValue: '25-34', metric: 'tom_awareness', value: 34.2, baseSize: 185 },
    { segment: 'age_group', segmentValue: '25-34', metric: 'spontaneous_awareness', value: 62.8, baseSize: 185 },
    { segment: 'age_group', segmentValue: '25-34', metric: 'aided_awareness', value: 89.5, baseSize: 185 },
    { segment: 'age_group', segmentValue: '25-34', metric: 'consumption_30day', value: 48.1, baseSize: 185 },
    { segment: 'age_group', segmentValue: '25-34', metric: 'quality_perception', value: 72.5, baseSize: 185 },
    { segment: 'age_group', segmentValue: '25-34', metric: 'consideration', value: 65.8, baseSize: 185 },
    // 35-44 (n~175): Peak coffee consumption
    { segment: 'age_group', segmentValue: '35-44', metric: 'tom_awareness', value: 38.1, baseSize: 175 },
    { segment: 'age_group', segmentValue: '35-44', metric: 'spontaneous_awareness', value: 66.5, baseSize: 175 },
    { segment: 'age_group', segmentValue: '35-44', metric: 'aided_awareness', value: 91.2, baseSize: 175 },
    { segment: 'age_group', segmentValue: '35-44', metric: 'consumption_30day', value: 54.3, baseSize: 175 },
    { segment: 'age_group', segmentValue: '35-44', metric: 'quality_perception', value: 74.8, baseSize: 175 },
    { segment: 'age_group', segmentValue: '35-44', metric: 'consideration', value: 69.2, baseSize: 175 },
    // 45-54 (n~155)
    { segment: 'age_group', segmentValue: '45-54', metric: 'tom_awareness', value: 37.5, baseSize: 155 },
    { segment: 'age_group', segmentValue: '45-54', metric: 'spontaneous_awareness', value: 64.2, baseSize: 155 },
    { segment: 'age_group', segmentValue: '45-54', metric: 'aided_awareness', value: 90.8, baseSize: 155 },
    { segment: 'age_group', segmentValue: '45-54', metric: 'consumption_30day', value: 52.1, baseSize: 155 },
    { segment: 'age_group', segmentValue: '45-54', metric: 'quality_perception', value: 73.5, baseSize: 155 },
    { segment: 'age_group', segmentValue: '45-54', metric: 'consideration', value: 67.8, baseSize: 155 },
    // 55-64 (n~130)
    { segment: 'age_group', segmentValue: '55-64', metric: 'tom_awareness', value: 36.2, baseSize: 130 },
    { segment: 'age_group', segmentValue: '55-64', metric: 'spontaneous_awareness', value: 62.1, baseSize: 130 },
    { segment: 'age_group', segmentValue: '55-64', metric: 'aided_awareness', value: 89.5, baseSize: 130 },
    { segment: 'age_group', segmentValue: '55-64', metric: 'consumption_30day', value: 49.8, baseSize: 130 },
    { segment: 'age_group', segmentValue: '55-64', metric: 'quality_perception', value: 72.8, baseSize: 130 },
    { segment: 'age_group', segmentValue: '55-64', metric: 'consideration', value: 66.1, baseSize: 130 },
    // 65+ (n~111)
    { segment: 'age_group', segmentValue: '65+', metric: 'tom_awareness', value: 34.8, baseSize: 111 },
    { segment: 'age_group', segmentValue: '65+', metric: 'spontaneous_awareness', value: 59.5, baseSize: 111 },
    { segment: 'age_group', segmentValue: '65+', metric: 'aided_awareness', value: 88.2, baseSize: 111 },
    { segment: 'age_group', segmentValue: '65+', metric: 'consumption_30day', value: 46.5, baseSize: 111 },
    { segment: 'age_group', segmentValue: '65+', metric: 'quality_perception', value: 71.2, baseSize: 111 },
    { segment: 'age_group', segmentValue: '65+', metric: 'consideration', value: 63.5, baseSize: 111 },

    // ---- SEC (Socio-Economic Classification) ----
    // AB (n~200): Higher quality perception, premium brand affinity
    { segment: 'sec', segmentValue: 'AB', metric: 'tom_awareness', value: 42.3, baseSize: 200 },
    { segment: 'sec', segmentValue: 'AB', metric: 'spontaneous_awareness', value: 68.5, baseSize: 200 },
    { segment: 'sec', segmentValue: 'AB', metric: 'aided_awareness', value: 93.2, baseSize: 200 },
    { segment: 'sec', segmentValue: 'AB', metric: 'consumption_30day', value: 55.8, baseSize: 200 },
    { segment: 'sec', segmentValue: 'AB', metric: 'quality_perception', value: 78.5, baseSize: 200 },
    { segment: 'sec', segmentValue: 'AB', metric: 'value_perception', value: 52.3, baseSize: 200 },
    { segment: 'sec', segmentValue: 'AB', metric: 'consideration', value: 71.2, baseSize: 200 },
    { segment: 'sec', segmentValue: 'AB', metric: 'nps_proxy', value: 52.1, baseSize: 200 },
    // C1 (n~320)
    { segment: 'sec', segmentValue: 'C1', metric: 'tom_awareness', value: 36.5, baseSize: 320 },
    { segment: 'sec', segmentValue: 'C1', metric: 'spontaneous_awareness', value: 63.2, baseSize: 320 },
    { segment: 'sec', segmentValue: 'C1', metric: 'aided_awareness', value: 90.1, baseSize: 320 },
    { segment: 'sec', segmentValue: 'C1', metric: 'consumption_30day', value: 49.5, baseSize: 320 },
    { segment: 'sec', segmentValue: 'C1', metric: 'quality_perception', value: 72.8, baseSize: 320 },
    { segment: 'sec', segmentValue: 'C1', metric: 'value_perception', value: 58.5, baseSize: 320 },
    { segment: 'sec', segmentValue: 'C1', metric: 'consideration', value: 65.8, baseSize: 320 },
    { segment: 'sec', segmentValue: 'C1', metric: 'nps_proxy', value: 45.3, baseSize: 320 },
    // C2D (n~371)
    { segment: 'sec', segmentValue: 'C2D', metric: 'tom_awareness', value: 30.2, baseSize: 371 },
    { segment: 'sec', segmentValue: 'C2D', metric: 'spontaneous_awareness', value: 57.8, baseSize: 371 },
    { segment: 'sec', segmentValue: 'C2D', metric: 'aided_awareness', value: 86.5, baseSize: 371 },
    { segment: 'sec', segmentValue: 'C2D', metric: 'consumption_30day', value: 42.1, baseSize: 371 },
    { segment: 'sec', segmentValue: 'C2D', metric: 'quality_perception', value: 67.2, baseSize: 371 },
    { segment: 'sec', segmentValue: 'C2D', metric: 'value_perception', value: 62.8, baseSize: 371 },
    { segment: 'sec', segmentValue: 'C2D', metric: 'consideration', value: 59.5, baseSize: 371 },
    { segment: 'sec', segmentValue: 'C2D', metric: 'nps_proxy', value: 38.2, baseSize: 371 },

    // ---- Zone ----
    // Urban (n~535): Higher brand awareness, more ad exposure
    { segment: 'zone', segmentValue: 'Urban', metric: 'tom_awareness', value: 37.8, baseSize: 535 },
    { segment: 'zone', segmentValue: 'Urban', metric: 'spontaneous_awareness', value: 65.2, baseSize: 535 },
    { segment: 'zone', segmentValue: 'Urban', metric: 'aided_awareness', value: 91.3, baseSize: 535 },
    { segment: 'zone', segmentValue: 'Urban', metric: 'consumption_30day', value: 50.5, baseSize: 535 },
    { segment: 'zone', segmentValue: 'Urban', metric: 'ad_awareness', value: 46.8, baseSize: 535 },
    { segment: 'zone', segmentValue: 'Urban', metric: 'quality_perception', value: 73.5, baseSize: 535 },
    { segment: 'zone', segmentValue: 'Urban', metric: 'consideration', value: 67.2, baseSize: 535 },
    // Rural (n~356): Lower brand metrics, stronger local/unbranded
    { segment: 'zone', segmentValue: 'Rural', metric: 'tom_awareness', value: 31.8, baseSize: 356 },
    { segment: 'zone', segmentValue: 'Rural', metric: 'spontaneous_awareness', value: 58.1, baseSize: 356 },
    { segment: 'zone', segmentValue: 'Rural', metric: 'aided_awareness', value: 86.2, baseSize: 356 },
    { segment: 'zone', segmentValue: 'Rural', metric: 'consumption_30day', value: 44.8, baseSize: 356 },
    { segment: 'zone', segmentValue: 'Rural', metric: 'ad_awareness', value: 39.2, baseSize: 356 },
    { segment: 'zone', segmentValue: 'Rural', metric: 'quality_perception', value: 70.8, baseSize: 356 },
    { segment: 'zone', segmentValue: 'Rural', metric: 'consideration', value: 62.5, baseSize: 356 },

    // ---- District ----
    // Port Louis (n~120): Capital, highest awareness
    { segment: 'district', segmentValue: 'Port Louis', metric: 'tom_awareness', value: 39.5, baseSize: 120 },
    { segment: 'district', segmentValue: 'Port Louis', metric: 'aided_awareness', value: 92.8, baseSize: 120 },
    { segment: 'district', segmentValue: 'Port Louis', metric: 'consumption_30day', value: 52.3, baseSize: 120 },
    { segment: 'district', segmentValue: 'Port Louis', metric: 'ad_awareness', value: 48.5, baseSize: 120 },
    // Pamplemousses (n~85)
    { segment: 'district', segmentValue: 'Pamplemousses', metric: 'tom_awareness', value: 36.2, baseSize: 85 },
    { segment: 'district', segmentValue: 'Pamplemousses', metric: 'aided_awareness', value: 90.1, baseSize: 85 },
    { segment: 'district', segmentValue: 'Pamplemousses', metric: 'consumption_30day', value: 49.5, baseSize: 85 },
    { segment: 'district', segmentValue: 'Pamplemousses', metric: 'ad_awareness', value: 44.2, baseSize: 85 },
    // Riviere du Rempart (n~70)
    { segment: 'district', segmentValue: 'Riviere du Rempart', metric: 'tom_awareness', value: 33.8, baseSize: 70 },
    { segment: 'district', segmentValue: 'Riviere du Rempart', metric: 'aided_awareness', value: 88.5, baseSize: 70 },
    { segment: 'district', segmentValue: 'Riviere du Rempart', metric: 'consumption_30day', value: 46.2, baseSize: 70 },
    { segment: 'district', segmentValue: 'Riviere du Rempart', metric: 'ad_awareness', value: 41.5, baseSize: 70 },
    // Flacq (n~80)
    { segment: 'district', segmentValue: 'Flacq', metric: 'tom_awareness', value: 32.5, baseSize: 80 },
    { segment: 'district', segmentValue: 'Flacq', metric: 'aided_awareness', value: 87.2, baseSize: 80 },
    { segment: 'district', segmentValue: 'Flacq', metric: 'consumption_30day', value: 45.8, baseSize: 80 },
    { segment: 'district', segmentValue: 'Flacq', metric: 'ad_awareness', value: 40.1, baseSize: 80 },
    // Grand Port (n~65)
    { segment: 'district', segmentValue: 'Grand Port', metric: 'tom_awareness', value: 31.2, baseSize: 65 },
    { segment: 'district', segmentValue: 'Grand Port', metric: 'aided_awareness', value: 86.5, baseSize: 65 },
    { segment: 'district', segmentValue: 'Grand Port', metric: 'consumption_30day', value: 44.1, baseSize: 65 },
    { segment: 'district', segmentValue: 'Grand Port', metric: 'ad_awareness', value: 38.8, baseSize: 65 },
    // Savanne (n~50)
    { segment: 'district', segmentValue: 'Savanne', metric: 'tom_awareness', value: 29.8, baseSize: 50 },
    { segment: 'district', segmentValue: 'Savanne', metric: 'aided_awareness', value: 85.1, baseSize: 50 },
    { segment: 'district', segmentValue: 'Savanne', metric: 'consumption_30day', value: 42.5, baseSize: 50 },
    { segment: 'district', segmentValue: 'Savanne', metric: 'ad_awareness', value: 36.2, baseSize: 50 },
    // Moka (n~75)
    { segment: 'district', segmentValue: 'Moka', metric: 'tom_awareness', value: 37.1, baseSize: 75 },
    { segment: 'district', segmentValue: 'Moka', metric: 'aided_awareness', value: 91.5, baseSize: 75 },
    { segment: 'district', segmentValue: 'Moka', metric: 'consumption_30day', value: 50.8, baseSize: 75 },
    { segment: 'district', segmentValue: 'Moka', metric: 'ad_awareness', value: 45.3, baseSize: 75 },
    // Riviere Noire (n~55)
    { segment: 'district', segmentValue: 'Riviere Noire', metric: 'tom_awareness', value: 33.5, baseSize: 55 },
    { segment: 'district', segmentValue: 'Riviere Noire', metric: 'aided_awareness', value: 87.8, baseSize: 55 },
    { segment: 'district', segmentValue: 'Riviere Noire', metric: 'consumption_30day', value: 46.8, baseSize: 55 },
    { segment: 'district', segmentValue: 'Riviere Noire', metric: 'ad_awareness', value: 41.2, baseSize: 55 },
    // Beau-Bassin/Rose-Hill (n~78)
    { segment: 'district', segmentValue: 'Beau-Bassin/Rose-Hill', metric: 'tom_awareness', value: 36.8, baseSize: 78 },
    { segment: 'district', segmentValue: 'Beau-Bassin/Rose-Hill', metric: 'aided_awareness', value: 90.8, baseSize: 78 },
    { segment: 'district', segmentValue: 'Beau-Bassin/Rose-Hill', metric: 'consumption_30day', value: 49.2, baseSize: 78 },
    { segment: 'district', segmentValue: 'Beau-Bassin/Rose-Hill', metric: 'ad_awareness', value: 44.8, baseSize: 78 },
    // Quatre-Bornes (n~72)
    { segment: 'district', segmentValue: 'Quatre-Bornes', metric: 'tom_awareness', value: 37.5, baseSize: 72 },
    { segment: 'district', segmentValue: 'Quatre-Bornes', metric: 'aided_awareness', value: 91.2, baseSize: 72 },
    { segment: 'district', segmentValue: 'Quatre-Bornes', metric: 'consumption_30day', value: 50.1, baseSize: 72 },
    { segment: 'district', segmentValue: 'Quatre-Bornes', metric: 'ad_awareness', value: 45.5, baseSize: 72 },
    // Vacoas/Phoenix (n~76)
    { segment: 'district', segmentValue: 'Vacoas/Phoenix', metric: 'tom_awareness', value: 35.8, baseSize: 76 },
    { segment: 'district', segmentValue: 'Vacoas/Phoenix', metric: 'aided_awareness', value: 89.5, baseSize: 76 },
    { segment: 'district', segmentValue: 'Vacoas/Phoenix', metric: 'consumption_30day', value: 48.5, baseSize: 76 },
    { segment: 'district', segmentValue: 'Vacoas/Phoenix', metric: 'ad_awareness', value: 43.8, baseSize: 76 },
    // Curepipe (n~65)
    { segment: 'district', segmentValue: 'Curepipe', metric: 'tom_awareness', value: 36.5, baseSize: 65 },
    { segment: 'district', segmentValue: 'Curepipe', metric: 'aided_awareness', value: 90.2, baseSize: 65 },
    { segment: 'district', segmentValue: 'Curepipe', metric: 'consumption_30day', value: 49.8, baseSize: 65 },
    { segment: 'district', segmentValue: 'Curepipe', metric: 'ad_awareness', value: 44.5, baseSize: 65 },
  ];

  for (const entry of segmentEntries) {
    await prisma.brandMetric.create({
      data: {
        brandId: nescafe.id,
        waveId: latestWave.id,
        metric: entry.metric,
        value: entry.value,
        baseSize: entry.baseSize,
        segment: entry.segment,
        segmentValue: entry.segmentValue,
      },
    });
  }

  console.warn('Seeding complete!');
  console.warn('---');
  console.warn('Demo Logins:');
  console.warn('  admin@exotica.mu / Admin@2024');
  console.warn('  analyst@exotica.mu / Analyst@2024');
  console.warn('  nestle@client.mu / Client@2024');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
