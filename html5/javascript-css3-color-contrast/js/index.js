function resizable(el) {
  var getX = function getX(e) {
    return e.clientX || e.touches[0].clientX;
  };

  var togglePressed = function togglePressed(isActive) {
    return function (event) {
      if (state.pressed !== isActive) {
        state.pressed = isActive;
        handle.classList.toggle('resizable-handle-active');
        state.x = isActive ? getX(event) : -1;
      }
    };
  };

  var move = function move(event) {
    if (state.pressed) {
      var width = el.getBoundingClientRect().width;
      var clientX = getX(event);
      var direction = state.x < clientX ? 1 : -1;
      var diff = Math.abs(state.x - clientX) * direction;
      el.style.cssText += 'width: ' + (width + diff) + 'px;';
      state.x = clientX;
    }
  };

  var state = {
    pressed: false,
    x: -1
  };

  var handle = document.createElement('div');
  handle.classList.add('resizable-handle');
  handle.style.cssText += '\n    position: absolute;\n    right: 0;\n    top: 0;\n    height: 100%;\n    cursor: col-resize;\n  ';

  handle.addEventListener('mousedown', togglePressed(true));
  window.addEventListener('mouseup', togglePressed(false));
  window.addEventListener('mousemove', move);

  handle.addEventListener('touchstart', togglePressed(true));
  handle.addEventListener('touchend', togglePressed(false));
  handle.addEventListener('touchcancel', togglePressed(false));
  handle.addEventListener('touchmove', move);

  el.appendChild(handle);
}

var leftPanel = document.querySelector('.left');
resizable(leftPanel);

var reactiveCSSProps = createReactiveCSSProps({
  '--bg1': {
    reducer: function reducer(_ref) {
      var type = _ref.type,
          data = _ref.data;

      switch (type) {
        case 'bg1':
          return data.target.value;
      }
    }
  },
  '--bg2': {
    reducer: function reducer(_ref2) {
      var type = _ref2.type,
          data = _ref2.data;

      switch (type) {
        case 'bg2':
          return data.target.value;
      }
    }
  },
  '--fg1': {
    reducer: function reducer(_ref3) {
      var type = _ref3.type,
          data = _ref3.data;

      switch (type) {
        case 'fg1':
          return data.target.value;
      }
    }
  },
  '--fg2': {
    reducer: function reducer(_ref4) {
      var type = _ref4.type,
          data = _ref4.data;

      switch (type) {
        case 'fg2':
          return data.target.value;
      }
    }
  }
});[bg1, bg2, fg1, fg2].forEach(function (input) {
  input.addEventListener('change', function (event) {
    reactiveCSSProps.dispatch({ type: input.id, data: event });
  });
});