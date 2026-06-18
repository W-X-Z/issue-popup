import type { EnrichedStock, StockDisplay, StockIssue } from "../../types/stock";
import allStocks from "../../data/stockIssues.json";

export const STOCK_POOL: StockIssue[] = allStocks;

const COMMUNITY_POOL = [
  "올라도 너무 올랐어 빨리 가즈아 10만",
  "이 정도면 분할매수 각 아닌가요?",
  "외국인 매도인데 개미는 왜 사는 거지",
  "실적 나오면 더 갈 것 같은데",
  "단기 고점인 것 같아서 일부 익절했습니다",
  "뉴스 보니까 호재 맞는 것 같은데",
  "차트상 지지선 테스트 중인 듯",
  "장기 보유 중입니다. 흔들지 마세요",
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatCredit(amount: number): string {
  if (amount >= 100000000) {
    return `${Math.round(amount / 100000000)}억`;
  }
  if (amount >= 10000) {
    return `${Math.round(amount / 10000)}만`;
  }
  return `${amount}`;
}

export function generateDisplay(stock: StockIssue): StockDisplay {
  const isUp = Math.random() > 0.45;
  const basePrice = randomInt(5000, 2500000);
  const changePercent = Number((Math.random() * 8 + 0.1).toFixed(2));
  const change = Math.round(basePrice * (changePercent / 100));

  const summaries = [
    stock.issues.호재?.summary,
    stock.issues.악재?.summary,
    stock.issues.소식?.summary,
    stock.news[0]?.title,
  ].filter(Boolean) as string[];

  const communityComment =
    summaries.length > 0
      ? summaries[randomInt(0, summaries.length - 1)]
      : COMMUNITY_POOL[randomInt(0, COMMUNITY_POOL.length - 1)];

  return {
    price: basePrice,
    change,
    changePercent,
    volume: randomInt(10000, 999999),
    turnoverRate: Number((Math.random() * 15 + 0.5).toFixed(2)),
    margin: randomInt(10, 50),
    collateral: randomInt(80, 200),
    credit: formatCredit(randomInt(1000000, 15000000000)),
    communityComment,
    isUp,
  };
}

export function enrichStock(stock: StockIssue): EnrichedStock {
  return { ...stock, display: generateDisplay(stock) };
}

export function pickRandomStocks(count?: number): EnrichedStock[] {
  const size = count ?? randomInt(3, 8);
  return shuffle(STOCK_POOL)
    .slice(0, Math.min(size, STOCK_POOL.length))
    .map(enrichStock);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("ko-KR");
}

export type MarketType = "KOSPI" | "KOSDAQ";

/** 목업용 시장 구분 (6자리 종목코드 기반 추정) */
export function inferMarket(code: string): MarketType {
  if (code.startsWith("066") || code.startsWith("068") || code.startsWith("069")) {
    return "KOSDAQ";
  }
  if (code.startsWith("00") || code.startsWith("01") || code.startsWith("02") || code.startsWith("03") || code.startsWith("04") || code.startsWith("05")) {
    return "KOSPI";
  }
  const num = parseInt(code, 10);
  if (!Number.isNaN(num) && num >= 100000 && num < 900000) {
    return "KOSDAQ";
  }
  return "KOSPI";
}

export function formatMarketTicker(code: string): string {
  return `${inferMarket(code)} ${code}`;
}
