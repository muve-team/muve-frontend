# 1. Node.js 18 이미지를 기반으로 빌드
FROM node:18 AS builder

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 패키지 설치 및 프로젝트 복사
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# 4. 프로젝트 파일 복사 및 빌드
COPY . .
RUN npm run build

# 5. Production 환경에서 실행할 이미지
FROM node:18 AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production

# Next.js 서버를 실행할 포트
EXPOSE 3000

# Next.js 실행 명령
CMD ["npm", "run", "start"]