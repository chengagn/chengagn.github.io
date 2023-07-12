var canvas = document.getElementById('my-canvas');
var c = canvas.getContext('2d');

var width = 700;
var height = 400;

canvas.width = width;
canvas.height = height;

function barGraph(options) {
  var graphData = options.data;
  var colors = ["#f90","#888","#09f","#9f0","#a00","#90f","#0f9","#f09","#444","#0a0"];
  
  var width = options.width;
  var height = options.height;
  
  var textHeight = 15;
  
  if (options.x) {
    var xLabels = options.x.labels || null;
    var xTitle = options.x.labels || null;
  }
  
  var padding = 10;
  
  /************
  **CALCULATE**
  ************/
  // calculate max
  yMax = graphData[0][0];
  for (var i = 0; i < graphData.length; i++) {
    var dataSet = graphData[i];
    for (var j = 0; j < dataSet.length; j++) {
      var dataPoint = dataSet[j];
      yMax = yMax < dataPoint ? dataPoint : yMax;
    }
  }
  c.save();
  c.font = textHeight+"px Helvetica";
  c.textAlign = "right";
  var yLabelsMaxWidth = c.measureText(yMax).width;
  var xLabelsMaxWidth = 0;
  if (xLabels) {
    for (var i = 0; i < xLabels.length; i++) {
      var labelWidth = c.measureText(xLabels[i]).width;
      xLabelsMaxWidth = xLabelsMaxWidth > labelWidth ? xLabelsMaxWidth : labelWidth;
    }
  }
  c.restore();
  
  /************
  **  DEFINE **
  ************/
  var yLabelsWidth = yLabelsMaxWidth + padding;  
  var xOrigin = yLabelsWidth;

  var displayX = xOrigin + padding/2;
  var displayWidth = width - displayX - 3*padding/2;
  var groupSpacing = displayWidth/graphData[0].length;
  var xLabelHeight = groupSpacing > xLabelsMaxWidth ? textHeight : xLabelsMaxWidth;
  var vertical = groupSpacing > xLabelsMaxWidth ? false : true;
  var yOrigin = height - xLabelHeight - padding;

  // yLabels
  var yTickSize = getTickSize(yMax);
  var yLabelsCount = Math.ceil(yMax / yTickSize);
  var yLabelsY = yOrigin;
  var yLabelsX = xOrigin;
  var yLabelsHeight = yOrigin - 2 * padding;
  
  // xAxis    
  var xAxisY = yOrigin;
  var xAxisX = xOrigin;
  var xAxisWidth = width - padding - xAxisX;
  
  // yAxis  
  var yAxisY = yOrigin;
  var yAxisX = xOrigin;
  var yAxisHeight = yAxisY - padding;
  
  // Display
  var displayY = xAxisY;
  var displayHeight = displayY - padding - padding - padding;
  var barWidth = (groupSpacing - padding/2) / graphData.length;
  
  /************
  **  DRAW   **
  ************/
  // xLabels
  if (xLabels) {
    c.save();
    c.translate(xOrigin, yOrigin);
    
    c.font = textHeight+"px Helvetica";
    c.textAlign = vertical ? "right" : "center";
    c.textBaseline = "middle";
    for (var i = 0; i < xLabels.length; i++) {
      if (!vertical) {
        c.fillText(xLabels[i], (i+0.5)*groupSpacing, textHeight/2+padding/2);
      }
      else {
        c.save();
        
        c.translate((i+0.5)*groupSpacing, padding);
        c.rotate(3*Math.PI/2);
        c.fillText(xLabels[i], 0, 0);
        
        c.restore();
      }
    }
  
    c.restore();
  }
  // yLabels
  c.save();
  
  c.font = textHeight+"px Helvetica";
  c.textAlign = "right";
  c.textBaseline = "middle";
  
  c.translate(yLabelsX,yLabelsY);
  c.transform(-1,0,0,-1,0,0);
  c.scale(-1,1);
  
  for (var i = 0; i < yLabelsCount+1; i++) {
    var labelY = yLabelsHeight/yLabelsCount*i;
    labelY = labelY%1 === 0 ? labelY+0.5 : labelY;
    c.save();
    
    c.translate(-padding/2,labelY);
    c.scale(1,-1);
    
    c.fillText(i*yTickSize,0,0);
    
    c.restore();
    
    if (i !== 0) {
      c.beginPath();
      c.moveTo(-padding/4,labelY);
      c.lineTo(xAxisWidth+padding/4,labelY);
      c.setLineDash([3]);
      c.stroke();
    }
  }
  
  c.restore();
  
  // xAxis
  c.save();

  c.translate(xAxisX,xAxisY);
  
  c.beginPath();
  c.moveTo(0, 0.5);
  c.lineTo(xAxisWidth, 0.5);
  c.strokeStyle = "black";
  c.stroke();
  
  c.restore();
  
  // yAxis
  c.save();
  
  c.translate(yAxisX,yAxisY);
  c.transform(-1,0,0,-1,0,0);
  
  c.beginPath();
  c.moveTo(0.5, 0);
  c.lineTo(0.5, yAxisHeight);
  c.strokeStyle = "black";
  c.stroke();
  
  c.restore();
    
  // Display  
  c.save();  
  
  c.translate(displayX,displayY);
  c.transform(-1,0,0,-1,0,0);
  c.scale(-1,1);
  
  for (var i = 0; i < graphData.length; i++) {
    var set = graphData[i];
    for (var j = 0; j < set.length; j++) {
      c.beginPath();
      c.rect(j*groupSpacing + i*barWidth + 0.5,-0.5,barWidth,set[j]/yMax*displayHeight);
      c.fillStyle = colors[i%colors.length];
      c.fill();
      c.strokeStyle = "black";
      c.stroke();
    }
  }
  
  c.restore();
}
function getTickSize(highestValue) {
	var bestTickSize = 1
	var bestTickQuality = Infinity //lower is better
	var tickSeeds = [1,2,3,5]
	for (var i = -5; i<=10; i++) {
		for (var j in tickSeeds) {
			var tickSize = Math.pow(10,i)*tickSeeds[j]
			var tickQuality = Math.abs(highestValue/tickSize-5)
			if (tickQuality < bestTickQuality) {
				bestTickQuality = tickQuality
				bestTickSize = tickSize
			}
		}
	}
	return bestTickSize
}

var widthInput = $("#width");
var heightInput = $("#height");

widthInput.prop("value",width);
heightInput.prop("value",height);

widthInput.keyup(function() {
  var val = widthInput.prop("value");
  if (!isNaN(val)) {
    options.width = val;
    barGraph(options);
  }
});

var options = {
  title: "The Graph Title",
  width: width,
  height: height,
  container: $("#raphBarGraph .drop-point"),
  data: [
    [100,110,120,130,140,150,155,160,165,170],
    [90,100,110,120,130,140,150,160,170,190],
    [45,60,80,60,45,30,20,30,45,60],
    [100,110,120,130,140,150,155,160,165,170],
    [90,100,110,120,130,140,150,160,170,180],
    [45,60,80,60,45,30,20,30,45,60]
  ],
  y: {
    title: "The Y Title"
  },
  x: {
    labels: ["january","february","march","april","may","june","july","august","september","october"],
    title: "The X Title"
  },
  legend: ["Different","Sized","Legend","Items","Work","Too"]
};

$(".wrap").width(width);
function refreshBarGraph() {
  canvas.width = options.width;
  canvas.height = options.height;
  c.clearRect(0, 0, canvas.width, canvas.height);
  barGraph(options);
}
refreshBarGraph();