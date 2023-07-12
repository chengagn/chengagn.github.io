// 要操作的画布
const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');

// 用于记录鼠标的位置
const p={
    x:0, //x坐标
    y:0, //y坐标
    r:50 //圆的半径
}

// 渲染画布
function render(){
    canvas.width=document.documentElement.clientWidth;
    canvas.height=document.documentElement.clientHeight;
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // 创建一条放射颜色渐变（渐变圆）
    var radial=ctx.createRadialGradient(p.x,p.y,p.r,p.x,p.y,p.r*3);
    // 开始点颜色
    radial.addColorStop(0,'rgba(255,255,255,0)');
    // 结束点颜色
    radial.addColorStop(1,'rgba(0,0,0,0.75)');
    // 填充样式
    ctx.fillStyle=radial;
    // 绘制矩形
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

// 鼠标移动事件
document.onmousemove=e=>{
    p.x=e.clientX;
    p.y=e.clientY;
    render();
}

// 窗口尺寸改变时重新渲染
window.onresize=()=>{
    render();
}

// 开始渲染画布
render();