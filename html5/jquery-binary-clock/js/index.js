
function convert(num){
  var bin = "";
  var conv = [];

  while(num>0) {
      bin = num%2 + bin;
      num = Math.floor(num/2);
  }
  conv = bin.split("");
  while(conv.length < 6){
	  conv.unshift("0");
  }
  return conv;
}



window.setInterval(function(){
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
  
    var time= addZero(h) + " : " + addZero(m) + " : " + addZero(s);
  
    $('p').text(time);

    var binaryArray = convert(s);
    lightSeconds(binaryArray);
    
    var binaryArray = convert(m);
    lightMinutes(binaryArray);
  
     var binaryArray = convert(h);
    lightHours(binaryArray);
  
}, 1000);

function lightSeconds(array){
    $('.seconds td').attr('class','num0');
  for(var i =0; i<array.length; i++){
    $('.seconds td:eq('+i+')').attr('class','num'+array[i]);
  }
}

function lightMinutes(array){
    $('.minutes td').attr('class','num0');
  for(var i =0; i<array.length; i++){
    $('.minutes td:eq('+i+')').attr('class','num'+array[i]);
  }
}

function lightHours(array){
    $('.hours td').attr('class','num0');
  for(var i =0; i<array.length; i++){
    $('.hours td:eq('+i+')').attr('class','num'+array[i]);
  }
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}