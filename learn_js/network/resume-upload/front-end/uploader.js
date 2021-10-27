
class Uploader {

	constructor({file, onProgress}){
		this.file = file;
		this.onProgress = onProgress;

		this.fileId = `${+file.lastModifiedDate}-${file.size}-${file.name}`;
	}

	async getUploadedBytes(){
		let response = await fetch('http://localhost:3002/status',{
			headers:{
				'X-File-Id': this.fileId
			}
		});
		if(response.status !== 200){
			throw new Error(`Can't get uploaded bytes: ${response.statusText}`);
		}
		let text = await response.text();
		return +text;
	}
	
	async upload(){
		this.startByte = await this.getUploadedBytes();

		let xhr = this.xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:3002/upload', true);
		xhr.setRequestHeader('X-File-Id', this.fileId);
		xhr.setRequestHeader('X-Start-Byte', this.startByte);
		xhr.upload.onprogress = (e) => {
			this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
		}
		console.log(`send the file, starting from ${this.startByte}`);
		const slicedFile = this.file.slice(this.startByte);

		xhr.send(slicedFile);
		//return 
		// true, if download ended successfuly
		// false, if was canceled
		// throw exception if there is an error
		return await new Promise((resolve, reject)=>{

			xhr.onload = xhr.onerror = () => {
				console.log(`upload and status ${xhr.status} text: ${xhr.statusText}`);
				if(xhr.status === 200) {
					resolve(true);
				}else{
					reject(new Error(`upload failed ${xhr.statusText}`));
				}
			}

			xhr.onabort = () => {

				console.log('aborting handler');
				resolve(false);
				// reject('request aborted');
			} 
		})
		
	}

	stop(){

		console.log('starting to abort ...');

		const uploadStated = this.xhr; 
		if(uploadStated){
			this.xhr.abort();
		}
	}

}