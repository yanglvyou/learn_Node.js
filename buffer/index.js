const buffer=Buffer.from('geekbang');


const buffer2=Buffer.from([1,2,3,4]);


const buffer3=Buffer.alloc(20);

buffer2.writeInt16LE(512,2)

console.log('buffer: ', buffer);
console.log('buffer2: ', buffer2);
console.log('buffer3: ', buffer3);


const fs=require('fs');
const protocol=require('protocol-buffers');
const schema=protocol(fs.readFileSync(__dirname+'/test.proto'));
console.log('schema: ', schema);

const buffer4=schema.Column.encode({
    id:1,
    name:'Node.js',
    price:80.4
})
console.log(buffer4,3333333,schema.Column.decode(buffer4));
