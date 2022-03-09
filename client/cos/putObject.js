import { init } from './init'
// 简单上传接口适用于小文件上传
export function PutObject(obj = {}) {
	const {
		Bucket,
		Region,
		Key,
		StorageClass,
		Body,
		onProgress,
		Headers,
		onTaskReady,
		response,
	} = obj
	init().putObject(
		{
			Bucket /* 必须字段，存储桶的名称 */,
			Region /* 必须字段，存储桶所在地域 */,
			Key /* 必须字段，存储桶中的唯一标识/文件名称 */,
			Body, // 上传文件对象
			Headers, // 限速值设置范围
			StorageClass, // 对象的存储类型
			onTaskReady, // 上传任务创建时的回调函数，返回一个 taskId
			onProgress, // 上传文件的进度回调函数
		},
		response // err, data
	)
}
