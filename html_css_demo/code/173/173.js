// 要操作的元素
const container=document.querySelector('.container');
const imgs=document.querySelectorAll('.container img');

// 为容器绑定鼠标移动事件
container.addEventListener('mousemove',function(e){
    // e.clientX 鼠标指针相对于窗口的水平坐标
    // window.outerWidth 窗口的外部宽度
    let percent=e.clientX/window.outerWidth;
    // 计算水平偏移量
    let offset=10*percent;
    let blur=20;

    // 遍历图片
    imgs.forEach((img,index)=>{
        offset*=1.3;
        // 计算模糊度
        let blurValue=Math.pow(index/imgs.length-percent,2)*blur;
        // 将计算好的值赋给CSS的自定义属性
        img.style.setProperty('--offset',offset+'px');
        img.style.setProperty('--blur',blurValue+'px');
    })
})