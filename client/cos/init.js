import COS from 'cos-js-sdk-v5'
import { httpRequest } from './httpRequest.js'
let cos = void 0
// url 替换成您自己的后端服务
export function init(obj = {}) {
	if (!cos) {
		const { url } = obj
		cos = new COS({
			// getAuthorization 必选参数
			getAuthorization: function (options, callback) {
				// 异步获取临时密钥
				httpRequest({
					url,
					callback,
				})
			},
		})
	}
	return cos
}
