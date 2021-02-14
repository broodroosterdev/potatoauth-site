class UserService {
    async sendPasswordReset(username){
        let body = {};
        if(username.includes('@')){
            body.email = username;
        } else {
            body.username = username;
        }

        let response = await fetch('https://sync.broodrooster.dev/api/v2/login/user/send-password-reset', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
        return response;
    }
}

export default new UserService();