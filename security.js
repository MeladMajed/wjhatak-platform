(function () {
    // 1. حماية التنقية ضد نصوص XSS الضارة
    window.sanitizeInput = function (str) {
        if (typeof str !== 'string') return str;
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    };

    // 2. التحقق من صحة وحالة المستخدم (هل حسابه مفعل ومعتمد؟)
    window.checkUserAuthStatus = function () {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        
        const path = window.location.pathname;
        if (!currentUser && (path.includes('profile') || path.includes('add-product'))) {
            alert('عذراً، يجب تسجيل الدخول وتوثيق الحساب أولاً للوصول لهذه الصفحة.');
            window.location.href = 'index.html';
            return false;
        }

        if (currentUser && currentUser.status === 'pending') {
            const restricted = path.includes('add-product') || path.includes('gaming');
            if (restricted) {
                alert('حسابك قيد المراجعة والتحقق من الهوية. بانتظار اعتماد الإدارة.');
                return false;
            }
        }
        return true;
    };

    // 3. تأمين حقول المدخلات والنماذج تلقائياً
    document.addEventListener('DOMContentLoaded', () => {
        window.checkUserAuthStatus();

        const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                e.target.value = window.sanitizeInput(e.target.value);
            });
        });
    });
})();