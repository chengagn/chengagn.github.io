const fs = require("fs");
const path = require("path");
// Cheerio 是一个快速、灵活和简洁的服务器端 jQuery 实现，可以在 Node.js 中像操作 jQuery 一样操作 HTML 文档。它使得解析、遍历和操作 HTML 文档变得更加方便。
const cheerio = require("cheerio");
// Puppeteer 是一个由 Google Chrome 团队开发的 Node.js 库，它提供了一组用于控制和操作 Headless Chrome 或 Chrome 浏览器的工具。Headless Chrome 是没有图形用户界面的 Chrome 浏览器，可以在后台运行并提供与传统浏览器相同的功能。
// 使用 Puppeteer，你可以编写脚本来自动化控制 Chrome 浏览器的行为，例如导航到网页、填写表单、点击按钮、截取网页截图等等。Puppeteer 还提供了丰富的 API，可以用于处理 DOM、执行 JavaScript 代码等。
// 要使用 Puppeteer，首先需要在项目中安装它。可以使用 npm 命令进行安装：
// 需要node nvm use 20.2.0
// bug callPuppeteer.args ??= new Map();
const puppeteer = require("puppeteer");
//gifencoder
//需要node 14.16.1 npm install canvas --canvas_binary_host_mirror=https://registry.npmmirror.com/-/binary/canvas
const { createCanvas, Image } = require("canvas");
// GIFEncoder 是一个用于创建 GIF 动画的 JavaScript 库。它提供了一组功能强大的 API，可以让你通过 JavaScript 代码生成和控制 GIF 动画的各个方面，例如帧、帧延迟、尺寸、颜色表等等。
// 需要node 14.16.1
const GIFEncoder = require("gifencoder");
// 指定目录路径
const directoryPath = path.join(__dirname, "html5");
// 获取相对于当前文件所在目录的相对路径 eg
// const relativePath = path.relative(directoryPath, "html5");
const imgpath = path.join(__dirname, "img");
let myVar = require("./myVar.js");
console.log(myVar, "arr");
// 调用并使用缓存的数据
let arrPath = [];
let cachedData = require("./getpath.js").cachedData;
cachedData((err, files) => {
  if (err) {
    console.error(err);
  } else {
    arrPath = files;
    // console.log(arrPath, 890);
  }
});

let arr = [];
// 遍历目录
fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log("Error getting directory information.");
  } else {
    // 遍历目录内所有文件
    files.forEach(async (file, index) => {
      // 判断是否为子目录 暂时没用到
      if (file.isDirectory()) {
        // 子目录名
        const subDirectoryPath = path.join(directoryPath, file.name);
        // file是一个对象  { name: 'jquery-rad-dropdown-menu', [Symbol(type)]: 2 }

        // 遍历子目录内的所有文件
        fs.readdir(
          subDirectoryPath,
          { withFileTypes: true },
          (err, subFiles) => {
            if (err) {
              console.log("Error getting sub directory information.");
            } else {
              // 遍历子目录内所有html文件

              subFiles.map(async (subFile) => {
                if (index < 600 || index > 700) {
                  return false;
                }
                // console.log(subFile.name, subFile, file.name, 124);
                // return false;
                if (path.extname(subFile.name) === ".html") {
                  const filePath = path.join(subDirectoryPath, subFile.name);
                  let names = path.basename(subFile.name, ".html");
                  const htmlContent = fs.readFileSync(filePath, "utf-8");
                  const $ = cheerio.load(htmlContent);
                  const title = $("title").text();
                  // console.log("File:", subFile, " - Title:", title);
                  // 生成了gif的不再创建
                  const url = `${filePath}`;
                  const filename = `html5/img/${file.name}.gif`;

                  // let flag = arrPath?.some((it) => {
                  //   return it.indexOf(`${names}.gif`) > -1;
                  // });

                  // if (flag) {
                  //   return true;
                  // } else {
                  // }
                  let browser = null;
                  try {
                    await (async () => {
                      const width = 800;
                      const height = 600;
                      const frames = 20;
                      const delay = 200;
                      // launch a new headless browser 启动浏览器实例
                      browser = await puppeteer.launch();
                      // 创建新页面
                      const page = await browser.newPage();
                      // set the viewport size
                      await page.setViewport({ width, height });

                      // navigate to the webpage  // 导航到指定网页
                      console.log(url, 89);
                      await page.goto(url, { waitUntil: "networkidle2" });
                      // create a new canvas
                      const canvas = createCanvas(width, height);
                      const ctx = canvas.getContext("2d");

                      // create a new GIF encoder
                      const encoder = new GIFEncoder(width, height);
                      encoder
                        .createReadStream()
                        .pipe(fs.createWriteStream(filename));

                      encoder.start();
                      // 0 表示无限循环
                      encoder.setRepeat(-1);
                      // 帧延迟为 500ms
                      encoder.setDelay(delay);

                      // draw the frames
                      for (let i = 0; i < frames; i++) {
                        // render the page and copy the screenshot onto the canvas
                        const screenshot = await page.screenshot();
                        const img = new Image();
                        img.src = screenshot;
                        ctx.drawImage(img, 0, 0);
                        // add the frame to the GIF // 将帧添加到 GIF 动画中
                        encoder.addFrame(ctx);
                      }
                      encoder.finish();
                      console.log(`GIF saved as ${filename}`);

                      await browser.close();
                    })();
                  } catch (error) {
                    browser && (await browser?.close());
                    console.log(browser, 12);
                    console.log(error);
                  } finally {
                    browser && (await browser?.close());
                  }

                  // arr.push({
                  //   href: filePath,
                  //   text: title,
                  //   img: `html5/img/html5${index}.gif`,
                  // });
                }
              });
            }
          },
        );
      } else {
        // 文件后缀获取方式
        if (path.extname(file.name) === ".html") {
          const filePath = path.join(directoryPath, file.name);
          let names = path.basename(file.name, ".html");
          const htmlContent = fs.readFileSync(filePath, "utf-8");
          if (index < 0) {
            //创建png 图片
            console.log(directoryPath, file.name);
            // 启动浏览器实例
            const browser = await puppeteer.launch();
            // 创建新页面
            const page = await browser.newPage();
            await page.setContent(htmlContent); // 将HTML内容设置到page中
            await page.setViewport({ width: 800, height: 600 }); // 设置视口大小
            // 截取网页截图
            const buffer = await page.screenshot({
              path: `${imgpath}/image${index}.png`,
            }); // 生成截图，并保存到本地
            fs.writeFileSync(`img/image${index}.png`, buffer); // 将buffer写入文件
            await browser.close();
          } else if (index < 0) {
            //自己添加的条件
            //创建gif 图片

            console.log(`${filePath} `);
            const url = `${filePath}`;
            const filename = `${names}.gif`;

            // 生成了gif的不再创建
            let flag = arrPath?.some((it) => {
              return it.indexOf(`${names}.gif`) > -1;
            });
            console.log(flag, filename, 111);
            if (flag) {
              return true;
            } else {
            }

            (async () => {
              const width = 800;
              const height = 600;
              const frames = 20;
              const delay = 200;
              // launch a new headless browser 启动浏览器实例
              const browser = await puppeteer.launch();
              // 创建新页面
              const page = await browser.newPage();

              // set the viewport size
              await page.setViewport({ width, height });

              // navigate to the webpage  // 导航到指定网页
              await page.goto(url, { waitUntil: "networkidle2" });
              // create a new canvas
              const canvas = createCanvas(width, height);
              const ctx = canvas.getContext("2d");

              // create a new GIF encoder
              const encoder = new GIFEncoder(width, height);
              encoder.createReadStream().pipe(fs.createWriteStream(filename));

              encoder.start();
              // 0 表示无限循环
              encoder.setRepeat(-1);
              // 帧延迟为 500ms
              encoder.setDelay(delay);

              // draw the frames
              for (let i = 0; i < frames; i++) {
                // render the page and copy the screenshot onto the canvas
                const screenshot = await page.screenshot();
                const img = new Image();
                img.src = screenshot;
                ctx.drawImage(img, 0, 0);
                // add the frame to the GIF // 将帧添加到 GIF 动画中
                encoder.addFrame(ctx);
              }
              encoder.finish();
              console.log(`GIF saved as ${filename}`);

              await browser.close();
            })();
          }
          const $ = cheerio.load(htmlContent);
          const title = $("title").text();
          arr.push({
            href: filePath,
            text: title,
            img: names + ".gif",
          });
        }
      }
    });
    // setTimeout(() => {
    //   console.log(arr, 998);
    //   const myVarPath = path.join(__dirname, "myVar.js");
    //   let myVarStr = "let arr=" + JSON.stringify(arr);
    //   // 将字符串写入到文件中
    //   fs.writeFile(myVarPath, myVarStr, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log("变量已成功保存到本地文件！");
    //   });
    // }, 8000);
  }
});
