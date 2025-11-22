# GENBRIDGE — 세대 초월 재능 교환 플랫폼

> 청년과 시니어가 서로의 재능을 교환하며 배움·경험·취미를 이어주는 랜덤 매칭 플랫폼

---

## 📌 프로젝트 소개
GENBRIDGE는 세대 간 정보·경험 격차를 해소하기 위해 제작된 **재능 교환 플랫폼**입니다.  
청년은 시니어에게 실생활 지혜·직무 경험 등을 배우고, 시니어는 청년에게 디지털·취미·운동 등을 배울 수 있습니다.  
랜덤 매칭 방식으로 서로의 재능을 연결하고, 메시지 및 알림 시스템을 통해 지속적인 교류가 가능합니다.


## 🏁 프로젝트 목표

### 단순 기술 구현을 넘어 세대 간 지식·경험의 간극을 기술로 해소하는 플랫폼 구축
---

## ✨ 주요 기능

### 🔐 로그인 & 사용자 식별
- 카카오 소셜 로그인
- 약관 동의 후 로그인 활성화
- 로그인 후 사용자 데이터 저장 / JWT 관리
- 나이 기반 세대 구분 (YOUNG / SENIOR / MIDDLE)

### 💫 재능 등록 및 조회
- 배우고 싶은 재능 / 가르칠 수 있는 재능 카드 UI
- 카테고리 선택 · 재능명 · 태그 입력
- DB 등록 및 UI 실시간 반영

### 🎯 랜덤 매칭 시스템
- 매칭 시작 버튼 → 사용자의 상태 전환
- 매칭 조건(세대 / 매칭 가능 여부) 기반 처리
- 매칭 성공 시 팝업 & 알림 제공
- 매칭  취소 처리

### 💬 교환 UX
- 교환 제안 카드
- 매칭 합의 여부 선택 (수락 / 거절)
- 결과 기반 알림 자동 발송

### ✉️ 메시지 & 알림
- 쪽지 목록 및 상세 페이지
- 신규 메시지 
- 매칭 성공 / 실패 / 취소 

---

## 👨‍👩‍👧 팀원 & 역할

| 이름 | 역할 | 담당 범위 |
|------|------|-----------|
| 🧩 고정은 | 기획 | 서비스 기획 · 사용자 시나리오 · UX 플로우 설계 |
| 🎨 이서진 | Frontend | 채팅/재능 등록/재능 매칭 UI 구현, 카카오 로그인 연동, 백엔드 API 연동 |
| 🎨 김정연 | Frontend | Main페이지/로그인·마이페이지/알림 UI 구현 및 상태 관리 |
| ⚙️ 최영진 | Backend | DB 설계, 매칭 및 메시지 API, 서버 구조 설계 |
| ⚙️ 김태희 | Backend | OAuth 로그인, 사용자/알림 API, 서버 관리 |

---

## 🔧 기술 스택

| 영역 | 사용 기술 |
|------|-----------|
| Frontend | React, JavaScript, CSS Modules |
| Backend | FastAPI, Python, SQLite, SQLAlchemy |
| Auth | Kakao OAuth, JWT |
| Tools | GitHub, Figma, Notion, Swagger |

---

## 📂 프론트엔드 구조
src/
├── components/ # 공통 UI 컴포넌트
├── pages/ # 페이지 (Login, Main, Talent, Message, Mypage 등)
├── assets/ # 이미지/폰트
├── styles/ # CSS Modules
├── services/ # API 함수·날짜 포맷 등
├── App.js
├── index.js
└── index.css


---

## 🖥 백엔드 API Overview

### Auth (인증)
| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|-------------|-------|
| 카카오 로그인 시작 | GET | /auth/kakao/login | 카카오 OAuth 인가 요청 |
| 카카오 콜백 | GET/POST | /auth/kakao/callback | 인가코드 → 액세스 토큰 → JWT 발급 |
| JWT 인증 테스트 | GET | /users/me | 로그인된 사용자 정보 |

### Talents (재능)
| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|-------------|-------|
| 재능 등록 | POST | /talents | 유저가 가진 재능 등록 |
| 재능 조회 | GET | /talents/{user_id} | 특정 유저 재능 조회 |

### Matches (매칭)
| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|-------------|-------|
| 매칭 시작 | POST | /matches/start | 매칭 큐 등록 |
| 매칭 상태 조회 | GET | /matches/status | 내 매칭 상태 확인 |
| 매칭 취소 | POST | /matches/cancel | 큐 제거 |

### Messages (메시지)
| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|-------------|-------|
| 메시지 보내기 | POST | /messages/send | 매칭된 상대에게 메시지 전송 |
| 메시지 조회 | GET | /messages/{match_id} | 특정 매칭의 메시지 내역 조회 |

### Notifications (알림)
| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|-------------|-------|
| 내 알림 조회 | GET | /notifications | 내 알림 리스트 |

---

## ⚙️ 실행 방법

### 🅱 Backend
```bash
git clone https://github.com/2025-DS-Hackathon/BE
cd BE
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 🎨 Frontend
```bash
git clone https://github.com/2025-DS-Hackathon/FE
cd FE/my-react-app
npm install
npm start
```



