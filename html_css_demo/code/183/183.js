// 要操作的元素
const bee=document.querySelector('.bee');
// 记录最后的x坐标（用于判断蜜蜂的朝向）
let last_x=0;

// 鼠标移动事件
window.addEventListener('mousemove',function(e){
    let x=e.clientX-15;
    let y=e.clientY-15;
    bee.style.left=x+'px';
    bee.style.top=y+'px';
    if(last_x<x){
        // 朝右
        bee.classList.add('flip');
    }else{
        // 朝左
        bee.classList.remove('flip');
    }
    // 更新last_x
    last_x=x;
})