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

## 서비스 소개
**즐기고, 베팅하고, 꾸며보세요!**
우리 서비스는 실시간 베팅의 짜릿함과 채팅의 소통 재미를 결합한 새로운 경험을 제공합니다!

- 코인으로 **베팅**하며 예측의 재미를 느껴보세요.
- **채팅으로 자유롭게 소통**하며 다른 유저들과 수다를 즐겨보세요.
- 베팅으로 얻은 코인으로 **귀여운 오리를 구매**해 나만의 마이페이지를 꾸며보세요.

재미있는 베팅과 나만의 공간 꾸미기로 특별한 경험을 선사합니다.
지금 바로 함께하세요, 소통과 즐거움이 가득한 새로운 세계로!

## 프로젝트를 시작하게 된 계기
저희 프로젝트는 치지직 서비스를 이용하면서 느낀 아쉬움을 해소하기 위해 시작되었습니다.

트위치(Twitch)는 전 세계적으로 인기 있는 실시간 스트리밍 플랫폼으로, 한국에서도 많은 사람들이 포인트 예측 시스템을 즐겨 사용했지만 트위치가 한국에서 철수하면서 더 이상 해당 기능을 사용할 수 없게 되었습니다.
대안으로 많은 사람들이 **치지직**이라는 스트리밍 플랫폼을 이용하기 시작했지만, 치지직에는 **베팅 서비스가 없는 점이 아쉽다**는 의견이 많았습니다.

이러한 피드백을 바탕으로 **"우리가 직접 베팅 시스템을 만들어보자!"** 하는 생각을 계기로 프로젝트를 진행하게 되었습니다.

**🎯 사용자들의 아쉬움을 채워줄 특별한 베팅 시스템을 만나보세요!**

## 베팅덕에서의 베팅?

베팅덕에서의 베팅은 방장이 정한 **두 가지 옵션 중 승산이 더 높아보이는 것에 덕(duck)코인을 거는 것**을 의미합니다. 베팅이 끝나면 코인을 잃거나, 배율만큼의 코인을 획득할 수 있습니다.

‘한일전에서 한국이 이길 것인가 일본이 이길 것인가와 같은 일반적인 베팅’에서부터, ‘오늘 내가 저녁 식사 후에 간식을 먹었는지 먹지 않았는지’와 같은 아주 사소한 것까지. **어떤 주제로 베팅을 할지는 전적으로 여러분에게 달려있습니다.**

### 작은 웹 사이트의 베팅 시스템

“베팅 시스템”을 만들자는 목적에 따라 처음에는 베팅 기능만을 생각했습니다. 유튜브, 치지직, 생방송 스포츠 경기 등의 다양한 컨텐츠 중 **사용자가 원하는 컨텐츠를 시청하며 베팅을 할 수 있다면 좋겠다는 생각에, 별도의 컨텐츠를 제공하지 않고 작은 창으로 띄워두고 베팅만을 즐길 수 있도록** 구현했습니다.

## 서비스 둘러보기
### 코인으로 오리를 구매해 마이페이지 꾸미기
> @react-three/fiber를 사용하여 React 환경에서 Three.js를 효과적으로 통합, 생동감 넘치는 3D 오리 모델을 추가했습니다.<br />
> 사용자는 **코인으로 오리를 구매해 마이페이지를 꾸밀 수 있습니다.**
베팅과 함께 어떠한 즐거움을 줄 수 있는 방법이 없을까? 베팅해서 현금을 벌 수 있는 게 아닌데, 사용자가 어떤 재미를 얻어갈 수 있을까? 하는 생각을 했습니다. **베팅으로 번 돈을 어디에 쓰는 것이 좋을까?**

사람들이 힘들게 돈을 버는 이유는 필요한 어떤 것을 구매하기 위함이라고 생각합니다. 그렇다면 **열심히 베팅을 해서 뭔가를 살 수 있으면 좋지 않을까?** 마침 부스트캠프의 마스코트는 부덕이(오리)니까 오리를 살 수 있게 컨텐츠를 만들어 보자!

그래서 저희는 마이페이지를 추가했고, 오리를 구매하고, 오리를 모을 수 있도록 구상했습니다.

![화면 기록 2024-12-02 오후 5 46 24](https://github.com/user-attachments/assets/b9586287-5df2-46f8-8816-5e92c1da4709)

### 체험용 비회원 로그인 시스템
> **비회원 로그인을 통해 사용자가 더 쉽게 서비스를 체험할 수 있도록 설계**하였으며 **IP 기반 제한**을 통해 비회원 로그인 시스템 남용을 제한합니다.

![화면 기록 2024-12-03 오후 4 15 21](https://github.com/user-attachments/assets/9a43b30b-5bb6-4ae2-bba8-5860aa221f41)

- 비회원이 로그인할 경우, 일반 회원과 구분하기 위해 "익명의"라는 이름이 자동 추가되며, 간단한 닉네임만으로 서비스를 이용할 수 있습니다.
- 한 사람이 여러 아이디를 생성해 부당하게 베팅에 참여하는 것을 방지하기 위해, **IP 기반 제한을 구현하여 동일 IP에서는 이전에 생성된 닉네임으로만 접근이 가능**합니다.

> [!CAUTION]
> 비회원 로그인은 **체험에 초점을 맞춘 기능**입니다. 따라서 공용 IP 환경에서는 로그인 제한이 불편할 수 있습니다. <br />이런 경우, **간단한 회원가입을 통해 서비스의 모든 기능을 온전히 경험할 수 있습니다.**

### 베팅 생성 페이지
> 베팅 생성 페이지는 사용자가 직접 제목, 케이스1, 케이스2, 타이머, 최소 금액을 설정할 수 있도록 구성되었습니다.<br />또한, **유효한 입력 값이 입력된 경우에만** 방을 생성할 수 있습니다.

![화면 기록 2024-12-03 오후 4 28 43](https://github.com/user-attachments/assets/a4a80c5b-b664-4811-8a6b-7796b0d53b30)

### 베팅 대기 페이지의 실시간 사용자 명단 표시
> 실시간으로 방에 입장한 사용자 명단을 확인할 수 있습니다.<br />
> 이를 통해 관리자는 참여자를 효율적으로 모니터링할 수 있으며 사용자 간의 소통을 지원합니다.<br />

<img width="400" alt="image" src="https://github.com/user-attachments/assets/1d1fe78b-9faa-4a86-9ccc-f5eaf75c73f1">

### 관리자 및 사용자 권한 기반 베팅 관리
> 관리자는 진행 중인 베팅을 취소하거나 종료할 수 있으며 참여자는 자신의 코인을 활용하여 원하는 옵션에 베팅할 수 있습니다.<br />

![image](https://github.com/user-attachments/assets/cd66e73b-4fbe-47b8-9a02-e331bd0d6166)

### 실시간 베팅 시스템
> 참여자는 소유한 코인의 일부를 원하는 옵션에 실시간으로 베팅할 수 있습니다.<br />서버와 클라이언트 간의 빠르고 안정적인 양방향 통신을 통해 **실시간 데이터 업데이트와 사용자 간의 동기화**를 제공합니다.

![화면 기록 2024-12-02 오후 4 38 34](https://github.com/user-attachments/assets/6edc004d-6edc-4894-8388-25f7d87fa00d)
### 실시간 채팅 기능
> 방에 참여한 모든 사용자가 실시간으로 채팅에 참여할 수 있도록 설계되었습니다.<br />이를 통해 사용자 간 베팅 관련 논의와 의견 교환이 원활하게 이루어질 수 있습니다.<br />안정적인 양방향 통신으로 **메시지가 지연 없이 전달**됩니다.

![화면 기록 2024-12-02 오후 4 45 32](https://github.com/user-attachments/assets/f36e5424-e702-47fd-a416-b84a271f2ef5)

## 핵심 기술적 도전
> [!IMPORTANT]
> 프로젝트를 진행하며 사용자의 편의성과 시스템의 안정성을 위해 **다양한 기술적 도전과 문제 해결을 경험**했습니다. 아래는 그 중 핵심적인 내용들입니다. <br>**더 자세한 구현 과정과 문제 해결 방법은 [Wiki 페이지](https://github.com/boostcampwm-2024/web14-betting-duck/wiki)에서 확인하실 수 있습니다.** Wiki를 통해 구체적인 설정, 코드 스니펫, 심화 내용을 확인해 보세요!
### Three.js를 활용한 3D 오리 구매 기능
저희 프로젝트는 베팅으로 얻은 코인으로 Three.js를 활용하여 사용자가 오리를 구매할 수 있는 기능을 구현하였습니다. 개발 과정에서 우리가 직면했던 주요 문제는 3D 모델링 파일(.glb)과 환경 맵핑 파일(.hdr)을 서버에 배포하는 과정이었습니다.

이 문제의 구체적인 원인은 Vite가 기본적으로 이러한 3D 에셋 파일들을 처리하는 방식에 있었습니다. 우리는 Vite의 설정을 수정하여 이 문제를 해결할 수 있었습니다. 문제 해결 과정과 상세한 설정 방법은 아래 링크에서 확인하실 수 있습니다.
> 자세히 보기: [Wiki | Vite 빌드 시 일어나는 작업들](https://github.com/boostcampwm-2024/web14-betting-duck/wiki/vite-build-works)

### 베팅 생성 페이지의 성능 최적화와 검증
해당 페이지에서 값을 입력할 때마다 관련 없는 컴포넌트들이 같이 리렌더링이 되는 문제를 겪었습니다. 이 문제를 해결하기 위하여 **상태 관리와 렌더링 최적화를 통해 입력 과정에서의 성능 저하 최소화**를 위해서 노력하였고 또한 유효성 검증을 통해 모든 필드가 적절히 입력된 경우에만 요청 전송하도록 설정하여 백엔드와의 통신에서 **필수 데이터 검증 및 오류 처리**로 신뢰성을 확보 하고자 하였습니다.
> 자세히 보기: [Wiki | 불필요한 리렌더링 방지](https://github.com/boostcampwm-2024/web14-betting-duck/wiki/%EB%B6%88%ED%95%84%EC%9A%94%ED%95%9C-%EB%A6%AC%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%B0%A9%EC%A7%80-React.memo%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)


### Socket.io를 활용한 베팅 기능 구현 중 잘못된 소켓 연결 관리로 인한 서버 다운 문제 발생
CSR(Client-Side Rendering) 방식의 프로젝트에서 소켓 연결을 useEffect로 관리했지만, 클린업 함수에서 소켓 연결이 제대로 종료되지 않아 불필요한 연결이 계속 유지되는 문제가 발생했습니다. 이로 인해 컴포넌트 언마운트나 의존성 배열 변경 시 기존 소켓 연결이 누적되어 메모리 누수와 서버 리소스 낭비로 이어졌습니다.

문제를 해결하기 위해 **useEffect의 클린업 함수 작동 원리, 비동기 작업 처리 시 클린업 구현 방법, 상태 초기화를 확실히 보장하는 방법을 학습하고 적용하여 소켓 연결 관리 문제를 해결**했습니다.
> 자세히 보기: [Wiki | 소켓 관리 실패로 인한 서버 다운 문제 해결](https://github.com/boostcampwm-2024/web14-betting-duck/wiki/%EC%86%8C%EC%BC%93-%EA%B4%80%EB%A6%AC-%EC%8B%A4%ED%8C%A8%EB%A1%9C-%EC%9D%B8%ED%95%9C-%EC%84%9C%EB%B2%84-%EB%8B%A4%EC%9A%B4-%EB%AC%B8%EC%A0%9C-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0)

### Redis를 이용한 메시지 큐 구현
<img width="560" alt="스크린샷 2024-12-02 오후 6 34 20" src="https://github.com/user-attachments/assets/9f443ae1-5a61-4c17-95a8-b4c398718c28">

> 자세히 보기: [Wiki | Redis Streams 구현](https://github.com/boostcampwm-2024/web14-betting-duck/wiki/Redis-Streams-%EA%B5%AC%ED%98%84)

Redis의 List와 Pub/Sub을 활용하여 **메시지 큐를 구현**하였습니다.

List를 사용해 메시지의 **순차적 처리를 보장**하고, Pub/Sub을 통해 **특정 시점에서 메시지를 소비**할 수 있도록 합니다.

또한, ACK Timeout을 통해 **처리되지 않은 메시지를 감지하고 재처리**하는 로직을 구성하였습니다.

이 메시지 큐는 베팅 종료 후, 사용자들의 오리 코인 업데이트 작업을 처리하는 데 사용되었습니다.

### 캐시를 통한 성능 최적화
> 자세히 보기: [Wiki | 베팅덕에 적용한 다양한 캐시 전략](https://github.com/boostcampwm-2024/web14-betting-duck/wiki/betting-duck-cache-strategy)

**시스템 성능 최적화와 데이터 일관성 유지의 균형을 위해 다양한 캐시 전략을 설계하고 구현했습니다.**

프로젝트에서는 **Read Through**, **Write Through**, **Write Back** 등 여러 캐시 전략을 상황에 맞게 적용했습니다.

유저 정보 조회에는 **Read Through**를 사용해 빠른 응답 속도를 확보하고, 베팅 데이터 저장에는 **Write Through**를 적용해 데이터 정합성을 유지했으며, 실시간 베팅 정보 관리에는 **Write Back**을 활용해 쓰기 부하를 줄이면서 실시간성을 보장했습니다.
  

### Redis를 활용한 동시성 문제 해결
> 자세히 보기: [Wiki | Redis HINCRBY로 동시성 문제 해결](https://github.com/boostcampwm-2024/web14-betting-duck/wiki/Redis-concurrency-test)

실시간 베팅 처리에서 Redis와 HINCRBY 명령어를 활용해 동시성 문제를 해결했습니다. Redis의 단일 스레드 기반 특성과 HINCRBY의 원자성을 활용해 데이터 업데이트 과정에서 발생할 수 있는 불일치를 방지했습니다. 이를 검증하기 위해 100만 번의 동시 요청을 처리하는 테스트를 진행하며 안정성을 확인했습니다.


## 기술 스택

### 공통
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-29BEB0?style=flat&logo=husky&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socket.io&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

### FE (Frontend)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack%20Router-FF4154?style=flat&logo=react-router&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)

### BE (Backend)
![Nest.js](https://img.shields.io/badge/Nest.js-E0234E?style=flat&logo=nestjs&logoColor=white)
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

## 버그 리포트  
서비스 사용 중 문제가 발생했나요?  
**아래 구글 폼을 통해 버그를 제보해 주세요!**  
[버그 리포트 제출하기](https://forms.gle/FcnRf3UaNGwpmzuXA)

## 팀 소개

### 팀원 소개

<img src="https://github.com/user-attachments/assets/53314e4f-19ce-44a4-ab16-97f11c6d0aa7" width="100" height="100" style="border-radius: 50%;" alt="이석호">|<img src="https://github.com/user-attachments/assets/177efdb0-c65f-495f-9ab2-bdfab7c5ca94" width="100" height="100" style="border-radius: 50%;" alt="정동교">|<img src="https://github.com/user-attachments/assets/e10e662d-63d9-4530-8b9a-6cb72132aba5" width="100" height="100" style="border-radius: 50%;" alt="정지호">|<img src="https://github.com/user-attachments/assets/31a2d926-f044-4796-a1ac-2a9f7da0e809" width="100" height="100" style="border-radius: 50%;" alt="최정민">
|-- | -- | -- | --
[[BE] J184 이석호](https://github.com/LLagoon3) | [[BE] J221 정동교](https://github.com/dngyj) | [[FE] J230 정지호](https://github.com/stop0ho) | [[FE] J262 최정민](https://github.com/sunub)


