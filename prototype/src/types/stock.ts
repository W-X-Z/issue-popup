export type Sentiment = "호재" | "악재" | "소식";

/** 1: 뉴스, 2: 공시 */
export type DataType = 1 | 2;

export interface IssueDetail {
  title: string;
  summary: string;
  reason: string;
  date: string;
  dataType: DataType;
}

export interface NewsItem {
  title: string;
  date: string;
  dataType?: DataType;
}

export interface StockDisplay {
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  turnoverRate: number;
  margin: number;
  collateral: number;
  credit: string;
  communityComment: string;
  isUp: boolean;
}

export interface StockIssue {
  code: string;
  name: string;
  issues: Record<Sentiment, IssueDetail | null>;
  news: NewsItem[];
}

export interface EnrichedStock extends StockIssue {
  display: StockDisplay;
}

export interface SelectedIssue {
  stockName: string;
  stockCode: string;
  sentiment: Sentiment;
  detail: IssueDetail;
}
