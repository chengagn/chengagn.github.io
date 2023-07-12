// 要操作的元素
const list=document.querySelector('.list'),
      item=document.querySelectorAll('.list-item');

// 判断当前拖动的是哪个元素
let source_node;

// 开始拖动的事件
list.ondragstart=e=>{
    // 获取当前拖动的元素
    source_node=e.target;
    // 记录起始位置
    record(item);
    // 添加moving样式
    setTimeout(() => {
        e.target.classList.add('moving');
    }, 0);
    // 设置被拖动元素允许移动到新的位置
    e.dataTransfer.effectAllowed='move';
}

// 在元素正在拖动到放置目标时触发
list.ondragover=e=>{
    e.preventDefault();
}

// 拖动进行中的事件
list.ondragenter=e=>{
    e.preventDefault();
    // 拖回到原来的位置，就什么也不做
    if(e.target===list || e.target===source_node){
        return false;
    }
    // 获取.list的所有子元素
    const children=Array.from(list.children);
    // 当前劫持元素的索引值
    const sourceIndex=children.indexOf(source_node);
    // 覆盖到谁上面的索引值
    const targetIndex=children.indexOf(e.target);
    if(sourceIndex<targetIndex){
        // insertBefore(要插入的节点，在谁前面)
        // 从下向上拖动
        list.insertBefore(source_node,e.target.nextElementSibling);
    }else{
        // 从上向下拖动
        list.insertBefore(source_node,e.target);
    }
    // 传入改变位置的两个元素，比较差异，执行动画
    last([e.target,source_node]);
}

// 拖动结束时取消虚线
list.ondragend=e=>{
    e.target.classList.remove('moving');
}

// 记录起始位置
function record(eleAll){
    for(let i=0;i<eleAll.length;i++){
        const {top,left}=eleAll[i].getBoundingClientRect();
        eleAll[i]._top=top;
        eleAll[i]._left=left;
    }
}

// 记录最后的位置，并执行动画
function last(eleAll){
    for(let i=0;i<eleAll.length;i++){
        const dom=eleAll[i];
        const {top,left}=dom.getBoundingClientRect();
        if(dom._left){
            dom.style.transform=`translate3d(${dom._left-left}px,${dom._top-top}px,0px)`;
            let rafId=requestAnimationFrame(function(){
                dom.style.transition='transform 0.3s ease-out';
                dom.style.transform='none';
            })
            dom.addEventListener('transitionend',()=>{
                dom.style.transition='none';
                cancelAnimationFrame(rafId);
            })
        }
    }
}