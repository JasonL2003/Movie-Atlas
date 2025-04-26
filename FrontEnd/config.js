const CONFIG = { //movie.js and signinandout.js
    isLocal: window.location.hostname === '127.0.0.1',
    apiUrls: {
        local: 'http://localhost:8000/api/v1/reviews/',
        production: 'https://movie-search-vercel-server.vercel.app/api/v1/reviews/',
    },
    userAuth: {
        signUp: {
            local: 'http://localhost:8000/api/signup/',
            production: 'https://movie-search-vercel-server.vercel.app/api/signup/',
        },
        signIn: {
            local: 'http://localhost:8000/api/signin/',
            production: 'https://movie-search-vercel-server.vercel.app/api/signin/',
        }
    },
    tokenRequest: {
        local: 'http://localhost:8000/api/profile/',
        production: 'https://movie-search-vercel-server.vercel.app/api/profile/',
    }
};

window.apiLink = CONFIG.isLocal ? CONFIG.apiUrls.local : CONFIG.apiUrls.production;
window.userAuthSignUp = CONFIG.isLocal ? CONFIG.userAuth.signUp.local : CONFIG.userAuth.signUp.production;
window.userAuthSignIn = CONFIG.isLocal ? CONFIG.userAuth.signIn.local : CONFIG.userAuth.signIn.production;
window.tokenRequest = CONFIG.isLocal ? CONFIG.tokenRequest.local : CONFIG.tokenRequest.production;