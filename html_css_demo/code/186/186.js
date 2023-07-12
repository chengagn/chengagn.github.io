const picker=document.querySelector('.picker'),
      wrapper=document.querySelector('.wrapper');

// 事件处理
function eventHandler(e){
    e.bubbles=false;    //默认跳过冒泡
    let event=null,
        tmp=null;
    // 判断事件类型
    switch(e.type){
        case 'mousedown':
            // 创建自定义事件 slidestart
            event=new CustomEvent('slidestart');
            tmp='screenY' in e ? e : e.touches[0];
            break;
        case 'mousemove':
            // 创建自定义事件 sliding
            event=new CustomEvent('sliding');
            tmp='screenY' in e ? e : e.touches[0];
            break;
        case 'mouseup':
            // 创建自定义事件 slideend
            event=new CustomEvent('slideend');
            tmp='screenY' in e ? e : e.touches[0];
            break;
    }
    // 初始化自定义事件
    event.y=tmp.screenY;
    event.original=e;
    // 触发自定义事件
    this.dispatchEvent(event);
}

let startY=0, moveY=0, disY=0, dragable=false, times=0;
let length=picker.querySelectorAll('li').length;
// 绑定自定义事件
picker.parentElement.addEventListener('slidestart',function({y}){
    dragable=true;
    startY=y;
    picker.classList.remove('transition');
    wrapper.classList.remove('transition');
    this.classList.add('grabbing');
})
document.addEventListener('sliding',function({y}){
    if(!dragable) return;
    moveY=y;
    disY=moveY-startY;
    let value=picker.style.getPropertyValue('--top')*1;
    value+=disY+(Math.abs(disY)>=0.5?times:1);
    let num=-value/60;
    picker.style.setProperty('--top',value);
    wrapper.style.setProperty('--num',num);
    startY=moveY;
})
document.addEventListener('slideend',function({y}){
    if(!dragable) return;
    moveY=y;
    const maxTop=(length-3)*60;
    disY=moveY-startY;
    let value=picker.style.getPropertyValue('--top')*1;
    value+=disY;
    picker.classList.add('transition');
    wrapper.classList.add('transition');
    value=Math.min(120,Math.max(-maxTop,Math.round(value/60)*60));
    picker.style.setProperty('--top',value);
    wrapper.style.setProperty('--num',Math.round(-value/60));
    picker.parentElement.classList.remove('grabbing');
    startY=moveY;
    dragable=false;
})

// 把鼠标事件与自定义事件进行关联
picker.parentElement.addEventListener('mousedown',eventHandler);
document.addEventListener('mousemove',eventHandler);
document.addEventListener('mouseup',eventHandler);