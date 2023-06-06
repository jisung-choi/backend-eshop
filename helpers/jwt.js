var { expressjwt: expressjwt }  = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
             //regular expression instead of string to allow .* - allow products/...
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            //for user to autoFill info on checkout & register as user
            { url: /\/api\/v1\/users\/info(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            `${api}/users/login`,
            `${api}/users/register`,
            `${api}/admins/login` 
        ]
    })
}

async function isRevoked(req, payload) {
    console.log(payload.payload.isAdmin);
    // change to isUsersAdmin || isProductsAdmin || isOrdersAdmin
    if (!payload.payload.isAdmin) {
      return true; // not admin so cancel request
    }
    return false;
}

module.exports = authJwt