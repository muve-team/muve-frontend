##  실행 방법

1. 프로젝트 루트에 `.env.local 파일 추가`
    ```
    NEXT_PUBLIC_API_URL=https://api.muve.kr
    ```

2. `npm install -g pnpm`
3. `pnpm install`
4. `pnpm run dev`

## 프로젝트 구조
```
src/
│
├── app/
│   ├── shared/         # 공유 컴포넌트나 유틸리티 함수
│   ├── entities/       # 주요 도메인 모델 (예: User, Product)
│   ├── features/       # 개별 기능 (예: 로그인, 장바구니 추가)
│   ├── widgets/        # 특정 페이지에만 쓰이는 컴포넌트
│   ├── processes/      # 비즈니스 로직을 위한 프로세스 (예: 회원가입)
│   └── pages/          # Next.js의 pages 디렉토리 역할
```

## 파일 네이밍 컨벤션

### 1. 페이지 디렉터리 (`pages/`)
Next.js에서 `pages/` 디렉터리 내부의 파일들은 자동으로 URL 경로와 연결됩니다.  
- **소문자와 하이픈 사용**: 파일 이름은 소문자로 작성하고, 단어 사이에 하이픈(`-`)을 사용해 URL 친화적으로 만듭니다.
  - 예시: `about-us.js` → `/about-us`
- **동적 경로**: 동적 라우팅을 사용할 때는 대괄호(`[]`)를 사용하여 변수를 정의합니다.
  - 예시: `[id].js` → `/123`

### 2. 앱 디렉터리 (`app/`)
Next.js 13에서 도입된 `app/` 디렉터리는 모듈화된 라우팅을 지원합니다. 각 폴더는 라우트 세그먼트를 나타내며, `page.js` 파일이 해당 경로의 콘텐츠를 정의합니다.
- 예시: `app/about/page.js` → `/about`

### 3. 컴포넌트 파일 네이밍
재사용 가능한 컴포넌트는 주로 `components/` 디렉터리에 위치하며, 파일 이름은 **PascalCase**로 작성합니다.
- 예시: `Header.js`, `ProductList.js`

### 4. API 라우트
`pages/api/` 디렉터리의 파일은 API 엔드포인트로 매핑됩니다. 파일 이름 규칙은 페이지와 동일하게 적용됩니다.
- 예시: `pages/api/user.js` → `/api/user`

### 5. CSS 모듈
CSS 모듈을 사용할 때는 파일 이름에 `.module.css` 또는 `.module.scss` 확장자를 사용해 해당 스타일이 컴포넌트에 국한되도록 합니다.
- 예시: `ProductList.module.css`

### 6. TypeScript 지원
TypeScript를 사용하는 경우, 유틸리티 파일은 `.ts`, JSX를 반환하는 컴포넌트는 `.tsx` 확장자를 사용합니다.
- 예시: `Header.tsx`
