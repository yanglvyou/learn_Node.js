const playerAction = process.argv[process.argv.length - 1];
const game=require('./lib');
// const result=game(playerAction);
// console.log('result: ', result);
let count=0;

process.stdin.on('data',e=>{
    const playerAction=e.toString().trim();
    // console.log('playerAction: ', playerAction);
    const result=game(playerAction);
    console.log('result: ', result);
    if(result === -1){
        count++
    }
    if(count===3){
        console.log('老子不玩啦');
        process.exit();
    }
})