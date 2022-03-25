const path = require('path');
const os = require('os');
const fs = require('fs');

const folder = process.argv[2];
const workingDir = path.join(process.cwd(), folder);
console.log(workingDir);

if (!workingDir || !fs.existsSync(workingDir)) {
    console.error("Please enter folder name");
}

const caturedDir = path.join(workingDir, 'capturedDir');
const duplicatedDir = path.join(workingDir, 'duplicatedDir'); 
const videoDir = path.join(workingDir, 'videoDir');

!fs.existsSync(caturedDir) && fs.mkdirSync(caturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);

fs.promises
.readdir(workingDir)
.then(mvDirFile)
.catch(console.log);

function mvDirFile(filelist) {
    for (let j =0; j < filelist.length; j++) {
        const exname = path.extname(filelist[j]);
        const E_IMG= filelist[j].slice(0,4) +"E" + filelist[j].slice(4,);
    
        if ((exname === '.png') || (exname === '.aae')){
            fs.rename(filelist[j], path.join(caturedDir, filelist[j]));
        } else if(filelist.indexOf(E_IMG) >= 0){
            fs.rename(filelist[j], path.join(duplicatedDir, filelist[j]));
        }
        else if ((path.extname(filelist[j]) === '.mov') || (path.extname(filelist[j]) === '.mp4')){
            fs.rename(filelist[j], path.join(videoDir, filelist[j]))
        } 
    }
}