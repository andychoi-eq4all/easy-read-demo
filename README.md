# Easy Read

"Easy Read"는 복잡한 텍스트를 이해하기 쉬운 언어로 변환하여 정보 접근성을 높이는 것을 목표로 하는 웹 애플리케이션입니다. 사용자는 원문을 입력하고, AI 기반의 텍스트 간소화 기능을 통해 더 명확하고 읽기 쉬운 결과물을 얻을 수 있습니다.

## ✨ 주요 기능

-   **AI 기반 텍스트 간소화**: 최신 AI 모델을 활용하여 문장의 구조, 어휘, 길이를 조절하여 텍스트를 더 쉽게 만듭니다.
-   **양방향 패널 뷰**: 원문과 간소화된 텍스트를 나란히 비교하며 볼 수 있습니다.
-   **대화형 조정**: 사용자는 간소화 수준이나 특정 요구사항을 프롬프트를 통해 직접 제어할 수 있습니다.
-   **전문가 지원 요청**: 추가적인 도움이 필요할 경우, 전문가의 검토를 요청하는 기능을 제공합니다.
-   **모던 UI/UX**: `shadcn/ui`와 Tailwind CSS를 기반으로 한 깔끔하고 반응형인 디자인을 제공합니다.

## 🛠️ 기술 스택

-   **프레임워크**: React, Vite
-   **언어**: TypeScript
-   **스타일링**: Tailwind CSS, shadcn/ui
-   **상태 관리**: React Context API, TanStack Query
-   **라우팅**: Wouter
-   **폼 처리**: React Hook Form

## 🚀 시작하기

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 1. 저장소 복제

```bash
git clone https://github.com/your-username/easy-read.git
cd easy-read
```

### 2. 의존성 설치

프로젝트에 필요한 패키지를 설치합니다.

```bash
npm install
```

### 3. 개발 서버 실행

다음 명령어를 실행하여 개발 서버를 시작합니다.

```bash
npm run dev
```

서버가 시작되면 브라우저에서 `http://localhost:5173` (또는 Vite가 지정한 다른 포트)으로 접속할 수 있습니다.

## 📜 사용 가능한 스크립트

-   `npm run dev`: 개발 모드로 Vite 서버를 실행합니다.
-   `npm run build`: 프로덕션용으로 프로젝트를 빌드합니다.
-   `npm run preview`: 빌드된 결과물을 미리 봅니다.
-   `npm run check`: TypeScript 타입 체킹을 실행합니다.

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.
