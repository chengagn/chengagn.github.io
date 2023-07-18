const fs = require("fs");
const path = require("path");

// 指定目录路径
let arr = [];
let cachedData = null; // 用于缓存数据的变量
// 获取目录的绝对路径方式
const directoryPath = path.join(__dirname);

// 获取相对于当前文件所在目录的相对路径
const relativePath = path.relative(directoryPath, "html5/img");

//D:\2023study\some-css-effects\html5 1234
console.log(directoryPath, 1234);
console.log(relativePath, 12345);
// 遍历目录
function readDirectory(callback) {
  if (cachedData) {
    // 如果已经缓存了数据，直接调用回调函数返回缓存的数据
    callback(null, cachedData);
  } else {
    console.log(directoryPath, 1897);

    fs.readdir(relativePath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log("Error getting directory information.");
        callback(err, null);
      } else {
        // 遍历目录内所有文件
        files.forEach((file) => {
          // 判断是否为子目录
          if (file.isDirectory()) {
            console.log("Directory:", file.name);
          } else {
            arr.push(file.name);
          }
        });
        console.log(arr, 89);
        // 将读取的文件名列表列表保存到缓存变量中
        //eg:[ '1.gif',   '10.gif',  '100.gif', '101.gif', '102.gif', '103.gif']
        callback(null, arr);
      }
    });
  }
}
// 当前页面直接调用方式;
readDirectory(() => {});
setTimeout(() => {
  console.log(arr, 998);
  const myVarPath = path.join(__dirname, "myVar3.js");
  let myVarStr = "let arr=" + JSON.stringify(arr);
  // 将字符串写入到文件中
  fs.writeFile(myVarPath, myVarStr, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("变量已成功保存到本地文件！");
  });
}, 8000);

// module.exports = {
//   cachedData: readDirectory,
// };
exports.cachedData = readDirectory;
// exports.pathName = pathName;
