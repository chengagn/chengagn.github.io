var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rid = null;
var spring = 0.1;
var friction = 0.7;

var centers = {
  rNo: 122.857,
  rMaybe: 82.758,
  rYes: 42.658
};

var pathsTriptych = function () {
  function pathsTriptych(thePath, yes, no, maybe) {
    _classCallCheck(this, pathsTriptych);

    this.path = thePath;
    this.yes = yes;
    this.maybe = maybe;
    this.no = no;
    this.vals = this.getArgsRy(maybe);
    this.target;
    this.vel = this.initRy();
  }

  _createClass(pathsTriptych, [{
    key: "initRy",
    value: function initRy() {
      var Ry = [];
      this.vals.map(function (t) {
        var ry = [];
        t.map(function () {
          ry.push(0);
        });
        Ry.push(ry);
      });
      return Ry;
    }
  }, {
    key: "getArgsRy",
    value: function getArgsRy(path) {
      var d = path.getAttribute("d").replace(/\r?\n|\r/g, ""); //remove breaklines
      if (d.charAt(0) == "m") {
        d = "M" + d.slice(1);
      }
      var argsRX = /(?=[a-zA-Z])/;
      var args = d.split(argsRX);

      //console.log(args)

      var ArgsRy = [];

      args.map(function (arg) {
        var argRy = arg.slice(1).replace(/\-/g, " -").split(/[ ,]+/);
        argRy.map(function (p, i) {
          if (p == "") {
            argRy.splice(i, 1);
          }
        });
        //argRy.map((e) =>{e = parseFloat(e); console.log(e)})
        for (var i = 0; i < argRy.length; i++) {
          argRy[i] = parseFloat(argRy[i]);
        }

        argRy.unshift(arg[0]);
        ArgsRy.push(argRy);
      });
      //console.log(ArgsRy)
      return ArgsRy;
    }
  }, {
    key: "morph",
    value: function morph() {
      var _this = this;

      var newD = "";

      this.vals.map(function (v, vi) {
        var newStr = v[0];
        for (var i = 1; i < v.length; i++) {
          _this.updateProp(vi, i);

          newStr += v[i].toFixed(3) + " ";
        }
        newD += newStr + " ";
      }); //
      this.path.setAttributeNS(null, "d", newD);
      //console.log(this.path,newD);
    }
  }, {
    key: "updateProp",
    value: function updateProp(vi, i) {
      var dist = this.target[vi][i] - this.vals[vi][i];
      var acc = dist * spring;
      this.vel[vi][i] += acc;
      this.vel[vi][i] *= friction;
      this.vals[vi][i] += this.vel[vi][i];
    }
  }, {
    key: "sayNO",
    value: function sayNO() {
      this.target = this.getArgsRy(this.no);
      //console.log("sayNO");
    }
  }, {
    key: "sayMAYBE",
    value: function sayMAYBE() {
      this.target = this.getArgsRy(this.maybe);
      //console.log("sayMAYBE");
    }
  }, {
    key: "sayYES",
    value: function sayYES() {
      this.target = this.getArgsRy(this.yes);
      //console.log("sayYES");
    }
  }]);

  return pathsTriptych;
}();

var triptychs = [];

//                                          yes         no    maybe
triptychs.push(new pathsTriptych(_bgCircle, bgyes, bgno, bgmaybe));
triptychs.push(new pathsTriptych(_p1, hidden_dot, A, dot));
triptychs.push(new pathsTriptych(_p2, ok, V, upper));

rYes.addEventListener("change", onChangeEvent);
rMaybe.addEventListener("change", onChangeEvent);
rNo.addEventListener("change", onChangeEvent);

function Frame() {
  rid = window.requestAnimationFrame(Frame);
  triptychs.map(function (t) {
    t.morph();
  });
}

triptychs.map(function (t) {
  t.target = t.getArgsRy(t.yes);
  t.morph();
});

Frame();

base.addEventListener("click", function (e) {
  var _x = oMousePosSVG(svg, e).x;

  var max = 284.859;
  var position = void 0;
  for (var key in centers) {
    if (centers.hasOwnProperty(key)) {
      var dist = Math.abs(centers[key] - _x);
      if (dist < max) {
        max = dist;
        position = key;
      }
    }
  }

  var thisRadio = document.getElementById(position);
  thisRadio.checked = true;

  ifRadioChecked(thisRadio);
});

//helpers

function ifRadioChecked(radio) {
  if (rid) {
    window.cancelAnimationFrame(rid);
    rid = null;
  }

  var prop = radio.id.substr(1).toLowerCase();
  triptychs.map(function (t) {
    t.target = t.getArgsRy(t[prop]);
  });
  Frame();
}

function onChangeEvent() {
  if (this.checked == true) {
    ifRadioChecked(this);
  }
}

function oMousePosSVG(svg, e) {
  var p = svg.createSVGPoint();
  p.x = e.clientX;
  p.y = e.clientY;
  var ctm = svg.getScreenCTM().inverse();
  p = p.matrixTransform(ctm);
  return p;
}