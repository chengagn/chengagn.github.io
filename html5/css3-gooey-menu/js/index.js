var checkbox = document.getElementById('menu-open');

var handler = document.getElementById('menu-open-handler');

var toggleInterval = setInterval(function(){
  checkbox.checked = !checkbox.checked;
}, 2000);

handler.onclick = function(){
  clearInterval(toggleInterval);
};