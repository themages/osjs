var STS = require('./sts.js')
var config = require('../config/cos')
var express = require('express')
var bodyParser = require('body-parser')

// 创建临时密钥服务
var app = express()
app.use(bodyParser.json())

// 支持跨域访问
app.all('*', function (req, res, next) {
	res.header('Content-Type', 'application/json')
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1')
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

	// 获取临时密钥
	var shortBucketName = config.bucket.substr(0, config.bucket.lastIndexOf('-'))
	var appId = config.bucket.substr(1 + config.bucket.lastIndexOf('-'))
	var policy = {
		version: '2.0',
		statement: [
			{
				action: config.allowActions,
				effect: 'allow',
				principal: { qcs: ['*'] },
				resource: [
					'qcs::cos:' +
						config.region +
						':uid/' +
						appId +
						':prefix//' +
						appId +
						'/' +
						shortBucketName +
						'/' +
						config.allowPrefix,
				],
			},
		],
	}
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
app.listen(3002)
console.log('app is listening at http://127.0.0.1:3002')
