/** 프로토타입 스크린(1170px) 기준 하단 GNB·버튼 레이아웃 */
export const LAYOUT = {
  /** 하단 퀵메뉴(GNB) 높이 */
  GNB_HEIGHT: 102,
  /** GNB와 '다른 종목' 버튼 사이 간격 */
  ACTION_BUTTON_GAP: 28,
  /** '다른 종목' 버튼 높이 + 여백 */
  ACTION_BUTTON_AREA: 56,
  /** GNB + 버튼 + 간격 */
  get LIST_BOTTOM() {
    return this.GNB_HEIGHT + this.ACTION_BUTTON_GAP + this.ACTION_BUTTON_AREA + 8;
  },
  /** 버튼 bottom offset (GNB 위) */
  get ACTION_BUTTON_BOTTOM() {
    return this.GNB_HEIGHT + this.ACTION_BUTTON_GAP;
  },
} as const;
