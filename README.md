# Issue Popup Mockup

관심그룹 종목 이슈 팝업 피드백용 인터랙티브 목업입니다.

## Live Demo

https://w-x-z.github.io/issue-popup/

## 로컬 실행

```bash
cd prototype
npm install
npm run dev
```

## 배포 (GitHub Pages)

레포 루트에 빌드 결과를 올립니다. Pages 설정 변경 없이 동작합니다.

```bash
cd prototype
npm install
npm run deploy:root
git add ../index.html ../assets ../.nojekyll && git commit -m "Deploy mockup" && git push
```

## 기능

- 샘플 데이터 기반 종목·호재/악재/소식 표시
- **다른 종목** 버튼으로 3~8개 종목 랜덤 교체
- 종목 클릭 시 종목요약 팝업 전환
- 이슈 클릭 시 상세 바텀시트
