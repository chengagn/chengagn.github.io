// 要操作的元素
const audio=document.querySelector('audio');
const cvs=document.querySelector('canvas');
const ctx=cvs.getContext('2d');

// 初始化画布
function initCvs(){
    cvs.width=window.innerWidth * devicePixelRatio;
    cvs.height=(window.innerHeight / 2) * devicePixelRatio;
}

initCvs();


// 是否已初始化
let isInit=false;
// 数组，用于接收分析器节点的分析数据
let dataArray;
// 分析器节点
let analyser;
// 音频播放事件
audio.onplay=function(){
    // 判断是否初始化
    if(isInit){
        return;
    }

    // 开始初始化
    // 创建音频上下文
    const audioCtx=new AudioContext();
    // 创建音频源节点
    const source=audioCtx.createMediaElementSource(audio);
    // 创建分析器节点
    analyser=audioCtx.createAnalyser();
    analyser.fftSize=512;
    // 接收分析器节点的分析数据
    dataArray=new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    // 已初始化
    isInit=true;
}

// 把分析出来的波形绘制到canvas上
function draw(){
    // 逐帧绘制
    requestAnimationFrame(draw);

    // 接下来清空画布
    const { width, height } = cvs;
    ctx.clearRect(0,0,width,height);
    if(!isInit){
        return;
    }
    // 让分析器节点分析出数据到数组中
    analyser.getByteFrequencyData(dataArray);
    const len=dataArray.length / 2; //条的数量，取一半，前半部分（低频范围就好，高频部分人耳几乎听不到，看不到波形）
    const barWidth=width / len / 2; //条的宽度
    ctx.fillStyle='#e0f9b5';
    // 循环绘制
    for(let i=0;i<len;i++){
        const data=dataArray[i];
        const barHeight=(data / 255) * height; //条的高度
        const x1=i * barWidth + width / 2; //右边区域中条的x坐标
        const x2=width / 2 - (i + 1) * barWidth; //左边区域中条的x坐标 镜像
        const y=height - barHeight; //条的y坐标
        ctx.fillRect(x1,y,barWidth - 2,barHeight); //填充右边区域
        ctx.fillRect(x2,y,barWidth - 2,barHeight); //填充左边区域
    }
}

draw();