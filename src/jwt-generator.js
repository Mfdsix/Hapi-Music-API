const crypto = require('crypto')

const ACCESS_TOKEN_KEY = crypto.randomBytes(64).toString('hex')
const REFRESH_TOKEN_KEY = crypto.randomBytes(64).toString('hex')

console.log('ACCESS_TOKEN_KEY', ACCESS_TOKEN_KEY)
console.log('REFRESH_TOKEN_KEY', REFRESH_TOKEN_KEY)
