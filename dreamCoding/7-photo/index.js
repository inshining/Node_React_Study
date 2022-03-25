const fs = require('fs');
const path = require('path');
const os = require('os');

const myArgs = process.argv[2];

console.log(path.join(process.cwd(), pathName));

const toDir = path.join(os.homedir, pathName);
const fileTypes = ['capture', 'duplicated', 'video'];

for (let i; i < fileTypes.length; i++){
    const dirName = path.join(toDir, fileTypes[i]);
    if (!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
    }
}
console.log(toDir);
fs.readdir(toDir, function(err, filelist) {
    if (err) {
        throw err;
    }
    
    for (let j =0; j < filelist.length; j++) {
        const exname = path.extname(filelist[j]);
        const E_IMG= filelist[j].slice(0,4) +"E" + filelist[j].slice(4,);
    
        if ((exname === '.png') || (exname === '.aae')){
            fs.rename(filelist[j], path.join(fileTypes[0], filelist[j]));
        } else if(filelist.indexOf(E_IMG) >= 0){
            fs.rename(filelist[j], path.join(fileTypes[1], filelist[j]));
        }
        else if ((path.extname(filelist[j]) === '.mov') || (path.extname(filelist[j]) === '.mp4')){
            fs.rename(filelist[j], path.join(fileTypes[2], filelist[j]))
        } 
    }
})
