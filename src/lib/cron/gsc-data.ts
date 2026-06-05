import { getAccessToken } from "./google-auth";

export interface GSCMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCQueryData {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCPageData {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCDeviceData {
  device: string;
  clicks: number;
  impressions: number;
  ctr: number;
}

export interface GSCPeriodData {
  metrics: GSCMetrics;
  dailyAverage: GSCMetrics;
  topQueries: GSCQueryData[];
  topPages: GSCPageData[];
  devices: GSCDeviceData[];
}

export interface GSCReport {
  sevenDay: GSCPeriodData;
  ninetyDay: GSCPeriodData;
  available: boolean;
  error?: string;
}

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function dateRange(daysAgo: number): { start: string; end: string } {
  const end = new Date();
  end.setDate(end.getDate() - 2);
  const start = new Date(end);
  start.setDate(end.getDate() - daysAgo + 1);
  return { start: formatDate(start), end: formatDate(end) };
}

async function querySearchAnalytics(
  siteUrl: string,
  token: string,
  body: Record<string, unknown>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const encodedUrl = encodeURIComponent(siteUrl);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodedUrl}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GSC API error ${res.status}: ${text}`);
  }

  return res.json();
}

async function fetchPeriodMetrics(
  siteUrl: string,
  token: string,
  days: number
): Promise<GSCMetrics> {
  const range = dateRange(days);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await querySearchAnalytics(siteUrl, token, {
    startDate: range.start,
    endDate: range.end,
    type: "web",
  });

  const rows = data.rows || [];
  if (rows.length === 0) {
    return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  }

  let totalClicks = 0;
  let totalImpressions = 0;
  let totalPosition = 0;
  let positionCount = 0;

  for (const row of rows) {
    totalClicks += row.clicks || 0;
    totalImpressions += row.impressions || 0;
    if (row.position) {
      totalPosition += row.position;
      positionCount++;
    }
  }

  return {
    clicks: totalClicks,
    impressions: totalImpressions,
    ctr: totalImpressions > 0 ? totalClicks / totalImpressions : 0,
    position: positionCount > 0 ? totalPosition / positionCount : 0,
  };
}

async function fetchTopQueries(
  siteUrl: string,
  token: string,
  days: number
): Promise<GSCQueryData[]> {
  const range = dateRange(days);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await querySearchAnalytics(siteUrl, token, {
    startDate: range.start,
    endDate: range.end,
    dimensions: ["query"],
    rowLimit: 20,
    type: "web",
  });

  return (data.rows || []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: any) => ({
      query: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    })
  );
}

async function fetchTopPages(
  siteUrl: string,
  token: string,
  days: number
): Promise<GSCPageData[]> {
  const range = dateRange(days);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await querySearchAnalytics(siteUrl, token, {
    startDate: range.start,
    endDate: range.end,
    dimensions: ["page"],
    rowLimit: 15,
    type: "web",
  });

  return (data.rows || []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: any) => ({
      page: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    })
  );
}

async function fetchDeviceBreakdown(
  siteUrl: string,
  token: string,
  days: number
): Promise<GSCDeviceData[]> {
  const range = dateRange(days);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await querySearchAnalytics(siteUrl, token, {
    startDate: range.start,
    endDate: range.end,
    dimensions: ["device"],
    type: "web",
  });

  return (data.rows || []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: any) => ({
      device: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
    })
  );
}

function toDailyAverage(metrics: GSCMetrics, days: number): GSCMetrics {
  return {
    clicks: metrics.clicks / days,
    impressions: metrics.impressions / days,
    ctr: metrics.ctr,
    position: metrics.position,
  };
}

export async function fetchGSCReport(): Promise<GSCReport> {
  const siteUrl = process.env.GSC_SITE_URL;
  if (!siteUrl) {
    return {
      sevenDay: emptyPeriod(),
      ninetyDay: emptyPeriod(),
      available: false,
      error: "GSC_SITE_URL not configured",
    };
  }

  try {
    const token = await getAccessToken();

    const [
      sevenDayMetrics,
      ninetyDayMetrics,
      sevenDayQueries,
      ninetyDayQueries,
      sevenDayPages,
      devices,
    ] = await Promise.all([
      fetchPeriodMetrics(siteUrl, token, 7),
      fetchPeriodMetrics(siteUrl, token, 90),
      fetchTopQueries(siteUrl, token, 7),
      fetchTopQueries(siteUrl, token, 90),
      fetchTopPages(siteUrl, token, 7),
      fetchDeviceBreakdown(siteUrl, token, 7),
    ]);

    return {
      sevenDay: {
        metrics: sevenDayMetrics,
        dailyAverage: toDailyAverage(sevenDayMetrics, 7),
        topQueries: sevenDayQueries,
        topPages: sevenDayPages,
        devices,
      },
      ninetyDay: {
        metrics: ninetyDayMetrics,
        dailyAverage: toDailyAverage(ninetyDayMetrics, 90),
        topQueries: ninetyDayQueries,
        topPages: [],
        devices: [],
      },
      available: true,
    };
  } catch (err) {
    return {
      sevenDay: emptyPeriod(),
      ninetyDay: emptyPeriod(),
      available: false,
      error: `GSC fetch failed: ${err instanceof Error ? err.message : err}`,
    };
  }
}

function emptyPeriod(): GSCPeriodData {
  return {
    metrics: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    dailyAverage: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    topQueries: [],
    topPages: [],
    devices: [],
  };
}

// ---------------------------------------------------------------------------
// Striking-distance / CTR-opportunity analysis
//
// The standard daily pull only sees top-20 queries and top-15 pages as
// separate dimensions, so it can never tell WHICH page ranks WHERE for WHICH
// query. This deep page×query pull is the ground truth for both north-star
// goals: it identifies (1) pages one push from page 1 (striking distance) and
// (2) pages already on page 1 that are leaking clicks (CTR opportunity).
// ---------------------------------------------------------------------------

export interface StrikingDistanceRow {
  page: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface CtrOpportunityRow extends StrikingDistanceRow {
  expectedCtr: number;
  // Estimated clicks/month left on the table if CTR rose to the position curve.
  lostClicksPerMonth: number;
}

export interface StrikingDistanceReport {
  available: boolean;
  error?: string;
  window: { start: string; end: string; days: number };
  // The actual search footprint — top rows by impressions, ANY position. On a
  // young site this is the most useful view: it shows what's actually ranking.
  topByImpressions: StrikingDistanceRow[];
  // pos 8–20, enough impressions to matter — ranked by impression volume.
  strikingDistance: StrikingDistanceRow[];
  // pos ≤ 10 but CTR well below the position curve — ranked by lost clicks.
  ctrOpportunity: CtrOpportunityRow[];
  totalRowsWithImpressions: number;
  totalRowsAboveFloor: number;
}

// Approximate organic CTR by rounded position (blended desktop+mobile, 2024–25).
const CTR_CURVE: Record<number, number> = {
  1: 0.27, 2: 0.15, 3: 0.1, 4: 0.07, 5: 0.05,
  6: 0.04, 7: 0.032, 8: 0.026, 9: 0.022, 10: 0.019,
};

function expectedCtrForPosition(position: number): number {
  const rounded = Math.max(1, Math.min(10, Math.round(position)));
  return CTR_CURVE[rounded] ?? 0.015;
}

const STRIKING_DISTANCE_DAYS = 28;
// Floor for the opportunity buckets. Kept low because the site is young and
// impressions are thin — a row with a handful of impressions is still the
// best available signal. The topByImpressions view applies no floor at all.
const MIN_IMPRESSIONS = 3;

export async function fetchStrikingDistance(): Promise<StrikingDistanceReport> {
  const days = STRIKING_DISTANCE_DAYS;
  const range = dateRange(days);
  const emptyWindow = { start: range.start, end: range.end, days };

  const siteUrl = process.env.GSC_SITE_URL;
  if (!siteUrl) {
    return {
      available: false,
      error: "GSC_SITE_URL not configured",
      window: emptyWindow,
      topByImpressions: [],
      strikingDistance: [],
      ctrOpportunity: [],
      totalRowsWithImpressions: 0,
      totalRowsAboveFloor: 0,
    };
  }

  try {
    const token = await getAccessToken();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await querySearchAnalytics(siteUrl, token, {
      startDate: range.start,
      endDate: range.end,
      dimensions: ["page", "query"],
      rowLimit: 5000,
      type: "web",
    });

    const allRows: StrikingDistanceRow[] = (data.rows || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((row: any) => ({
        page: row.keys?.[0] || "",
        query: row.keys?.[1] || "",
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0,
      }));

    // The actual footprint — no floor, just the biggest impression earners.
    const topByImpressions = [...allRows]
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 40);

    const rows = allRows.filter((r) => r.impressions >= MIN_IMPRESSIONS);

    const strikingDistance = rows
      .filter((r) => r.position >= 8 && r.position <= 20)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 40);

    const ctrOpportunity: CtrOpportunityRow[] = rows
      .filter((r) => r.position <= 10)
      .map((r) => {
        const expectedCtr = expectedCtrForPosition(r.position);
        const gap = Math.max(0, expectedCtr - r.ctr);
        // Window is `days` long; normalize the lost clicks to a 30-day month.
        const lostClicksPerMonth = (gap * r.impressions) * (30 / days);
        return { ...r, expectedCtr, lostClicksPerMonth };
      })
      // Only flag rows meaningfully below the curve (CTR < 60% of expected).
      .filter((r) => r.ctr < r.expectedCtr * 0.6 && r.lostClicksPerMonth >= 1)
      .sort((a, b) => b.lostClicksPerMonth - a.lostClicksPerMonth)
      .slice(0, 40);

    return {
      available: true,
      window: emptyWindow,
      topByImpressions,
      strikingDistance,
      ctrOpportunity,
      totalRowsWithImpressions: allRows.filter((r) => r.impressions > 0).length,
      totalRowsAboveFloor: rows.length,
    };
  } catch (err) {
    return {
      available: false,
      error: `Striking-distance fetch failed: ${err instanceof Error ? err.message : err}`,
      window: emptyWindow,
      topByImpressions: [],
      strikingDistance: [],
      ctrOpportunity: [],
      totalRowsWithImpressions: 0,
      totalRowsAboveFloor: 0,
    };
  }
}
