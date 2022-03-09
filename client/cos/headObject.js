import { init } from './init'
// 查询可追加对象的 Position
export function headObject(obj = {}) {
	const { url, Bucket, Region, Key, response } = obj
	init({ url }).headObject(
		{
			Bucket /* 填入您自己的存储桶，必须字段 */,
			Region /* 存储桶所在地域，例如ap-beijing，必须字段 */,
			Key /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
		},
		response // err, data
		// data.headers['x-cos-object-type'] === 'appendable'
		// position = data.headers['content-length']
	)
}
