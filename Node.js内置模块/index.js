const EventEmitter = require('events').EventEmitter;

class Geektime extends EventEmitter {
	constructor() {
		super();
		setInterval(() => {
			this.emit('newLesson', { price: Math.random() * 100 });
		}, 1000);
	}
}
const geektime=new Geektime();

geektime.addListener('newLesson',(res)=>{
    console.log('上新课: ', res);
    
})
