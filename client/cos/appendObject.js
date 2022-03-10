import { init } from './init'
// 追加上传对象
export function appendObject(obj = {}) {
	const { url, Bucket, Region, Key, Body, Position, response } = obj
	init({ url }).appendObject(
		{
			Bucket /* 填入您自己的存储桶，必须字段 */,
			Region /* 存储桶所在地域，例如ap-beijing，必须字段 */,
			Key /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
			Body, // 上传文件对象
			Position, // 初次上传为0
		},
		response // err, data
	)
}
