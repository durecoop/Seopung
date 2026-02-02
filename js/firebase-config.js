// ========================================
// Firebase Configuration
// ========================================

// Firebase SDK 로드
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where, onSnapshot, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase 설정 (본인의 Firebase 프로젝트 설정으로 교체 필요)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ========================================
// 데이터베이스 함수들
// ========================================

// 문의 관련 함수
const SeopungDB = {
    // ============ 문의 (Inquiries) ============
    inquiries: {
        // 문의 추가
        add: async function(data) {
            try {
                const docRef = await addDoc(collection(db, "inquiries"), {
                    ...data,
                    createdAt: Timestamp.now(),
                    status: 'pending',
                    read: false
                });
                console.log("문의 등록 완료:", docRef.id);
                return { success: true, id: docRef.id };
            } catch (error) {
                console.error("문의 등록 실패:", error);
                return { success: false, error: error.message };
            }
        },

        // 모든 문의 가져오기
        getAll: async function() {
            try {
                const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const inquiries = [];
                querySnapshot.forEach((doc) => {
                    inquiries.push({ id: doc.id, ...doc.data() });
                });
                return inquiries;
            } catch (error) {
                console.error("문의 조회 실패:", error);
                return [];
            }
        },

        // 문의 상태 업데이트
        update: async function(id, data) {
            try {
                const docRef = doc(db, "inquiries", id);
                await updateDoc(docRef, data);
                return { success: true };
            } catch (error) {
                console.error("문의 업데이트 실패:", error);
                return { success: false, error: error.message };
            }
        },

        // 문의 삭제
        delete: async function(id) {
            try {
                await deleteDoc(doc(db, "inquiries", id));
                return { success: true };
            } catch (error) {
                console.error("문의 삭제 실패:", error);
                return { success: false, error: error.message };
            }
        },

        // 읽지 않은 문의 수
        getUnreadCount: async function() {
            try {
                const q = query(collection(db, "inquiries"), where("read", "==", false));
                const querySnapshot = await getDocs(q);
                return querySnapshot.size;
            } catch (error) {
                return 0;
            }
        }
    },

    // ============ 견적 요청 (Quotes) ============
    quotes: {
        // 견적 추가
        add: async function(data) {
            try {
                const docRef = await addDoc(collection(db, "quotes"), {
                    ...data,
                    createdAt: Timestamp.now(),
                    status: 'pending',
                    read: false
                });
                console.log("견적 요청 등록 완료:", docRef.id);
                return { success: true, id: docRef.id };
            } catch (error) {
                console.error("견적 등록 실패:", error);
                return { success: false, error: error.message };
            }
        },

        // 모든 견적 가져오기
        getAll: async function() {
            try {
                const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const quotes = [];
                querySnapshot.forEach((doc) => {
                    quotes.push({ id: doc.id, ...doc.data() });
                });
                return quotes;
            } catch (error) {
                console.error("견적 조회 실패:", error);
                return [];
            }
        },

        // 견적 상태 업데이트
        update: async function(id, data) {
            try {
                const docRef = doc(db, "quotes", id);
                await updateDoc(docRef, data);
                return { success: true };
            } catch (error) {
                console.error("견적 업데이트 실패:", error);
                return { success: false, error: error.message };
            }
        },

        // 견적 삭제
        delete: async function(id) {
            try {
                await deleteDoc(doc(db, "quotes", id));
                return { success: true };
            } catch (error) {
                console.error("견적 삭제 실패:", error);
                return { success: false, error: error.message };
            }
        },

        // 읽지 않은 견적 수
        getUnreadCount: async function() {
            try {
                const q = query(collection(db, "quotes"), where("read", "==", false));
                const querySnapshot = await getDocs(q);
                return querySnapshot.size;
            } catch (error) {
                return 0;
            }
        }
    },

    // ============ 공지사항 (Notices) ============
    notices: {
        add: async function(data) {
            try {
                const docRef = await addDoc(collection(db, "notices"), {
                    ...data,
                    createdAt: Timestamp.now(),
                    views: 0
                });
                return { success: true, id: docRef.id };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        getAll: async function() {
            try {
                const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const notices = [];
                querySnapshot.forEach((doc) => {
                    notices.push({ id: doc.id, ...doc.data() });
                });
                return notices;
            } catch (error) {
                return [];
            }
        },

        update: async function(id, data) {
            try {
                const docRef = doc(db, "notices", id);
                await updateDoc(docRef, data);
                return { success: true };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

        delete: async function(id) {
            try {
                await deleteDoc(doc(db, "notices", id));
                return { success: true };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    },

    // ============ 유틸리티 함수 ============
    formatDate: function(timestamp) {
        if (!timestamp) return '-';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    },

    getStatusText: function(status) {
        const map = { 'pending': '대기', 'progress': '검토중', 'completed': '완료' };
        return map[status] || status;
    },

    getStatusClass: function(status) {
        const map = { 'pending': 'admin-badge--pending', 'progress': 'admin-badge--progress', 'completed': 'admin-badge--completed' };
        return map[status] || 'admin-badge--pending';
    },

    getInquiryTypeText: function(type) {
        const map = { 'product': '제품문의', 'sample': '샘플요청', 'trade': '거래조건', 'other': '기타' };
        return map[type] || type;
    }
};

// 전역으로 내보내기
window.SeopungDB = SeopungDB;
window.db = db;

export { SeopungDB, db };
