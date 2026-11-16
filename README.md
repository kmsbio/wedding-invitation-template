# 모바일 청첩장 템플릿

React, TypeScript, Vite로 만든 한 페이지짜리 모바일 청첩장입니다. 모바일에서는 카드가 세로로 이어지고, 넓은 화면에서는 일부 카드가 나란히 배치됩니다. 신랑과 신부는 가칭으로 표시하며, AI로 생성한 동화풍 웨딩 일러스트를 기본으로 제공합니다.

## 주요 기능

- 표지와 초대 문구, 신랑·신부 측 전화 및 문자 연결
- 예식일 달력과 예식 전후 시간 표시
- 좌우로 넘기거나 확대해서 볼 수 있는 사진 갤러리
- 네이버 지도에서 예식장 위치 확인, 카카오내비·티맵으로 제1주차장 길안내
- 대중교통·주차·식사 안내, 신랑·신부 측 계좌 보기 및 복사
- 카카오톡 공유와 링크 미리보기 이미지

방명록 컴포넌트는 프로젝트에 포함되어 있으며, 현재 청첩장 화면에서는 숨겨져 있습니다. 참석 의사 전달은 정적 전용 모드가 꺼져 있고 외부 서버 주소가 설정되어 있을 때, 예식 시작 전까지 표시됩니다. [화면 구성](src/App.tsx) · [참석 의사 전달](src/component/information/attendance.tsx)

## 로컬에서 실행하기

Node.js 22.x와 npm이 필요합니다.

```bash
git clone https://github.com/kmsbio/wedding-invitation-template.git
cd wedding-invitation-template
npm ci
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173)에 접속합니다. 배포용 파일은 `npm run build`로 `build/`에 생성하며, `npm run preview`로 미리 볼 수 있습니다.

### 환경변수

기본 화면은 환경변수 없이 실행할 수 있습니다. 지도나 카카오톡 공유 등을 사용하려면 프로젝트 루트의 [`.env.example`](.env.example)을 복사해 `.env`를 만들고 필요한 값을 입력하세요.

```dotenv
VITE_NAVER_MAP_CLIENT_ID=
VITE_KAKAO_SDK_JS_KEY=
VITE_SERVER_URL=
VITE_STATIC_ONLY=true
```

| 변수 | 용도 | GitHub Actions 설정 |
| --- | --- | --- |
| `VITE_NAVER_MAP_CLIENT_ID` | 네이버 지도 삽입에 사용하는 클라이언트 ID. 값이 비어 있으면 지도 대신 안내 문구와 외부 지도 버튼이 표시됩니다. | Secret |
| `VITE_KAKAO_SDK_JS_KEY` | 카카오톡 공유와 모바일 카카오내비 호출에 사용하는 JavaScript 키. | Secret |
| `VITE_SERVER_URL` | 참석 의사 전달에 사용하는 외부 API 서버 주소. 서버 소스는 별도 저장소에 있습니다. [원본 서버](https://github.com/juhonamnam/wedding-invitation-server) | Variable |
| `VITE_STATIC_ONLY` | `true`로 설정하면 참석 의사 전달을 숨깁니다. | Variable |

`VITE_` 환경변수는 빌드된 브라우저 코드에 포함될 수 있으므로, 클라이언트 공개가 가능한 값만 사용하세요. [Vite 환경변수 문서](https://vite.dev/guide/env-and-mode#env-variables)

## 청첩장 내용 수정하기

| 변경할 내용 | 파일 |
| --- | --- |
| 예식 날짜·장소, 가족 정보, 연락처, 계좌, 지도 좌표·장소 ID | [src/const.ts](src/const.ts) |
| 초대 문구, 대중교통·주차 안내, 식사 안내 | [초대 문구](src/component/invitation/index.tsx) · [교통·주차 안내](src/component/location/index.tsx) · [식사 안내](src/component/information/index.tsx) |
| 표지와 갤러리 사진 | [src/images/](src/images/) · [사진 목록](src/images/index.ts) |
| 링크 공유 미리보기와 배포 주소 | [public/preview_image.jpg](public/preview_image.jpg) · [package.json의 `homepage`](package.json) |
| 공통 스타일과 반응형 레이아웃 | [src/App.scss](src/App.scss) |

기본 예식장은 아르베 웨딩입니다. 신랑·신부 연락처에는 예시 번호 `010-0000-0000`을 사용합니다. 교통·주차·식사 안내와 계좌번호도 편집용 예시입니다. 실제 예식에 맞춰 내용을 바꿔 사용하세요.

## GitHub Pages 배포

1. 저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다. [GitHub Pages 설정 문서](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
2. [package.json](package.json)의 `homepage`를 실제 배포 주소로 바꿉니다. 기본 프로젝트 주소는 `https://<계정>.github.io/<저장소>/`입니다. 빌드 시 이 주소를 기준으로 정적 파일 경로와 공유 미리보기 URL이 생성됩니다.
3. 연동 기능을 사용한다면 **Settings → Secrets and variables → Actions**에 위 표에 따라 값을 등록합니다.
4. `main`에 푸시하거나 **Actions → Deploy**에서 워크플로를 수동 실행합니다. 워크플로는 `npm run build`로 생성한 `build/`를 GitHub Pages에 배포합니다. [배포 워크플로](.github/workflows/deploy.yml)

## 원본과 라이선스

남주호(Ju Ho Nam)의 모바일 청첩장 템플릿을 바탕으로 수정했습니다. 이 프로젝트는 MIT 라이선스를 따릅니다. [원본 저장소](https://github.com/juhonamnam/wedding-invitation) · [LICENSE](LICENSE)
