const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const user = require('./api/user')  // ./api/user/index.js 는 생략해도 기본값으로 가져온다.

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', user)    // users 관련된 것은 user 경로 아래로 지정

module.exports = app