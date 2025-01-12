const CONFIG = { //movie.js const APILINK = window.apiLink.APILINK;
    isLocal: window.location.protocol === 'file:',
    apiUrls: {
        local: 'http://localhost:8000/api/v1/reviews/',
        production: 'https://movie-search-vercel-server.vercel.app/api/v1/reviews/',
    },
};

window.apiLink = {
    APILINK: CONFIG.isLocal ? CONFIG.apiUrls.local : CONFIG.apiUrls.production,
};
