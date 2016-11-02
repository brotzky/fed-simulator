const testFolder = './src/imgs/wrestlers/';
const fs = require('fs');
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})
