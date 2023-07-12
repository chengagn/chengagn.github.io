new Vue({
    el: '.container',
    data: {
        message: ''
    },
    watch: {
        // 监听输入框的文字变化，来实现输入框的颤动效果
        message: {
            handler: function(newVal, oldVal){
                // 如果文字有变化
                if(newVal.length > oldVal.length){
                    setTimeout(() => {
                        document.querySelector('.input-box').classList.add('shake');
                        setTimeout(() => {
                            document.querySelector('.input-box').classList.remove('shake');
                        }, 300);
                    }, 200);
                }
            }
        }
    },
    computed: {
        message2: function(){
            // 把输入的内容拆分为单字
            return this.message.split('');
        }
    }
})