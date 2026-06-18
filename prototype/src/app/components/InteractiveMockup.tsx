import { useCallback, useState } from "react";
import imgScreenshot from "../../imports/정상케이스/f635bf7bcd411230a6e0301d68f16c08fb1dff4e.png";
import type { EnrichedStock, SelectedIssue } from "../../types/stock";
import { LAYOUT } from "../constants/layout";
import { formatMarketTicker, pickRandomStocks } from "../utils/stockUtils";
import { IssueDetailSheet } from "./IssueDetailSheet";
import { StockPopup } from "./StockPopup";

function OtherStocksIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="14" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M11 7.5h2M11 7.5l1.5-1.5M11 7.5l1.5 1.5M13 16.5h-2M13 16.5l-1.5-1.5M13 16.5l-1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface StockListProps {
  stocks: EnrichedStock[];
  selectedCode: string;
  onSelect: (stock: EnrichedStock) => void;
  bottomOffset: number;
}

function StockList({
  stocks,
  selectedCode,
  onSelect,
  bottomOffset,
}: StockListProps) {
  return (
    <div
      className="absolute left-0 top-[248px] w-[192px] z-10 flex flex-col overflow-hidden bg-white"
      style={{ bottom: bottomOffset }}
    >
      <div className="flex items-center justify-between px-[20px] py-[8px] shrink-0 bg-white">
        <p className="font-['NanumBarunGothic:Bold',sans-serif] text-[17px] text-[#333]">
          총 {stocks.length}개
        </p>
      </div>
      <div className="flex flex-col overflow-y-auto flex-1 pb-2 bg-white">
        {stocks.map((stock) => {
          const selected = stock.code === selectedCode;

          return (
            <button
              key={stock.code}
              type="button"
              onClick={() => onSelect(stock)}
              className={`flex w-full items-center px-[20px] py-[16px] text-left transition-colors ${
                selected ? "bg-[#eef4ff]" : "bg-white hover:bg-[#f7f7f7]"
              }`}
            >
              <div className="min-w-0 w-full">
                <p className="font-['NanumBarunGothic:Bold',sans-serif] text-[22px] text-black leading-[28px] line-clamp-2">
                  {stock.name}
                </p>
                <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[15px] text-[#888] leading-[20px] mt-[4px]">
                  {formatMarketTicker(stock.code)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function InteractiveMockup() {
  const [state, setState] = useState(() => {
    const list = pickRandomStocks();
    return { list, selected: list[0] };
  });
  const [selectedIssue, setSelectedIssue] = useState<SelectedIssue | null>(
    null,
  );

  const handleRefresh = useCallback(() => {
    const nextList = pickRandomStocks();
    setState({ list: nextList, selected: nextList[0] });
    setSelectedIssue(null);
  }, []);

  const handleSelect = useCallback((stock: EnrichedStock) => {
    setState((prev) => ({ ...prev, selected: stock }));
    setSelectedIssue(null);
  }, []);

  const handleIssueClick = useCallback((issue: SelectedIssue) => {
    setSelectedIssue(issue);
  }, []);

  const { list: listStocks, selected: selectedStock } = state;

  return (
    <div
      className="border border-black border-solid relative size-full overflow-hidden"
      data-name="정상케이스"
    >
      <div className="absolute h-[1170px] left-[-1px] top-[-1px] w-[540px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgScreenshot}
        />
      </div>

      <div
        className="absolute left-0 top-[228px] w-[348px] bg-white z-[5] pointer-events-none"
        style={{ bottom: LAYOUT.LIST_BOTTOM }}
      />

      <StockList
        stocks={listStocks}
        selectedCode={selectedStock.code}
        onSelect={handleSelect}
        bottomOffset={LAYOUT.LIST_BOTTOM}
      />

      <button
        type="button"
        onClick={handleRefresh}
        className="absolute left-[16px] z-30 flex items-center gap-[8px] rounded-full bg-[#277fff] px-[18px] py-[12px] shadow-[0_4px_12px_rgba(39,127,255,0.35)] text-white font-['NanumBarunGothic:Bold',sans-serif] text-[15px] active:scale-95 active:bg-[#1f6fe0] transition-all"
        style={{ bottom: LAYOUT.ACTION_BUTTON_BOTTOM }}
        aria-label="다른 종목 불러오기"
      >
        <OtherStocksIcon />
        다른 종목
      </button>

      <StockPopup stock={selectedStock} onIssueClick={handleIssueClick} />

      <IssueDetailSheet
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
      />
    </div>
  );
}
