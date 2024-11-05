const { createApp } = Vue;
createApp({
    data() {
        return {
            isActive: true,
            hasError: true
        };
    },
}).mount('#app');