// import { init } from '../client/cos/init.js'
import { PutObject } from '../client/cos/putObject.js'

var files = document.querySelector('#files')
files.addEventListener('change', function (e) {
	console.log(e.target.files)
	const files = e.target.files[0]
	PutObject({
		Bucket: 'sls-cloudfunction-ap-guangzhou-code-1256070452',
		Region: 'ap-guangzhou',
		Key: 'like/' + files.name,
		StorageClass: 'STANDARD',
		Body: files,
		onProgress: function (progress) {
			console.log('progress: %O', progress)
		},
		onTaskReady: function (task) {
			console.log('task: %O', task)
		},
		response: function (error, response) {
			console.log('error: %O, response: %O', error, response)
		},
	})
})
