const user={
    name:'yang'
}



const result=`<h2>${user.name}</h2>`;
const vm=require('vm');

console.log(vm.runInNewContext('`<h2>${user.name}</h2>`',{user}));
