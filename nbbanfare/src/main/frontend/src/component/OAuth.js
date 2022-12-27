
const CLIENT_ID = "2fd104a3490e89ea6ed730f58aa5ef46";
const REDIRECT_URI =  "http://localhost:3000/oauth2/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;