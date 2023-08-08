const express = require("express");
const { exec } = require("child_process");
// 在处理POST请求时，通常需要使用body-parser或类似的中间件来解析请求体中的参数。确保你在Node.js服务器中正确地配置和使用了这些中间件。
const bodyParser = require("body-parser");
const app = express();
// 允许所有来源访问该服务器
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
// 解析 application/json 类型的请求体
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded 类型的请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/execute-command", (req, res) => {
  console.log(req);
  // 执行 Node.js 命令
  exec("node  myVar.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`执行命令时发生错误：${error.message}`);
      return res.status(500).json({ error: "执行命令时发生错误" });
    }
    if (stderr) {
      console.error(`命令输出错误：${stderr}`);
      return res.status(500).json({ error: "命令输出错误" });
    }
    console.log(`命令输出结果：${stdout}`);
    res.json({ output: stdout });
  });
});
app.post("/execute-command", async (req, res) => {
  // Extract parameters from the request body or query string
  console.log(req.body, "req");
  const param1 = req.body.param1;

  // Process the parameters as needed
  console.log(param1);
  exec(`node  ${param1}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行命令时发生错误：${error.message}`);
      return res.status(500).json({ error: "执行命令时发生错误" });
    }
    if (stderr) {
      console.error(`命令输出错误：${stderr}`);
      return res.status(500).json({ error: "命令输出错误" });
    }
    console.log(`命令输出结果：${stdout}`);
    res.json({ output: stdout });
  });
  // Send a response back to the client
  // res.send('POST request received');
});
app.listen(3000, () => {
  console.log("服务器已启动，监听端口 3000");
});
