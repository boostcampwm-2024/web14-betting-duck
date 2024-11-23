# 🐤 베팅덕
<div align="center">
  <img width="688" alt="image" src="https://github.com/user-attachments/assets/518f9fbd-04e7-4abc-b9bb-7ac33fe764d1">
</div>

<div align="center">
  승자만이 오리를 갖는다, <b>베팅덕</b>
  <br>
  <br>
  
| [Site](http://175.45.205.245/) | [Figma](https://www.figma.com/design/G7rC9PmXC2tigM6xk6TgRS/boostcamp_web14_betting_duck?node-id=0-1&node-type=canvas&t=aVWRko6PzR7bRG9M-0) | [Wiki](https://github.com/boostcampwm-2024/web14-betting-duck/wiki) |
|--------------------------------|----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|

</div>

## 주요 기능 및 특징

<img width="917" alt="image" src="https://github.com/user-attachments/assets/81deb355-96e6-4896-8142-d3d46e971a3f">

- **방 생성**: 로그인한 사용자는 승부 예측 게임 방을 생성할 수 있습니다. 방 생성 시 게임 제목과 진행 시간을 설정해야 합니다.
- **초대 기능**: 방을 생성한 사용자는 URL을 공유하여 다른 사용자를 초대할 수 있으며, 초대받은 사용자는 로그인 없이도 해당 방에 참여할 수 있습니다.
- **채팅 기능**: 방에 참여한 모든 사용자는 채팅에 참여할 수 있습니다.
- **참여 방식**: 방에 참여한 모든 사용자는 기본적으로 약 30코인(미정)을 지급받으며, 이 코인으로 승부 예측 게임에 참여할 수 있습니다.
- **베팅 기능**: 참여자는 소유한 코인 중 일부를 배팅하여 특정한 예측에 걸 수 있습니다.
- **게임 결과**: 설정된 시간이 종료되면 결과에 따라 베팅한 금액을 조정합니다. 사용자는 자신과 반대 방향에 배팅한 사용자 수의 비율에 맞춰 코인을 획득하거나 잃게 됩니다.
- **마이페이지 연못**: 사용자는 획득한 오리(코인)로 일정 금액을 지불해 마이페이지에 있는 연못에 오리를 추가할 수 있습니다.

## 기술 스택

### 공통
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-29BEB0?style=flat&logo=husky&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

### FE (Frontend)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack%20Router-FF4154?style=flat&logo=react-router&logoColor=white)

### BE (Backend)
![Nest.js](https://img.shields.io/badge/Nest.js-E0234E?style=flat&logo=nestjs&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socket.io&logoColor=white)
![nginx](https://img.shields.io/badge/nginx-009639?style=flat&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

### Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)

### Infrastructure
![nCloud](https://img.shields.io/badge/nCloud-03C75A?style=flat&logo=naver&logoColor=white)


## 폴더 구조

```plaintext
WEB14-BOOSTPROJECT/
├── .github/                # GitHub 관련 설정 (워크플로우, 이슈 템플릿 등)
├── .husky/                 # Git 커밋 및 푸시 훅 설정 디렉토리
├── backend/                # 백엔드 소스 코드 디렉토리
├── frontend/               # 프론트엔드 소스 코드 디렉토리
├── node_modules/           # 프로젝트 의존성 패키지가 저장되는 디렉토리
├── shared/                 # 프론트엔드와 백엔드에서 공통으로 사용하는 코드 (예: 유틸리티 함수, 타입 정의 등)
├── .editorconfig           # 코드 스타일 통일을 위한 에디터 설정 파일
├── .gitignore              # Git에 포함하지 않을 파일 및 디렉토리 목록
├── .npmrc                  # npm 설정 파일 (레지스트리 경로, 캐시 설정 등)
├── .nvmrc                  # 프로젝트에서 사용하는 Node.js 버전 명시
├── .prettierrc             # Prettier 코드 포맷 설정 파일
├── docker-compose.yml      # Docker Compose 설정 파일
├── eslint.config.mjs       # ESLint 설정 파일 (코드 품질 검사용)
├── nginx.conf              # Nginx 서버 설정 파일 (프로덕션 환경)
├── nginx.dev.conf          # Nginx 개발 환경 설정 파일
├── package.json            # 프로젝트 종속성 및 스크립트 정보
├── pnpm-lock.yaml          # PNPM 패키지 매니저 잠금 파일 (의존성 버전 고정)
├── pnpm-workspace.yaml     # PNPM 워크스페이스 설정 파일 (모노레포 환경 관리)
```

## 프로젝트 아키텍쳐 다이어그램
<img width="1143" alt="스크린샷 2024-11-22 오후 5 46 16" src="https://github.com/user-attachments/assets/390d5666-92c4-49ec-8559-6bb349091dd6">

## 팀 소개

### 팀원 소개

<img src="https://github.com/user-attachments/assets/53314e4f-19ce-44a4-ab16-97f11c6d0aa7" width="100" height="100" style="border-radius: 50%;" alt="이석호">|<img src="https://github.com/user-attachments/assets/177efdb0-c65f-495f-9ab2-bdfab7c5ca94" width="100" height="100" style="border-radius: 50%;" alt="정동교">|<img src="https://github.com/user-attachments/assets/e10e662d-63d9-4530-8b9a-6cb72132aba5" width="100" height="100" style="border-radius: 50%;" alt="정지호">|<img src="https://github.com/user-attachments/assets/31a2d926-f044-4796-a1ac-2a9f7da0e809" width="100" height="100" style="border-radius: 50%;" alt="최정민">
|-- | -- | -- | --
[[BE] J184 이석호](https://github.com/LLagoon3) | [[BE] J221 정동교](https://github.com/dngyj) | [[FE] J230 정지호](https://github.com/stop0ho) | [[FE] J262 최정민](https://github.com/sunub)


