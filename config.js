require('dotenv').config();
module.exports = {
    api: {
        PORT: process.env.PORT || 3000
    }, //
    db: {
        URL: process.env.DB_URL || ''
    },
    jwt: {
        secret: process.env.JWT_SECRET || ''
    }
}