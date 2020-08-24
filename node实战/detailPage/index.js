const mount = require('koa-mount');
const static = require('koa-static');
const app = new (require('koa'))();
const template = require('./template/index');
const detailTemplate=template(__dirname+'/template/index.html');

app.use(mount('/static', static(`${__dirname}/source/static/`)));



app.use(async (ctx) => {
	const result = new Promise((res, rej) => {
		const rpcClient = require('./client');
		rpcClient.write(
			{
				columnid: ctx.query.columnid,
			},
			function (err, data) {
                err? rej(err):res(data);
				console.log(err, data);
			}
		);
    });
    ctx.status = 200;
    
    ctx.body = detailTemplate(result);
});

app.listen(3000);
