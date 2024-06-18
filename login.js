function handleLogin() {
    // console.log("Hello world!");
    // var clientId = 'c5058ea6-a4ad-44de-ad74-ec502ed357b5';
    // var redirectUri = 'http%3A%2F%2Flocalhost%3A8080';
    // var authUrl = 'https://login.microsoftonline.com/b6260bc1-0228-4c6f-9881-15add8fb5383/oauth2/v2.0/authorize';
    // var responseType = 'code';
    // var responseMode = 'query';
    // var scope = 'api%3A%2F%2Fc5058ea6-a4ad-44de-ad74-ec502ed357b5%2FPortal.Access';

    // var url = authUrl + 
    //             '?client_id=' + encodeURIComponent(clientId) + 
    //             '&response_type=' + encodeURIComponent(responseType) + 
    //             '&response_mode=' + encodeURIComponent(responseMode) + 
    //             '&scope=' + encodeURIComponent(scope) + 
    //             '&redirect_uri=' + encodeURIComponent(redirectUri) + 
    //             '&state=' + encodeURIComponent(generateRandomState());
            
    // console.log("Check url >>>", url)

    window.location.href = "https://login.microsoftonline.com/b6260bc1-0228-4c6f-9881-15add8fb5383/oauth2/v2.0/authorize?client_id=c5058ea6-a4ad-44de-ad74-ec502ed357b5&response_type=code&response_mode=query&scope=api%3A%2F%2Fc5058ea6-a4ad-44de-ad74-ec502ed357b5%2FPortal.Access&redirect_uri=http%3A%2F%2Flocalhost%3A8080&code_challenge=RSMJjR9NmUtGc7XGsbVPXmiwwTzMwSGb2PdIuhEhhEM&code_challenge_method=S256";

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

