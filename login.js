const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            MicrosoftLogin: './shared/images/ms-login-logo.svg',
            SignUpHref: 'https://sso.ubank.vn/signup?client_id=47rj3rlovbcgdjvm9j5uc9glcj&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://portal.ubank.vn/login',
            ForgotPWD: 'https://sso.ubank.vn/forgotPassword?client_id=47rj3rlovbcgdjvm9j5uc9glcj&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://portal.ubank.vn/login',
            logoImg: './shared/images/fecredit.png',
            logoVN: './shared/images/vietnam.png',
            logoEN: './shared/images/UK.png',
            lang: 'vi',
            i18n: {
                'vi': {
                    'Username': 'Tài khoản đăng nhập',
                    'Password': 'Mật khẩu',
                    'ForgotPassword': 'Bạn quên mật khẩu?',
                    'SignUp': 'Đăng ký',
                    'EnterUsername': 'Nhập tài khoản',
                    'EnterPassword': 'Nhập mật khẩu',
                    'NeedAccount': 'Chưa có tài khoản?'
                },
                'en': {
                    'Username': 'Username',
                    'Password': 'Password',
                    'ForgotPassword': 'Forgot password?',
                    'SignUp': 'Sign up',
                    'EnterUsername': 'Enter your username',
                    'EnterPassword': 'Enter your password',
                    'NeedAccount': 'Need an account? '
                }
            }
        }
    },
    methods: {
        switchLanguage() {
            if (this.lang === 'vi') {
                this.lang = 'en';
            } else {
                this.lang = 'vi';
            }
        }
    }
});



function handleLogin() {
    var clientId = 'c5058ea6-a4ad-44de-ad74-ec502ed357b5';
    var redirectUri = 'http%3A%2F%2Flocalhost%3A8080';
    var authUrl = 'https://login.microsoftonline.com/b6260bc1-0228-4c6f-9881-15add8fb5383/oauth2/v2.0/authorize';
    var responseType = 'code';
    var responseMode = 'query';
    var scope = 'api%3A%2F%2Fc5058ea6-a4ad-44de-ad74-ec502ed357b5%2FPortal.Access';
    var code_challenge_method = 'S256';
    var code_challenge = 'RSMJjR9NmUtGc7XGsbVPXmiwwTzMwSGb2PdIuhEhhEM';

    var url = authUrl + 
                '?client_id=' + clientId + 
                '&response_type=' + responseType + 
                '&response_mode=' + responseMode + 
                '&scope=' + scope + 
                '&redirect_uri=' + redirectUri + 
                '&code_challenge=' + code_challenge + 
                '&code_challenge_method=' + code_challenge_method + 
                '&state=' + '123456';

    window.location.href = url

}

async function getAccessToken() {
    const urlParams = window.location.href;
    array1 = urlParams.split("=");
    array2 = array1[1].split("&");

    const tokenEndpoint = 'https://login.microsoftonline.com/b6260bc1-0228-4c6f-9881-15add8fb5383/oauth2/v2.0/token';
    const formData = new URLSearchParams();
    formData.append('client_id', "c5058ea6-a4ad-44de-ad74-ec502ed357b5");
    formData.append('scope', "api://c5058ea6-a4ad-44de-ad74-ec502ed357b5/Portal.Access");
    formData.append('code', array2[0]);
    formData.append('session_state', array1[2]);
    formData.append('redirect_uri', "http://localhost:8080");
    formData.append('grant_type', 'authorization_code');
    formData.append('code_verifier', '3_bkUeSgPEwwUn05syBCUiQ9Tm1hNlRFSy9mhIo4KxPQvUhh2Ek-iDGESyZYzHYnjlWbn5ACbvTMXM10l1PUaO7x---2-ByQYFort3N0dQCCdh16449gJ9_yMbSs4pIC');
    formData.append('state', '123456');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Origin': 'http://localhost',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    };

    try {
        const response = await fetch(tokenEndpoint, requestOptions);
        console.log("Check response >>>", response, typeof(response))
        
        if (response.ok) {
            const text = await response.text();
            const data = JSON.parse(text);
            console.log("Check access token >>>", data.access_token)
            localStorage.setItem("access_token", data.access_token);
            window.location.href = "http://localhost:8080/home.html";
        } else {
            console.error('Error getting access token:', data);
        }
    } catch (error) {
        console.error('Error getting access token:', error);
    }
}

window.onload = getAccessToken;

app.mount('#app');