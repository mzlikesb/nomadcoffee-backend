# Instaclone

install apollo server 
install graphQL

nodemon - 파일 변경시 자동으로 서버 재시작
babel - node버전이 낮아도 최신 버전 js문법을 사용할 수 있도록 함

prisma 셋업
.env는 git에 업로드 하지 않음
prisma migrate -> prisma에 정의된 스키마를 db와 싱크
prisma 스키마에 맞춰 생성된 client가 node_modules에 생성됨
prisma studio

graphql-tools - typeDefs를 병합하여 불러올 수 있도록 함

node-module 꼬였을때 삭제 후 재설치
rm -rf node-modules
npm i

dotenv
환경변수를 process.env.변수명으로 로드하기 위한 모듈