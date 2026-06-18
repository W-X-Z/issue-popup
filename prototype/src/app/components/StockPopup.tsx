import svgPaths from "../../imports/정상케이스/svg-ttnrkhcy8u";
import imgImg0130 from "../../imports/정상케이스/0af896da0d3c201efe8fdd3430a909a884ec94a1.png";
import imgNdsImgPopupGradation02 from "../../imports/정상케이스/089c691d10bb8b3c6e4aeba3091db17689484b28.png";
import type {
  EnrichedStock,
  IssueDetail,
  SelectedIssue,
  Sentiment,
} from "../../types/stock";
import { formatPrice } from "../utils/stockUtils";

const SENTIMENT_STYLE: Record<
  Sentiment,
  { border: string; text: string; label: string }
> = {
  호재: { border: "#fdb2ac", text: "#d73838", label: "호재" },
  악재: { border: "#add1ff", text: "#4a90eb", label: "악재" },
  소식: { border: "#b5da8b", text: "#3c9800", label: "소식" },
};

function IssueRow({
  sentiment,
  detail,
  onClick,
}: {
  sentiment: Sentiment;
  detail: IssueDetail;
  onClick: () => void;
}) {
  const style = SENTIMENT_STYLE[sentiment];
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-[10px] items-center w-[268px] p-0 border-0 bg-transparent text-left cursor-pointer"
    >
      <div
        className="flex h-[30px] shrink-0 items-center justify-center pb-[4px] pt-[6px] px-[12px] rounded-[999px]"
        style={{ border: `1px solid ${style.border}` }}
      >
        <p
          className="font-['NanumBarunGothic:Regular',sans-serif] leading-[20px] text-[15px] text-center whitespace-nowrap"
          style={{ color: style.text }}
        >
          {style.label}
        </p>
      </div>
      <p className="flex-1 min-w-0 font-['NanumBarunGothic:Regular',sans-serif] leading-[24px] overflow-hidden text-[#666] text-[18px] text-ellipsis whitespace-nowrap">
        {detail.title}
      </p>
    </button>
  );
}

interface StockPopupProps {
  stock: EnrichedStock;
  onIssueClick: (issue: SelectedIssue) => void;
}

export function StockPopup({ stock, onIssueClick }: StockPopupProps) {
  const { display } = stock;
  const priceColor = display.isUp ? "#ef2d26" : "#277fff";

  const issueRows = (["호재", "악재", "소식"] as Sentiment[]).filter(
    (sentiment) => stock.issues[sentiment],
  );

  return (
    <div
      className="absolute bottom-[151px] h-[835px] overflow-clip right-[-1px] w-[348px] z-20"
      data-name="관심그룹_사이드 팝업"
    >
      <div className="absolute inset-[0_0_-14.63%_0]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 348 957.144"
        >
          <path d={svgPaths.p3bfa1400} fill="#F9F9F9" stroke="#E0E0E0" />
        </svg>
      </div>

      <div className="absolute bg-[#f9f9f9] h-[60px] left-px rounded-tl-[20px] top-px w-[346px] z-10">
        <div className="absolute h-[16px] left-0 top-[60px] w-[346px]">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgNdsImgPopupGradation02}
          />
        </div>
        <div className="absolute inset-[40%_84.39%_10%_6.94%]">
          <svg className="block size-full" fill="none" viewBox="0 0 20.5 20.5">
            <path
              clipRule="evenodd"
              d={svgPaths.p9cb3a00}
              fill="#666666"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p12024700}
              fill="#666666"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="absolute left-0 right-0 top-[60px] bottom-[74px] overflow-y-auto">
        <div className="flex flex-col gap-[20px] items-start ml-[24px] w-[300px] pt-[17px] pb-[17px]">
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="h-[36px] relative shrink-0 w-[299px]">
                <div className="absolute bg-[#ececec] left-0 size-[26px] top-[4px]">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Pretendard:Bold',sans-serif] h-[18px] justify-center left-1/2 text-[#666] text-[17px] text-center top-1/2 w-[16px]">
                    <p className="leading-[20px]">통</p>
                  </div>
                </div>
                <p className="absolute font-['NanumBarunGothic:Bold',sans-serif] h-[36px] leading-[38px] left-[36px] text-[26px] text-black top-0 tracking-[1px] w-[263px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {stock.name}
                </p>
              </div>
              <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0">
                <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[#666] text-[17px]">
                  증{display.margin}
                </p>
                <div className="bg-[#c5c5c5] h-[16px] w-px" />
                <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[#666] text-[17px]">
                  담{display.collateral}
                </p>
                <div className="bg-[#c5c5c5] h-[16px] w-px" />
                <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[#666] text-[17px]">
                  신{display.credit}
                </p>
              </div>
            </div>

            <div className="relative w-full pt-2">
              <p
                className="font-['Roboto:Medium',sans-serif] text-[40px] tracking-[1px] leading-[48px]"
                style={{ color: priceColor }}
              >
                {formatPrice(display.price)}
              </p>
              <div className="absolute right-0 top-[8px] bg-white h-[32px] flex items-center justify-center px-[12px] rounded-[999px] border border-[#e0e0e0]">
                <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[#333] text-[15px]">
                  현재가
                </p>
              </div>
              <div className="flex items-start gap-4 mt-1">
                <div>
                  <p
                    className="font-['Roboto:Medium',sans-serif] text-[24px] flex items-center gap-1"
                    style={{ color: priceColor }}
                  >
                    <span>{display.isUp ? "▲" : "▼"}</span>
                    {formatPrice(display.change)}
                  </p>
                  <p className="font-['Roboto:Regular',sans-serif] text-[#666] text-[18px]">
                    {display.volume.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="font-['Roboto:Medium',sans-serif] text-[24px]"
                    style={{ color: priceColor }}
                  >
                    {display.changePercent}%
                  </p>
                  <p className="font-['Roboto:Regular',sans-serif] text-[#666] text-[18px]">
                    {display.turnoverRate}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[10px] items-start w-[300px]">
            <p className="font-['NanumBarunGothic:Bold',sans-serif] text-[21px] text-black leading-[32px]">
              주요 이슈
            </p>
            <div className="bg-white flex flex-col gap-[5px] items-center py-[16px] rounded-[16px] w-full">
              {issueRows.map((sentiment, index) => {
                const detail = stock.issues[sentiment]!;
                return (
                  <div key={sentiment} className="flex flex-col gap-[5px] items-center w-full">
                    {index > 0 && (
                      <div className="bg-[#f0f0f0] h-px w-[268px]" />
                    )}
                    <IssueRow
                      sentiment={sentiment}
                      detail={detail}
                      onClick={() =>
                        onIssueClick({
                          stockName: stock.name,
                          stockCode: stock.code,
                          sentiment,
                          detail,
                        })
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative w-[300px]">
            <div className="flex items-center justify-between mb-2">
              <p className="font-['NanumBarunGothic:Bold',sans-serif] text-[21px] text-black leading-[32px]">
                차트
              </p>
              <div className="bg-white h-[32px] flex items-center justify-center px-[12px] rounded-[999px] border border-[#e0e0e0]">
                <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[#333] text-[15px]">
                  차트보기
                </p>
              </div>
            </div>
            <div className="h-[163px] relative w-full overflow-hidden">
              <img
                alt=""
                className="absolute h-[635.12%] left-[-72.82%] max-w-none top-[-361.96%] w-[181.21%]"
                src={imgImg0130}
              />
            </div>
          </div>

          <div className="flex items-center gap-[6px] w-[300px]">
            <div className="shrink-0 size-[24px] flex items-center justify-center">
              <svg viewBox="0 0 22 20" className="size-full" fill="#856CEB">
                <path d={svgPaths.p194cb580} fillRule="evenodd" clipRule="evenodd" />
              </svg>
            </div>
            <p className="flex-1 min-w-0 font-['NanumBarunGothic:Regular',sans-serif] text-[#666] text-[18px] leading-[24px] overflow-hidden text-ellipsis whitespace-nowrap">
              {display.communityComment}
            </p>
            <span className="text-[#999] text-[14px] shrink-0">›</span>
          </div>

          <div className="w-[300px]">
            <div className="flex items-center justify-between mb-2">
              <p className="font-['NanumBarunGothic:Bold',sans-serif] text-[21px] text-black leading-[32px]">
                최신뉴스
              </p>
              <div className="bg-white h-[32px] flex items-center justify-center px-[12px] rounded-[999px] border border-[#e0e0e0]">
                <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[#333] text-[15px]">
                  뉴스/공시
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {(stock.news.length > 0
                ? stock.news
                : [{ title: "관련 뉴스 없음", date: "" }]
              ).map((item) => (
                <div
                  key={`${item.title}-${item.date}`}
                  className="flex items-center justify-between gap-2 w-full"
                >
                  <p className="flex-1 min-w-0 font-['NanumBarunGothic:Regular',sans-serif] text-[#666] text-[18px] leading-[24px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.title}
                  </p>
                  {item.date && (
                    <p className="font-['Roboto:Regular',sans-serif] text-[#999] text-[18px] shrink-0">
                      [{item.date}]
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 content-stretch flex h-[74px] items-start left-0 w-[348px] z-10">
        <div className="bg-[#ef2d26] flex-[1_0_0] h-full min-w-px relative">
          <div className="flex flex-row items-center justify-center size-full">
            <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[24px] text-white">
              매수
            </p>
          </div>
        </div>
        <div className="bg-[#277fff] flex-[1_0_0] h-full min-w-px relative">
          <div className="flex flex-row items-center justify-center size-full">
            <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[24px] text-white">
              매도
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
