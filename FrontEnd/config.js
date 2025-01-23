const CONFIG = { //movie.js and signinandout.js
    isLocal: window.location.protocol === 'file:',
    apiUrls: {
        local: 'http://localhost:8000/api/v1/reviews/',
        production: 'https://movie-search-vercel-server.vercel.app/api/v1/reviews/',
    },
    userAuth: {
        local: 'http://localhost:8000/api/signup/',
        production: 'https://movie-search-vercel-server.vercel.app/api/signup/',
    }
};

window.apiLink = {
    APILINK: CONFIG.isLocal ? CONFIG.apiUrls.local : CONFIG.apiUrls.production,
};

window.userAuth = {
    AUTHLINK: CONFIG.isLocal ? CONFIG.userAuth.local : CONFIG.userAuth.production,
};