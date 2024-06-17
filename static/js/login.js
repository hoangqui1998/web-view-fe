function handleLogin() {
    console.log("Hello world!");
    var clientId = 'c5058ea6-a4ad-44de-ad74-ec502ed357b5';
    var redirectUri = 'http%3A%2F%2Flocalhost%3A8080';
    var authUrl = 'https://login.microsoftonline.com/b6260bc1-0228-4c6f-9881-15add8fb5383/oauth2/v2.0/authorize';
    var responseType = 'code';
    var responseMode = 'query';
    var scope = 'api%3A%2F%2Fc5058ea6-a4ad-44de-ad74-ec502ed357b5%2FPortal.Access';

    var url = authUrl + 
                '?client_id=' + encodeURIComponent(clientId) + 
                '&response_type=' + encodeURIComponent(responseType) + 
                '&response_mode=' + encodeURIComponent(responseMode) + 
                '&scope=' + encodeURIComponent(scope) + 
                '&redirect_uri=' + encodeURIComponent(redirectUri) + 
                '&state=' + encodeURIComponent(generateRandomState());
            
    console.log("Check url >>>", url)

    window.location.href = url;
}

function generateRandomState() {
    console.log(Math.random().toString(36).substring(2))
    return Math.random().toString(36).substring(2);
}