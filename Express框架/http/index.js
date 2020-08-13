const fs = require('fs');
const game = require('./game');
const express = require('express');

// 玩家胜利次数超过三次后续服务器的请求返回500
var playerWinCount = 0;
// 玩家的上一次游戏动作
var lastPlayerAction = null;
// 玩家连续出同一个动作的次数
var sameCount = 0;

const app = express();

app.get('/favicon.ico', function (req, res) {
	// 一句 status(200) 代替 writeHead(200); end();
	res.status(200);
	return;
});


app.get('/game',
  function(req,res,next){
	  if(playerWinCount>=3||sameCount===9){
		  res.status(500);
		  res.send('我不玩了');
		  return;
	  }

	  // 通过next执行后续中间价
	  next();

	  //当中间件执行完后，会执行到这个位置
	  if(res.playerWon){
		playerWinCount++;
	  }
  },
  function(req,res,next){
	  // express自动帮我们把query处理好挂在request上
	  const query=req.query;
	  const playerAction=query.action;
	  
	  if(!playerAction){
		  res.status(400);
		  res.send();
		  return;
	  }

	  if(lastPlayerAction===playerAction){
		  sameCount++;
		  if(sameCount>=3){
			  res.status(400);
			  res.send('你作弊,我不玩了');
			  sameCount=9;
			  return;
		  }
	  }else{
		  sameCount=0;
	  }

	  lastPlayerAction=playerAction;

	  // 把用户操作挂在response上传递给下一个中间件

	  res.playerAction=playerAction;
	  next();

  },
  function(req,res){
	  const playerAction=res.playerAction;
	  const result=game(playerAction);

	  res.status(200);
	  if(result===0){
		  res.send('平局');
	  }else if(result===-1){
		  res.send('你输了');
	  }else{
		  res.send('你赢了');
		  res.playerWon=true;
	  }
  }
)


app.get('/',function(req,res){
	res.send(
		fs.readFileSync(__dirname+'/index.html','utf-8')
	)
})

app.listen(3001);