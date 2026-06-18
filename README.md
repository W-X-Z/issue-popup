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

GitHub Actions 없이 배포합니다. 아래 두 방법 중 하나를 쓰면 됩니다.

### 방법 A — `docs` 폴더 (권장)

```bash
cd prototype
npm install
npm run deploy:docs
git add ../docs && git commit -m "Deploy mockup" && git push
```

GitHub **Settings → Pages** → Source: **Deploy from a branch** → **main** / **/docs**

### 방법 B — `gh-pages` 브랜치

```bash
cd prototype
npm run deploy
```

GitHub **Settings → Pages** → Source: **gh-pages** / **/(root)**

## 기능

- 샘플 데이터 기반 종목·호재/악재/소식 표시
- **다른 종목** 버튼으로 3~8개 종목 랜덤 교체
- 종목 클릭 시 종목요약 팝업 전환
- 이슈 클릭 시 상세 바텀시트
