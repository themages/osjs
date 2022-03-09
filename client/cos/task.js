import { init } from './init'
// 取消上传任务
export function cancelTask(taskId) {
	init().cancelTask(taskId)
}
// 暂停上传任务
export function pauseTask(taskId) {
	init().pauseTask(taskId)
}
// 重启上传任务
export function restartTask(taskId) {
	init().restartTask(taskId)
}
