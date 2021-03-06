var STS = require('./sts.js')
var config = require('../config/cos')
var express = require('express')
var bodyParser = require('body-parser')

// 判断是否允许获取密钥
var allowScope = function (scope) {
	// TODO 这里自行定制判断放行逻辑
	var allow = (scope || []).every(function (item) {
		if (item.action === 'name/cos:GetService') {
			return config.allowActions.includes(item.action)
		} else {
			return (
				config.allowActions.includes(item.action) &&
				item.bucket === config.bucket &&
				item.region === config.region &&
				(item.prefix || '').startsWith(config.allowPrefix)
			)
		}
	})
	return allow
}

// 创建临时密钥服务
var app = express()
app.use(bodyParser.json())

// 支持跨域访问
app.all('*', function (req, res, next) {
	res.header('Content-Type', 'application/json')
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.header('Access-Control-Allow-Headers', 'origin,accept,content-type')
	if (req.method.toUpperCase() === 'OPTIONS') {
		res.end()
	} else {
		next()
	}
})

// 临时密钥接口
app.all('/sts', function (req, res, next) {
	// TODO 这里根据自己业务需要做好放行判断
	var scope = req.body
	if (!scope || !scope.length || !allowScope(scope))
		return res.send({
			code: 10000,
			codeDesc: 'ScopeNotAllowed',
			message: 'you are not allowed to perform the operation',
		})

	// 获取临时密钥
	var policy = STS.getPolicy(scope)
	STS.getCredential(
		{
			secretId: config.secretId,
			secretKey: config.secretKey,
			proxy: config.proxy,
			durationSeconds: config.durationSeconds,
			policy: policy,
		},
		function (err, tempKeys) {
			var result = JSON.stringify(err || tempKeys) || ''
			res.send(result)
		}
	)
})
app.all('*', function (req, res, next) {
	res.writeHead(404)
	res.send({
		code: 404,
		codeDesc: 'PageNotFound',
		message: '404 page not found',
	})
})

// 启动签名服务
app.listen(3001)
console.log('app is listening at http://127.0.0.1:3001')
