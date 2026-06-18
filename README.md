# Issue Popup Mockup

관심그룹 종목 이슈 팝업 피드백용 인터랙티브 목업입니다.

## Live Demo

배포 후 아래 주소에서 확인할 수 있습니다.

https://w-x-z.github.io/issue-popup/

## 로컬 실행

```bash
cd prototype
npm install
npm run dev
```

## 기능

- 샘플 데이터 기반 종목·호재/악재/소식 표시
- **다른 종목** 버튼으로 3~8개 종목 랜덤 교체
- 종목 클릭 시 종목요약 팝업 전환
- 이슈 클릭 시 상세 바텀시트

## 데이터

- `호재악재_샘플데이터_0617_0618.csv` — 원본 샘플 데이터
- `prototype/src/data/stockIssues.json` — 앱에서 사용하는 변환 데이터
