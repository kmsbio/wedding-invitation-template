# 모바일 청첩장 템플릿

React, TypeScript, Vite로 만든 한 페이지짜리 모바일 청첩장입니다. 모바일에서는 카드가 세로로 이어지고, 넓은 화면에서는 일부 카드가 나란히 배치됩니다. 예식일 달력, 사진 갤러리, 연락처와 계좌 팝업을 제공합니다.

## 이 템플릿에서 바꾼 내용

- 예식 일시와 아르베 웨딩의 장소 정보, 초대 문구, 대중교통·주차·식사 안내를 반영했습니다.
- 예식장 위치는 네이버 지도에 연결하고, 카카오내비·티맵 길안내의 목적지는 제1주차장인 경복주차장으로 설정했습니다.
- 공개용으로 신랑·신부를 가칭 이하늘·박다온으로 표시하고, 연락처와 계좌를 예시 값으로 설정했습니다. 연락하기 팝업에서는 번호를 확인하고 전화·문자 앱을 열 수 있습니다.
- 표지와 갤러리 사진을 AI로 생성한 웨딩 일러스트로 교체하고, 공유 미리보기 이미지도 새 표지로 바꿨습니다.
- 카카오 JavaScript SDK를 CDN에서 불러오도록 수정했습니다.
- 방명록은 화면에서 숨기고 기존 방명록 데이터는 비웠습니다. 공개 데모는 GitHub Pages로 배포합니다.

참석 의사 전달은 정적 전용 모드가 꺼져 있고 외부 서버 주소가 설정되어 있을 때, 예식 시작 전까지 표시됩니다.

## 로컬에서 실행하기

Node.js 22.x와 npm이 필요합니다. GitHub의 **Code** 버튼에서 복제 주소를 복사해 저장소를 복제한 뒤, 프로젝트 폴더에서 다음 명령을 실행하세요.

```bash
npm ci
npm run dev
```

브라우저에서 `localhost:5173`에 접속합니다. 배포용 파일은 `npm run build`로 `build/`에 생성하며, `npm run preview`로 미리 볼 수 있습니다.

### 환경변수

기본 화면은 환경변수 없이 실행할 수 있습니다. 지도나 카카오톡 공유 등을 사용하려면 프로젝트 루트의 `.env.example`을 복사해 `.env`를 만들고 필요한 값을 입력하세요.

```dotenv
VITE_NAVER_MAP_CLIENT_ID=
VITE_KAKAO_SDK_JS_KEY=
VITE_SERVER_URL=
VITE_STATIC_ONLY=true
```

| 변수 | 용도 | GitHub Actions 설정 |
| --- | --- | --- |
| `VITE_NAVER_MAP_CLIENT_ID` | 네이버 지도 삽입에 사용하는 클라이언트 ID. 값이 비어 있으면 안내 문구와 외부 지도 버튼이 표시됩니다. | Secret |
| `VITE_KAKAO_SDK_JS_KEY` | 카카오톡 공유와 모바일 카카오내비 호출에 사용하는 JavaScript 키. | Secret |
| `VITE_SERVER_URL` | 참석 의사 전달에 사용하는 외부 API 서버 주소. | Variable |
| `VITE_STATIC_ONLY` | `true`로 설정하면 참석 의사 전달을 숨깁니다. | Variable |

`VITE_` 환경변수는 빌드된 브라우저 코드에 포함될 수 있으므로, 클라이언트 공개가 가능한 값만 사용하세요.

## 청첩장 내용 수정하기

| 변경할 내용 | 파일 |
| --- | --- |
| 예식 날짜·장소, 가족 정보, 연락처, 계좌, 지도 좌표·장소 ID | `src/const.ts` |
| 초대 문구 | `src/component/invitation/index.tsx` |
| 대중교통·주차 안내 | `src/component/location/index.tsx` |
| 식사 안내 | `src/component/information/index.tsx` |
| 표지와 갤러리 사진 | `src/images/`, `src/images/index.ts` |
| 공유 미리보기 이미지와 배포 주소 | `public/preview_image.jpg`, `package.json`의 `homepage` |
| 공통 스타일과 반응형 레이아웃 | `src/App.scss` |

실제 청첩장으로 사용할 때는 예식 정보와 예시 연락처·계좌, 안내 문구를 교체하세요.

## GitHub Pages 배포

1. 저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다.
2. `package.json`의 `homepage`를 스킴과 경로를 포함한 실제 배포 주소로 바꿉니다. 빌드 시 이 주소를 기준으로 정적 파일 경로와 공유 미리보기 URL이 생성됩니다.
3. 연동 기능을 사용한다면 **Settings → Secrets and variables → Actions**에 위 표에 따라 값을 등록합니다.
4. `main`에 푸시하거나 **Actions → Deploy**에서 워크플로를 수동 실행합니다. 워크플로는 `npm run build`로 생성한 `build/`를 GitHub Pages에 배포합니다. 설정 파일은 `.github/workflows/deploy.yml`에 있습니다.

## 원본과 라이선스

남주호(Ju Ho Nam)의 모바일 청첩장 템플릿을 바탕으로 수정했습니다. MIT 라이선스 전문은 `LICENSE`에서 확인할 수 있습니다. [원본 저장소](https://github.com/juhonamnam/wedding-invitation)
