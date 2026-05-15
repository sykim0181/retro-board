# 프로젝트 소개
팀원들과 함께 실시간으로 회고를 진행할 수 있는 웹 애플리케이션입니다.  
[Parabol](https://www.parabol.co/)의 Retrospective Tool 디자인과 기능을 참고하여 개발하였습니다.

주요 기능 중 AI 요약 기능을 구현한 코드는 [retro-board-server](https://github.com/sykim0181/retro-board-server) 레포지토리에 확인할 수 있습니다. 

🔗 https://retro-board-sage.vercel.app

# 기술 스택
- 언어 및 프레임워크: React , Typescript, Vite
- 상태 관리: Tanstack Query, Redux, Liveblocks
- ui: TailwindCSS, shadcn/ui, 
- DB: Firebase
- BE: Express
- 배포: Vercel

# 주요 기능
## 1. 카드 작성 (Reflect)
카테고리별(Start, End, Continue) 실시간 카드 작성, 드래그를 통한 순서 및 카테고리 변경
 ![image](https://github.com/user-attachments/assets/de9b6e5c-c4cd-4ada-81e0-de779864744a)


## 2. 투표 (Vote)
각 카드에 대한 투표
 ![image](https://github.com/user-attachments/assets/2a772118-992f-46fa-9e80-af2e1f555969)


## 3. 토론 (Discuss)
각 카드(Topic)에 대한 이모지 리액션, 실시간 의견 교환 및 할 일(Task) 추가 
 ![image](https://github.com/user-attachments/assets/34c4c014-cf1c-45b8-bcdf-96573e7b5a73)

## 4. 회고 요약
Topic, Task 정리 및 AI 요약
 ![image](https://github.com/user-attachments/assets/22c955f5-2611-40e6-8bc2-69b07e1e1d25)
 ![image](https://github.com/user-attachments/assets/5d6b1db2-3796-4922-a91a-04cd8a9ef552)

