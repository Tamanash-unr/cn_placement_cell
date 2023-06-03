const development = {
    name: 'development',
    asset_path: '/public',
    session_cookie_key: 'placementCellSecretEncryption',
    db: 'placementCell_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    },
    google_clientID: "674576771185-2ltfbm7d2qjduk4jf1vkkkrfr3thl240.apps.googleusercontent.com",
    google_clientSecret: "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",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback"
}

module.exports = development;