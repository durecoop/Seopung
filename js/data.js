// ========================================
// 서풍 데이터 관리 (localStorage 기반)
// ========================================

const SeopungData = {
    // 문의 데이터 관리
    inquiries: {
        getAll: function() {
            const data = localStorage.getItem('seopung_inquiries');
            return data ? JSON.parse(data) : [];
        },
        add: function(inquiry) {
            const inquiries = this.getAll();
            inquiry.id = Date.now();
            inquiry.date = new Date().toISOString();
            inquiry.status = 'pending'; // pending, progress, completed
            inquiry.read = false;
            inquiries.unshift(inquiry);
            localStorage.setItem('seopung_inquiries', JSON.stringify(inquiries));
            return inquiry;
        },
        update: function(id, updates) {
            const inquiries = this.getAll();
            const index = inquiries.findIndex(i => i.id === id);
            if (index !== -1) {
                inquiries[index] = { ...inquiries[index], ...updates };
                localStorage.setItem('seopung_inquiries', JSON.stringify(inquiries));
                return inquiries[index];
            }
            return null;
        },
        delete: function(id) {
            const inquiries = this.getAll();
            const filtered = inquiries.filter(i => i.id !== id);
            localStorage.setItem('seopung_inquiries', JSON.stringify(filtered));
        },
        getUnreadCount: function() {
            return this.getAll().filter(i => !i.read && i.status === 'pending').length;
        }
    },

    // 견적 요청 데이터 관리
    quotes: {
        getAll: function() {
            const data = localStorage.getItem('seopung_quotes');
            return data ? JSON.parse(data) : [];
        },
        add: function(quote) {
            const quotes = this.getAll();
            quote.id = Date.now();
            quote.date = new Date().toISOString();
            quote.status = 'pending';
            quote.read = false;
            quotes.unshift(quote);
            localStorage.setItem('seopung_quotes', JSON.stringify(quotes));
            return quote;
        },
        update: function(id, updates) {
            const quotes = this.getAll();
            const index = quotes.findIndex(q => q.id === id);
            if (index !== -1) {
                quotes[index] = { ...quotes[index], ...updates };
                localStorage.setItem('seopung_quotes', JSON.stringify(quotes));
                return quotes[index];
            }
            return null;
        },
        delete: function(id) {
            const quotes = this.getAll();
            const filtered = quotes.filter(q => q.id !== id);
            localStorage.setItem('seopung_quotes', JSON.stringify(filtered));
        },
        getUnreadCount: function() {
            return this.getAll().filter(q => !q.read && q.status === 'pending').length;
        }
    },

    // 날짜 포맷
    formatDate: function(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    },

    // 상태 텍스트
    getStatusText: function(status) {
        const statusMap = {
            'pending': '대기',
            'progress': '검토중',
            'completed': '완료'
        };
        return statusMap[status] || status;
    },

    // 상태 클래스
    getStatusClass: function(status) {
        const classMap = {
            'pending': 'admin-badge--pending',
            'progress': 'admin-badge--progress',
            'completed': 'admin-badge--completed'
        };
        return classMap[status] || 'admin-badge--pending';
    },

    // 문의 유형 텍스트
    getInquiryTypeText: function(type) {
        const typeMap = {
            'product': '제품문의',
            'sample': '샘플요청',
            'trade': '거래조건',
            'other': '기타'
        };
        return typeMap[type] || type;
    },

    // 샘플 데이터 초기화 (데모용)
    initSampleData: function() {
        // 이미 데이터가 있으면 건너뛰기
        if (this.inquiries.getAll().length > 0 || this.quotes.getAll().length > 0) {
            return;
        }

        // 샘플 문의 데이터
        const sampleInquiries = [
            {
                id: 1706400000000,
                date: '2024-01-28T10:00:00.000Z',
                inquiry_type: 'product',
                company: '한국식품',
                name: '김철수',
                phone: '010-1234-5678',
                email: 'kim@kfood.co.kr',
                title: '고등어 제품 문의드립니다',
                content: '안녕하세요. 간고등어 제품에 대해 문의드립니다. 대량 구매 시 가격 협의가 가능한지 알고 싶습니다.',
                status: 'pending',
                read: false
            },
            {
                id: 1706313600000,
                date: '2024-01-27T09:00:00.000Z',
                inquiry_type: 'sample',
                company: '서울급식',
                name: '박영희',
                phone: '010-2345-6789',
                email: 'park@seoulfood.co.kr',
                title: '학교급식용 샘플 요청',
                content: '학교급식 납품을 검토 중입니다. 고등어, 삼치, 오징어 샘플을 받아볼 수 있을까요?',
                status: 'pending',
                read: false
            },
            {
                id: 1706227200000,
                date: '2024-01-26T08:00:00.000Z',
                inquiry_type: 'trade',
                company: '대한유통',
                name: '이민수',
                phone: '010-3456-7890',
                email: 'lee@daehan.co.kr',
                title: '거래 조건 문의',
                content: '정기 거래 시 결제 조건과 최소 주문 수량에 대해 문의드립니다.',
                status: 'completed',
                read: true
            }
        ];

        // 샘플 견적 데이터
        const sampleQuotes = [
            {
                id: 1706400000001,
                date: '2024-01-28T11:00:00.000Z',
                company: '쿠팡',
                name: '구매팀 담당자',
                phone: '02-1234-5678',
                email: 'buyer@coupang.com',
                products: ['mackerel', 'squid'],
                quantity: '월 300박스',
                purpose: '온라인 판매',
                content: '쿠팡 로켓프레시에 입점할 제품 견적 요청드립니다.',
                status: 'progress',
                read: true
            },
            {
                id: 1706313600001,
                date: '2024-01-27T10:00:00.000Z',
                company: '초록마을',
                name: 'MD팀 김과장',
                phone: '02-2345-6789',
                email: 'md@chorokmaul.co.kr',
                products: ['seabream', 'flatfish'],
                quantity: '월 100박스',
                purpose: '매장 판매',
                content: '유기농/친환경 인증 제품으로 PB 상품 개발 검토 중입니다.',
                status: 'pending',
                read: false
            }
        ];

        localStorage.setItem('seopung_inquiries', JSON.stringify(sampleInquiries));
        localStorage.setItem('seopung_quotes', JSON.stringify(sampleQuotes));
    }
};

// 페이지 로드 시 샘플 데이터 초기화
document.addEventListener('DOMContentLoaded', function() {
    SeopungData.initSampleData();
});
