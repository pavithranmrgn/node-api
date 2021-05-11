interface config {
    jwtSecret: string;
    tokenExpiry: string;
    refreshTokenExpiry: string;
}

const devConfig: config = {
    jwtSecret: 'Ne!lC^fferry_wc0!!ar',
    tokenExpiry: '24h',
    refreshTokenExpiry: '24h'
};


export const config: config = devConfig;
