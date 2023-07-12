// 要操作的元素
const container=document.querySelector('.container');

// 循环生成p元素，置于.container中
function build(){
    let str='<div class="shape"></div>';
    for(let i=0;i<50;i++){
        str+=`<p style="--offset:${r(50,100)};">
            ${generateText()}
        </p>`;
    }
    container.innerHTML=str;
}

// 获取指定范围内的随机数
function r(from, to){
    return Math.random() * (to - from + 1) + from;
}

// 循环生成数字，置于span中
function generateText(){
    let str='';
    for(let i=0;i<100;i++){
        str+=`<span>${getRandomNumber()}</span>`;
    }
    return str;
}

// 获取随机数字
function getRandomNumber(){
    const str='0123456789';
    return str[Math.floor(Math.random() * str.length)];
}

build();
// 加个点击容器重新生成
container.addEventListener('click',build);