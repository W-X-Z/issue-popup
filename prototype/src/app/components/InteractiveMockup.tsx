import { useCallback, useState } from "react";
import imgScreenshot from "../../imports/정상케이스/f635bf7bcd411230a6e0301d68f16c08fb1dff4e.png";
import type { EnrichedStock, SelectedIssue } from "../../types/stock";
import { LAYOUT } from "../constants/layout";
import { formatPrice, pickRandomStocks } from "../utils/stockUtils";
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
      className="absolute left-0 top-[248px] w-[192px] z-10 flex flex-col overflow-hidden"
      style={{ bottom: bottomOffset }}
    >
      <div className="flex items-center justify-between px-[20px] pb-[8px] shrink-0">
        <p className="font-['NanumBarunGothic:Bold',sans-serif] text-[17px] text-[#333]">
          총 {stocks.length}개
        </p>
      </div>
      <div className="flex flex-col overflow-y-auto flex-1 pb-2">
        {stocks.map((stock) => {
          const selected = stock.code === selectedCode;
          const { display } = stock;
          const priceColor = display.isUp ? "#ef2d26" : "#277fff";

          return (
            <button
              key={stock.code}
              type="button"
              onClick={() => onSelect(stock)}
              className={`flex w-full items-start gap-[8px] px-[16px] py-[12px] text-left transition-colors ${
                selected ? "bg-[#eef4ff]" : "bg-white/90 hover:bg-[#f5f5f5]"
              }`}
            >
              <div className="mt-[2px] size-[26px] shrink-0 bg-[#ececec] flex items-center justify-center">
                <span className="font-['Pretendard:Bold',sans-serif] text-[13px] text-[#666]">
                  통
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-['NanumBarunGothic:Bold',sans-serif] text-[15px] text-black leading-[18px] line-clamp-2">
                  {stock.name}
                </p>
                <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[12px] text-[#888] mt-[2px]">
                  KOSPI {stock.code}
                </p>
              </div>
              <div className="shrink-0 text-right pt-[1px]">
                <p
                  className="font-['Roboto:Medium',sans-serif] text-[12px] leading-[14px] whitespace-nowrap"
                  style={{ color: priceColor }}
                >
                  {formatPrice(display.price)}
                </p>
                <p
                  className="font-['Roboto:Regular',sans-serif] text-[10px] mt-[2px] whitespace-nowrap"
                  style={{ color: priceColor }}
                >
                  {display.isUp ? "▲" : "▼"}
                  {display.changePercent}%
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
        className="absolute left-0 top-[248px] w-[192px] bg-white/80 z-[5]"
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
