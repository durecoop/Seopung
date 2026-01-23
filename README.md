# 영어조합법인 서풍 공식 홈페이지

Seopung Fishery Cooperative Official Website

## 개요 | Overview

전라남도 여수시 기반의 수산물 가공 전문 기업 '영어조합법인 서풍'의 공식 홈페이지입니다.

Official website for Seopung Fishery Cooperative, a seafood processing specialist based in Yeosu, Jeollanam-do, South Korea.

## 주요 기능 | Features

- 🌐 **다국어 지원** - 한국어/영어 실시간 전환
- 📱 **반응형 디자인** - 모바일, 태블릿, 데스크톱 최적화
- 📋 **게시판 시스템** - 공지사항, 뉴스, Q&A
- 🎨 **모던 UI/UX** - 프리미엄 수산물 기업 이미지 반영

## 기술 스택 | Tech Stack

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid)
- Vanilla JavaScript
- Google Fonts (Noto Sans KR, Playfair Display)

## GitHub Pages 배포 방법 | Deployment

### 1단계: GitHub 저장소 생성

1. GitHub에서 새 저장소(Repository) 생성
2. 저장소 이름: `seopung-website` 또는 `username.github.io`

### 2단계: 파일 업로드

```bash
# Git 초기화
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Seopung website"

# 원격 저장소 연결
git remote add origin https://github.com/YOUR_USERNAME/seopung-website.git

# 푸시
git push -u origin main
```

### 3단계: GitHub Pages 활성화

1. 저장소 Settings 이동
2. Pages 섹션 선택
3. Source: `Deploy from a branch` 선택
4. Branch: `main`, Folder: `/ (root)` 선택
5. Save 클릭

### 4단계: 접속 확인

배포 완료 후 아래 URL로 접속:
- `https://YOUR_USERNAME.github.io/seopung-website/`

## 파일 구조 | File Structure

```
seopung-website/
├── index.html          # 메인 페이지 (모든 코드 포함)
└── README.md           # 프로젝트 설명서
```

## 회사 정보 | Company Info

| 항목 | 내용 |
|------|------|
| 회사명 | 영어조합법인 서풍 |
| 대표 | 서순심 |
| 설립일 | 2011년 05월 02일 |
| 사업자등록번호 | 417-81-41979 |
| 통신판매업 | 2011-전남여수-0128 |
| 주소 | 전라남도 여수시 화양면 석교로 121 |
| 전화 | 061-681-5171 |
| 팩스 | 061-681-5173 |

## 인증 | Certifications

- ✅ HACCP 식품안전관리인증 (냉동수산식품 어류/연체류)
- ✅ 학교급식 납품업체

## 커스터마이징 | Customization

### 로고 변경
`index.html` 파일에서 `.logo-icon` 부분의 이모지를 실제 로고 이미지로 교체:

```html
<div class="logo-icon">
    <img src="your-logo.png" alt="서풍 로고">
</div>
```

### 제품 이미지 추가
`.product-image` 클래스에 실제 제품 사진 추가:

```html
<div class="product-image">
    <img src="product-photo.jpg" alt="제품명">
</div>
```

### 게시판 데이터 연동
`boardData` 객체를 실제 백엔드 API와 연동하여 동적 콘텐츠 구현 가능

## 라이선스 | License

© 2024 영어조합법인 서풍. All rights reserved.

---

**문의사항은 061-681-5171로 연락 주시기 바랍니다.**
