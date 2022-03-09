import COS from 'cos-js-sdk-v5'
let cos = void 0
// url 替换成您自己的后端服务
export function init(obj = {}) {
	const { url = 'http://127.0.0.1:3002/sts' } = obj
	if (!cos) {
		cos = new COS({
			// getAuthorization 必选参数
			getAuthorization: function (options, callback) {
				// 异步获取临时密钥
				// 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
				// 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
				// STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
				const xhr = new XMLHttpRequest()
				let data = void 0,
					credentials = void 0
				xhr.open('GET', url, true)
				xhr.onload = function (e) {
					try {
						data = JSON.parse(e.target.responseText)
						credentials = data.credentials
					} catch (e) {}
					if (!data || !credentials) {
						return console.error(
							'credentials invalid:\n' + JSON.stringify(data, null, 2)
						)
					}
					callback({
						TmpSecretId: credentials.tmpSecretId,
						TmpSecretKey: credentials.tmpSecretKey,
						SecurityToken: credentials.sessionToken,
						// 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
						StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
						ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
					})
				}
				xhr.send()
			},
		})
	}
	return cos
}
