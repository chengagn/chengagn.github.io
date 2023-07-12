// 获取按钮
const buttons=document.querySelectorAll('.button');

// 循环为每一个按钮绑定鼠标移动事件
buttons.forEach((button)=>{
    button.addEventListener('mousemove',(e)=>{
        // 获取鼠标的x、y坐标
        const x=e.offsetX;
        const y=e.offsetY;
        // 将x、y坐标赋值给CSS中的自定义变量--x、--y
        button.style.setProperty('--x',`${x}px`);
        button.style.setProperty('--y',`${y}px`);
    })
})