# 🐤 베팅덕
<div align="center">
  <img width="688" alt="image" src="https://github.com/user-attachments/assets/518f9fbd-04e7-4abc-b9bb-7ac33fe764d1">
  
  ![화면 기록 2024-12-02 오후 5 52 03](https://github.com/user-attachments/assets/c9593c91-ce86-48cd-b391-6e80cc96ad64)
</div>

<div align="center">
  승자만이 오리를 갖는다, <b>베팅덕</b>
  <br>
  <br>
  
| [Site](http://175.45.205.245/) | [Figma](https://www.figma.com/design/G7rC9PmXC2tigM6xk6TgRS/boostcamp_web14_betting_duck?node-id=0-1&node-type=canvas&t=aVWRko6PzR7bRG9M-0) | [Wiki](https://github.com/boostcampwm-2024/web14-betting-duck/wiki) |
|--------------------------------|----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|

</div>

## 서비스 둘러보기
### React와 Three.js를 활용한 3D 오리 모델 구현
> @react-three/fiber를 사용하여 React 환경에서 Three.js를 효과적으로 통합, 생동감 넘치는 3D 오리 모델을 추가했습니다.

![화면 기록 2024-12-02 오후 5 46 24](https://github.com/user-attachments/assets/b9586287-5df2-46f8-8816-5e92c1da4709)

### 베팅 대기 페이지의 Socket.IO를 활용한 실시간 사용자 명단 표시
> 베팅 대기 페이지에서 실시간으로 방에 입장한 사용자 명단을 확인할 수 있습니다.<br />
> 이를 통해 관리자는 참여자를 효율적으로 모니터링할 수 있으며 사용자 간의 소통을 지원합니다.<br />
> 이 밖에도 **로그인/베팅 생성 페이지 등의 서비스를 제공**합니다.

![image](https://github.com/user-attachments/assets/47ad7487-cf49-4661-bf2f-252083bf2788)

### 관리자 및 사용자 권한 기반 베팅 관리
> 관리자는 진행 중인 베팅을 취소하거나 종료할 수 있으며 참여자는 자신의 코인을 활용하여 원하는 옵션에 베팅할 수 있습니다.<br />
> **명확한 권한 구분과 기능 제어**를 통해 시스템의 안정성과 유연성을 제공합니다.

![image](https://github.com/user-attachments/assets/cd66e73b-4fbe-47b8-9a02-e331bd0d6166)

### Socket.IO 기반 실시간 베팅 시스템
> 참여자는 소유한 코인의 일부를 원하는 옵션에 실시간으로 베팅할 수 있습니다.<br />서버와 클라이언트 간의 빠르고 안정적인 양방향 통신을 통해 **실시간 데이터 업데이트와 사용자 간의 동기화**를 제공합니다.

![화면 기록 2024-12-02 오후 4 38 34](https://github.com/user-attachments/assets/6edc004d-6edc-4894-8388-25f7d87fa00d)
### Socket.IO 기반 실시간 채팅 기능
> 방에 참여한 모든 사용자가 실시간으로 채팅에 참여할 수 있도록 설계되었습니다.<br />이를 통해 사용자 간 베팅 관련 논의와 의견 교환이 원활하게 이루어질 수 있습니다.<br />안정적인 양방향 통신으로 **메시지가 지연 없이 전달**됩니다.

![화면 기록 2024-12-02 오후 4 45 32](https://github.com/user-attachments/assets/f36e5424-e702-47fd-a416-b84a271f2ef5)




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
![image](https://github.com/user-attachments/assets/dba37a35-46a7-437a-b281-18b5530a7bd4)

## FE 기술적 도전

<br>

## BE 기술적 도전

### Redis를 이용한 메시지 큐 구현
<img width="560" alt="스크린샷 2024-12-02 오후 6 34 20" src="https://github.com/user-attachments/assets/9f443ae1-5a61-4c17-95a8-b4c398718c28">

[Wiki | Redis Streams 구현](https://github.com/boostcampwm-2024/web14-betting-duck/wiki/Redis-Streams-%EA%B5%AC%ED%98%84)

Redis의 List와 Pub/Sub을 활용하여 **메시지 큐를 구현**하였습니다.

List를 사용해 메시지의 **순차적 처리를 보장**하고, Pub/Sub을 통해 **특정 시점에서 메시지를 소비**할 수 있도록 합니다.

또한, ACK Timeout을 통해 **처리되지 않은 메시지를 감지하고 재처리**하는 로직을 구성하였습니다.

이 메시지 큐는 베팅 종료 후, 사용자들의 오리 코인 업데이트 작업을 처리하는 데 사용되었습니다.

<br>

### 캐시를 통한 성능 최적화
[Wiki | 베팅덕에 적용한 다양한 캐시 전략](https://github.com/boostcampwm-2024/web14-betting-duck/wiki/betting-duck-cache-strategy)

**시스템 성능 최적화와 데이터 일관성 유지의 균형을 위해 다양한 캐시 전략을 설계하고 구현했습니다.**

프로젝트에서는 **Read Through**, **Write Through**, **Write Back** 등 여러 캐시 전략을 상황에 맞게 적용했습니다.

유저 정보 조회에는 **Read Through**를 사용해 빠른 응답 속도를 확보하고, 베팅 데이터 저장에는 **Write Through**를 적용해 데이터 정합성을 유지했으며, 실시간 베팅 정보 관리에는 **Write Back**을 활용해 쓰기 부하를 줄이면서 실시간성을 보장했습니다.

<br>
  

### Redis를 활용한 동시성 문제 해결
[Wiki | Redis HINCRBY로 동시성 문제 해결](https://github.com/boostcampwm-2024/web14-betting-duck/wiki/Redis-concurrency-test)

실시간 베팅 처리에서 Redis와 HINCRBY 명령어를 활용해 동시성 문제를 해결했습니다. Redis의 단일 스레드 기반 특성과 HINCRBY의 원자성을 활용해 데이터 업데이트 과정에서 발생할 수 있는 불일치를 방지했습니다. 이를 검증하기 위해 100만 번의 동시 요청을 처리하는 테스트를 진행하며 안정성을 확인했습니다.





## 팀 소개

### 팀원 소개

<img src="https://github.com/user-attachments/assets/53314e4f-19ce-44a4-ab16-97f11c6d0aa7" width="100" height="100" style="border-radius: 50%;" alt="이석호">|<img src="https://github.com/user-attachments/assets/177efdb0-c65f-495f-9ab2-bdfab7c5ca94" width="100" height="100" style="border-radius: 50%;" alt="정동교">|<img src="https://github.com/user-attachments/assets/e10e662d-63d9-4530-8b9a-6cb72132aba5" width="100" height="100" style="border-radius: 50%;" alt="정지호">|<img src="https://github.com/user-attachments/assets/31a2d926-f044-4796-a1ac-2a9f7da0e809" width="100" height="100" style="border-radius: 50%;" alt="최정민">
|-- | -- | -- | --
[[BE] J184 이석호](https://github.com/LLagoon3) | [[BE] J221 정동교](https://github.com/dngyj) | [[FE] J230 정지호](https://github.com/stop0ho) | [[FE] J262 최정민](https://github.com/sunub)


