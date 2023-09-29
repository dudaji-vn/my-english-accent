const TOKEN = 'token';

const ManagerData = {
    getToken() {
        try {
            const token = localStorage.getItem(TOKEN);
            if (token) return token;
        } catch (e) {
            console.log('Fail to get token', e);
        }
    },
    setToken(value: string) {
        try {
            localStorage.setItem(TOKEN, value);
            // console.log('setToken::');
        } catch (e) {
            console.log('Fail to save token', e);
        }
    },
    removeToken() {
        try {
            localStorage.removeItem(TOKEN);
        } catch (e) {
            console.log('Fail to remove token', e);
        }
    },
};

export default ManagerData;
