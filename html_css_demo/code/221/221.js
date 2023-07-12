// 容器
const container=document.querySelector('.container');

// 获取当前坐标
function getCursorPosition(event,rect,divider=20){
    const x=event.clientX - rect.left;
    const y=event.clientY - rect.top;
    const res={
        x:(x - rect.width / 2) / divider,
        y:(y - rect.height / 2) / divider
    };
    return res;
}

// 根据日期计算获取数字
function getNumbersFromDate(){
    const startDate=new Date(); //存储初始日期

    function updateNumbers(){
        const currentDate=new Date();
        const timeDiff=currentDate - startDate;

        // 根据时差计算出数字
        const number1=Math.sin(timeDiff / 400);
        const number2=Math.cos(timeDiff / 400);

        // 将数字作为对象返回
        return {
            number1,
            number2
        }
    }

    // 更新坐标
    function updateElementPosition(x,y){
        container.style.setProperty('--x',x);
        container.style.setProperty('--y',y);
    }

    // 绘制动画
    function animationLoop(){
        // 判断当前DOM节点是否能完全匹配对应的CSS的hover选择器
        const isHovered=container.matches(':hover');
        const rect=container.getBoundingClientRect();

        if(isHovered){
            // 鼠标移入
            // 绑定指针移动事件
            document.body.addEventListener('pointermove',(event)=>{
                const cursorPosition=getCursorPosition(event,rect);
                // 更新坐标
                updateElementPosition(cursorPosition.x,cursorPosition.y);
            })
        }else{
            // 鼠标移出，初始化坐标
            const numbers=updateNumbers();
            updateElementPosition(numbers.number1 * 10,numbers.number2 * 10);
        }
        // 逐帧绘制
        requestAnimationFrame(animationLoop);
    }
    animationLoop();
}

getNumbersFromDate();