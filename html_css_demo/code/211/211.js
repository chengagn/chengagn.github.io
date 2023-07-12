// 拼音库
const {pinyin}=pinyinPro;
// 要操作的元素
const ipt=document.querySelector('.ipt');
const val=document.querySelector('.val');

setPinYin();

// 设置拼音
function setPinYin(){
    val.innerHTML="";
    let value=ipt.value;
    let arr=value.split('');
    arr.forEach(item=>{
        val.innerHTML+=`<ruby>${item}<rt>${pinyin(item)}</rt></ruby>`;
    })
}

let flag=false;
// 输入框输入事件
ipt.addEventListener('input',()=>{
    // 判断是否输入完毕（拼写汉字时会触发input事件，加此判断避免）
    if(!flag){
        setPinYin();
    }
})
// 以下代码避免了拼写汉字时触发input事件
ipt.addEventListener('compositionstart',()=>{
    flag=true;
})
ipt.addEventListener('compositionend',()=>{
    flag=false;
    setPinYin();
})