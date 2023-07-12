function byId(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}

var index = 0,
	timer = null,
	pics = byId("banner").getElementsByTagName("div"),
	dots = byId("dots").getElementsByTagName("span"),
	prev = byId("prev"),
	next = byId("next"),
 	len = pics.length,
 	menu = byId("menu-contern"),
 	subMenu = byId("sub-menu"),
 	innerBox = subMenu.getElementsByClassName("inner-box"),
 	menuItems = menu.getElementsByClassName("menu-item"); 

function slideImg(){
	var main = byId("main");
	main.onmouseover = function(){
		//清除定时器
		if(timer) clearInterval(timer);
	}
	main.onmouseout = function(){
		timer = setInterval(function(){
			index++;
			if(index >= len){
				index = 0;				
			}
			changeImg();
		},3000);
	}
	//自动触发
	main.onmouseout();
	//遍历   绑定事件    点击圆点切换图片
	for(var d=0;d<len;d++){
		dots[d].id = d;
		dots[d].onclick = function(){
			//改变index为span的ID值
			 index = this.id;
			 
			 //调用changeimg
			 changeImg();
		}
		
	}
	//下一张
	next.onclick = function(){
		index++;
		if(index >= len)  index=0;
		changeImg();		
	}
	//上一张
	prev.onclick = function(){
		index--;
		if(index < 0) index=len-1;
		changeImg();
	}
	//导航菜单
	//遍历主菜单 绑定时间
	for(var m=0;m<menuItems.length;m++){
		menuItems[m].setAttribute("data-index",m);
		
		menuItems[m].onmouseover = function(){
			subMenu.className = "sub-menu"; 
			//给每个menu-itemd定义data-index属性作为索引
			var idx = this.getAttribute("data-index");
			//遍历子菜单  说有隐藏
			for(var j=0;j<innerBox.length;j++){
				innerBox[j].style.display = 'none';
				menuItems[j].style.background = 'none';
			}
			menuItems[idx].style.background = 'rgba(0,0,0,0.1)';
			innerBox[idx].style.display = 'block';
			
		}
	}
	menu.onmouseout = function(){
		subMenu.className = "sub-menu hide";
	}
	subMenu.onmouseover = function(){
		this.className = "sub-menu";
	}
	subMenu.onmouseout = function(){
		this.className = "sub-menu hide";
	}
}
//切换图片
function changeImg(){
	//遍历DIV  隐藏
	for(var i=0;i<len;i++){
		pics[i].style.display = 'none';
		dots[i].className = "";
	}
	pics[index].style.display = 'block';
	dots[index].className = "active";
}
slideImg();