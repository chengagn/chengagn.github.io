var slider = document.getElementById("myRange");
var box = document.getElementById("box");
var shadowInfo = document.getElementById("shadow-info");

slider.oninput = function() {
  
  var v = this.value;
  
  var largeShadow = `0 ${(v/3).toFixed(0)}px ${v}px rgba(0, 0, 0, ${(.5 - (v/ 500)).toFixed(2)})`;
  var smallShadow = `0 ${(v/1.5).toFixed(0)}px ${(v*1.5).toFixed(0)}px rgba(0, 0, 0, ${(.5 - (v/ 50)).toFixed(2)})`;
  
  var shadow = largeShadow + ", " + smallShadow;
  
  if( (.5 - (v/ 50)).toFixed(2) <= 0 ){
    shadow = largeShadow;
  }
  
  box.style.boxShadow = shadow;
  shadowInfo.innerText = shadow;
  
}