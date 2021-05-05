const fs = require('fs');

function isFileOrDirectory(path) {
    let pathStats;
    try {
        pathStats = fs.statSync(path);
    } catch (error) {
        //console.log(error);
        return "Object does not exist";
    }

    if (pathStats.isDirectory()) {
        return "Directory";
    } else {
        console.log(fs.readFileSync(path, 'utf-8'));
        return "File";
    }
}

console.log(isFileOrDirectory("mock.txt"));
console.log(isFileOrDirectory("test"));
console.log(isFileOrDirectory("sdgsdgsdg.txt"));

module.exports.isFileOrDirectory = isFileOrDirectory;