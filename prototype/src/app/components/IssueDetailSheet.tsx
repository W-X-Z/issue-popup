import type { SelectedIssue, Sentiment } from "../../types/stock";
import { dataTypeLabel } from "../utils/stockUtils";

const SENTIMENT_STYLE: Record<
  Sentiment,
  { border: string; text: string; bg: string }
> = {
  호재: { border: "#fdb2ac", text: "#d73838", bg: "#fff5f4" },
  악재: { border: "#add1ff", text: "#4a90eb", bg: "#f4f8ff" },
  소식: { border: "#b5da8b", text: "#3c9800", bg: "#f6faf2" },
};

interface IssueDetailSheetProps {
  issue: SelectedIssue | null;
  onClose: () => void;
}

export function IssueDetailSheet({ issue, onClose }: IssueDetailSheetProps) {
  if (!issue) return null;

  const style = SENTIMENT_STYLE[issue.sentiment];

  return (
    <div
      className="absolute inset-0 z-[60] flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="issue-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="닫기"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-t-[24px] min-h-[72%] max-h-[92%] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-center pt-4 pb-2 shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-[#ccc]" />
        </div>

        <div className="overflow-y-auto flex-1 px-7 pb-10 pt-1">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex flex-col gap-2.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex self-start items-center px-4 py-1.5 rounded-full text-[17px] font-['NanumBarunGothic:Bold',sans-serif]"
                  style={{
                    color: style.text,
                    border: `1px solid ${style.border}`,
                    backgroundColor: style.bg,
                  }}
                >
                  {issue.sentiment}
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[17px] font-['NanumBarunGothic:Bold',sans-serif] text-[#555] border border-[#ccc] bg-[#f5f5f5]">
                  {dataTypeLabel(issue.detail.dataType)}
                </span>
              </div>
              <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[17px] text-[#888] leading-[24px]">
                {issue.stockName} · {issue.stockCode}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 size-10 flex items-center justify-center rounded-full bg-[#f0f0f0] text-[#666] text-2xl leading-none"
              aria-label="닫기"
            >
              ×
            </button>
          </div>

          <h2
            id="issue-detail-title"
            className="font-['NanumBarunGothic:Bold',sans-serif] text-[26px] text-black leading-[36px] mb-3"
          >
            {issue.detail.title}
          </h2>

          {issue.detail.date && (
            <p className="font-['Roboto:Regular',sans-serif] text-[17px] text-[#999] mb-6">
              [{issue.detail.date}]
            </p>
          )}

          <section className="mb-7">
            <h3 className="font-['NanumBarunGothic:Bold',sans-serif] text-[19px] text-[#333] mb-3">
              요약
            </h3>
            <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[20px] text-[#444] leading-[32px]">
              {issue.detail.summary}
            </p>
          </section>

          <section>
            <h3 className="font-['NanumBarunGothic:Bold',sans-serif] text-[19px] text-[#333] mb-3">
              분류 근거
            </h3>
            <p className="font-['NanumBarunGothic:Regular',sans-serif] text-[20px] text-[#444] leading-[32px]">
              {issue.detail.reason}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
