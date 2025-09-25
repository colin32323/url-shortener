export const authRoutes = {
    register: "api/v1/auth/register",
    login: "api/v1/auth/login",
};

export const urlRoutes = {
    shortenUrl: "api/v1/url/shorten",
    redirectUrl: (code) => `api/v1/url/${code}`,
    listUrls: "api/v2/url/user/urls",
};
