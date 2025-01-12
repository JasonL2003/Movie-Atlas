const CONFIG = {
    isLocal: window.location.protocol === 'file:',
    apiUrls: {
        local: 'http://localhost:8000/api/v1/reviews/',
        production: 'https://movie-search-vercel-server.vercel.app/api/v1/reviews/',
    },
};

window.MovieApp = {
    APILINK: CONFIG.isLocal ? CONFIG.apiUrls.local : CONFIG.apiUrls.production,
};
