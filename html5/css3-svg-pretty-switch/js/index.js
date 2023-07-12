"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CleanToggle = function (_React$Component) {
  _inherits(CleanToggle, _React$Component);

  function CleanToggle(props) {
    _classCallCheck(this, CleanToggle);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.toggle = function (e) {
      _this.setState({ on: !_this.state.on });
    };

    _this.componentDidUpdate = function (e) {
      var tl = new TimelineMax();

      tl.to([_this.dotLBg, _this.dotGroup], 1, {
        x: _this.state.on ? 84 : 0,
        transformOrigin: "50% 50%",
        ease: Power3.easeInOut
      }).to(_this.toggleBg, 1, {
        fill: _this.state.on ? "#43B86C" : "#BC4B51",
        ease: Sine.easeInOut
      }, "-=1").to(_this.patternColor, 1, {
        fill: _this.state.on ? "#43B86C" : "#BC4B51",
        ease: Power3.easeInOut
      }, "-=1").to(_this.starPattern, 1, {
        attr: {
          x: _this.state.on ? 210 : 0
        },
        transformOrigin: "50% 50%",
        ease: Power3.easeInOut
      }, "-=1").to(".baubleGradStopColor", 1, {
        stopColor: _this.state.on ? "#184A13" : "#491615"
      }, "-=1");
    };

    _this.state = { on: true };

    return _this;
  }

  CleanToggle.prototype.componentDidMount = function componentDidMount() {
    this.toggle();
  };

  CleanToggle.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      "svg",
      {
        viewBox: "0 0 800 600",
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        preserveAspectRatio: "xMidYMid slice"
      },
      React.createElement(
        "defs",
        null,
        React.createElement(
          "radialGradient",
          {
            id: "baubleShineGrad",
            cx: "352.79",
            cy: "293.87",
            r: "26",
            gradientUnits: "userSpaceOnUse"
          },
          React.createElement("stop", { offset: "0.01", stopColor: "#fff", stopOpacity: "0.5" }),
          React.createElement("stop", { offset: "0.69", stopColor: "#fff", stopOpacity: "0" })
        ),
        React.createElement(
          "radialGradient",
          {
            id: "baubleGrad",
            cx: 358,
            cy: 298,
            r: 26,
            gradientUnits: "userSpaceOnUse"
          },
          React.createElement("stop", { offset: "0.5", stopColor: "#FABE2B", stopOpacity: 0 }),
          React.createElement("stop", {
            offset: "0.8",
            className: "baubleGradStopColor",
            stopColor: "#491615",
            stopOpacity: "0.15"
          }),
          React.createElement("stop", {
            offset: 1,
            className: "baubleGradStopColor",
            stopColor: "#491615",
            stopOpacity: "0.65"
          })
        ),
        React.createElement(
          "filter",
          {
            id: "baubleShadow",
            width: "350%",
            height: "350%",
            colorInterpolationFilters: "sRGB"
          },
          React.createElement("feGaussianBlur", { stdDeviation: "4", result: "coloredBlur" }),
          React.createElement("feOffset", { dx: "0", dy: "23", result: "offsetblur" }),
          React.createElement("feFlood", { id: "dropShadowAlpha", floodColor: "#000", floodOpacity: "0.21" }),
          React.createElement("feComposite", { in2: "offsetblur", operator: "in" }),
          React.createElement(
            "feMerge",
            null,
            React.createElement("feMergeNode", null)
          )
        ),
        React.createElement(
          "linearGradient",
          {
            id: "baubleCapGrad",
            x1: "351.26",
            y1: "272.94",
            x2: "364.74",
            y2: "272.94",
            gradientUnits: "userSpaceOnUse"
          },
          React.createElement("stop", { offset: "0.09", stopColor: "#f5bb3b" }),
          React.createElement("stop", { offset: "0.31", stopColor: "#fff" }),
          React.createElement("stop", { offset: "0.51", stopColor: "#f5bb3b" }),
          React.createElement("stop", { offset: "0.86", stopColor: "#bd902d" }),
          React.createElement("stop", { offset: "1", stopColor: "#f5bb3b" })
        ),
        React.createElement(
          "pattern",
          {
            id: "starPattern",
            ref: function ref(starPattern) {
              _this2.starPattern = starPattern;
            },
            width: 92,
            height: 92,
            patternTransform: "translate(-10.02 -3.42) scale(0.33)",
            patternUnits: "userSpaceOnUse",
            viewBox: "0 0 92 92",
            x: 0,
            y: 0
          },
          React.createElement("rect", { width: 184, height: 184, fill: "none" }),
          React.createElement(
            "g",
            {
              ref: function ref(patternColor) {
                _this2.patternColor = patternColor;
              },
              fill: "#BC4B51"
            },
            React.createElement("polygon", { points: "84.19 73.59 95.3 83.17 109.49 79.45 103.83 92.99 111.76 105.34 97.14 104.12 87.87 115.48 84.5 101.19 70.83 95.86 83.36 88.25 84.19 73.59" }),
            React.createElement("polygon", { points: "45.58 87.84 48.09 90 51.3 89.16 50.02 92.22 51.81 95.02 48.51 94.74 46.41 97.31 45.65 94.08 42.55 92.87 45.39 91.15 45.58 87.84" }),
            React.createElement("polygon", { points: "-7.82 73.59 3.3 83.17 17.49 79.45 11.82 92.99 19.76 105.34 5.14 104.12 -4.13 115.48 -7.5 101.19 -21.18 95.86 -8.64 88.25 -7.82 73.59" }),
            React.createElement("polygon", { points: "39.53 27.59 50.65 37.17 64.83 33.45 59.17 46.99 67.11 59.34 52.49 58.12 43.21 69.48 39.84 55.19 26.17 49.86 38.7 42.25 39.53 27.59" }),
            React.createElement("polygon", { points: "84.19 -18.41 95.3 -8.82 109.49 -12.55 103.83 0.99 111.76 13.34 97.14 12.12 87.87 23.48 84.5 9.19 70.83 3.86 83.36 -3.75 84.19 -18.41" }),
            React.createElement("polygon", { points: "90.23 41.84 92.75 44 95.95 43.16 94.67 46.22 96.47 49.02 93.16 48.74 91.06 51.31 90.3 48.08 87.21 46.87 90.05 45.15 90.23 41.84" }),
            React.createElement("polygon", { points: "45.58 -4.16 48.09 -2 51.3 -2.84 50.02 0.22 51.81 3.02 48.51 2.74 46.41 5.31 45.65 2.08 42.55 0.87 45.39 -0.85 45.58 -4.16" }),
            React.createElement("polygon", { points: "-7.82 -18.41 3.3 -8.82 17.49 -12.55 11.82 0.99 19.76 13.34 5.14 12.12 -4.13 23.48 -7.5 9.19 -21.18 3.86 -8.64 -3.75 -7.82 -18.41" }),
            React.createElement("polygon", { points: "-1.77 41.84 0.75 44 3.96 43.16 2.67 46.22 4.47 49.02 1.16 48.74 -0.94 51.31 -1.7 48.08 -4.79 46.87 -1.96 45.15 -1.77 41.84" })
          )
        ),
        React.createElement(
          "filter",
          { id: "insetShadow" },
          React.createElement("feOffset", {
            dx: "0",
            dy: "14"
          }),
          React.createElement("feGaussianBlur", {
            stdDeviation: "5",
            result: "offset-blur"
          }),
          React.createElement("feComposite", {
            operator: "out",
            "in": "SourceGraphic",
            in2: "offset-blur",
            result: "inverse"
          }),
          React.createElement("feFlood", {
            floodColor: "black",
            floodOpacity: "0.5",
            result: "color"
          }),
          React.createElement("feComposite", {
            operator: "in",
            "in": "color",
            in2: "inverse",
            result: "shadow"
          }),
          React.createElement("feComposite", {
            operator: "over",
            "in": "shadow",
            in2: "SourceGraphic"
          })
        ),
        React.createElement(
          "filter",
          {
            id: "dropShadow",
            width: "350%",
            height: "350%",
            colorInterpolationFilters: "sRGB"
          },
          React.createElement("feGaussianBlur", { stdDeviation: "4", result: "coloredBlur" }),
          React.createElement("feOffset", { dx: "0", dy: "3", result: "offsetblur" }),
          React.createElement("feFlood", { id: "dropShadowAlpha", floodColor: "#000", floodOpacity: "0.4" }),
          React.createElement("feComposite", { in2: "offsetblur", operator: "in" }),
          React.createElement(
            "feMerge",
            null,
            React.createElement("feMergeNode", null),
            React.createElement("feMergeNode", { "in": "SourceGraphic" })
          )
        )
      ),
      React.createElement("rect", { filter: "url(#insetShadow)",
        ref: function ref(toggleBg) {
          _this2.toggleBg = toggleBg;
        },
        x: "321",
        y: "263",
        width: "158",
        height: "74",
        rx: "37",
        ry: "37",
        fill: "#B74452"
      }),
      React.createElement("rect", {
        filter: "url(#baubleShadow)",
        ref: function ref(dotGroup) {
          _this2.dotGroup = dotGroup;
        },
        width: "52",
        height: "52",
        x: "332",
        y: "274",
        rx: "26",
        ry: "26",
        fill: "#000",
        opacity: "1"
      }),
      React.createElement(
        "g",
        null,
        React.createElement(
          "g",
          {
            ref: function ref(dotLBg) {
              _this2.dotLBg = dotLBg;
            }
          },
          React.createElement("path", {
            d: "M355.68,270.7a3,3,0,0,1-.65-1.86,3,3,0,0,1,5.94,0,3,3,0,0,1-.65,1.86",
            fill: "none",
            stroke: "#DCA014",
            "stroke-miterlimit": "10",
            strokeWidth: "1.5"
          }),
          React.createElement("path", {
            d: "M363.88,270.29H352.13a.87.87,0,0,0-.87.86v3.52a.87.87,0,0,0,1.73,0l10,.06h0a.87.87,0,0,0,1.73,0v-3.59A.87.87,0,0,0,363.88,270.29Z",
            fill: "url(#baubleCapGrad)"
          }),
          React.createElement("circle", { cx: "358", cy: "300", r: "26", fill: "#FFFCF9" }),
          React.createElement("circle", { cx: "358", cy: "300", r: "26", fill: "url(#starPattern)" }),
          React.createElement("circle", { cx: "358", cy: "300", r: "26.1", fill: "url(#baubleGrad)" }),
          React.createElement("circle", {
            cx: "358",
            cy: "300",
            r: "26",
            fill: "url(#baubleShineGrad)"
            /*       ref={dotGrad => {
            this.dotGrad = dotGrad;
            }} */
          })
        )
      ),
      React.createElement("rect", {
        onClick: this.toggle,
        ref: function ref(hit) {
          _this2.hit = hit;
        },
        className: "hit",
        x: "321",
        y: "263",
        width: "158",
        height: "74",
        rx: "37",
        ry: "37",
        fill: "transparent"
      })
    );
  };

  return CleanToggle;
}(React.Component);

ReactDOM.render(React.createElement(CleanToggle, null), document.querySelector("#app"));