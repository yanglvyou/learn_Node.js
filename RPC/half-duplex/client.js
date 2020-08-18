const net = require('net');
const socket = new net.Socket({});

socket.connect({
	host: '127.0.0.1',
	port: 4000,
});

// socket.write('hello RPC')

const lessonids = [
	'136797',
	'136798',
	'136799',
	'136800',
	'136801',
	'136803',
	'136804',
	'136806',
	'136807',
	'136808',
	'136809',
	'141994',
	'143517',
	'143557',
	'143564',
	'143644',
	'146470',
	'146569',
	'146582',
];

let id = Math.floor(Math.random() * lessonids.length);

socket.on('data', (buffer) => {
	//服务端返回
	const seqBuffer = buffer.slice(0, 2);
	const titleBuffer = buffer.slice(2);
    id = Math.floor(Math.random() * lessonids.length);
    console.log(seqBuffer.readInt16BE(),titleBuffer.toString(),9999);
    socket.write(encode(id));
});

let seq = 0;

function encode(index) {
	let buffer = Buffer.alloc(6);
	buffer.writeInt16BE(seq++);
	buffer.writeInt32BE(lessonids[index], 2);

	return buffer;
}

socket.write(encode(id));
