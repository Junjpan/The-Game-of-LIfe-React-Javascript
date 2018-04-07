var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Handling cloned objects
//http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.size = function () {
      var gridsize = _this.refs.size.value;
      _this.props.size(gridsize);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          { onClick: this.props.stop },
          "STOP"
        ),
        React.createElement(
          "button",
          { onClick: this.props.start },
          "START"
        ),
        React.createElement(
          "button",
          { onClick: this.props.clear },
          "CLEAR"
        ),
        React.createElement(
          "button",
          { onClick: this.props.seed },
          "SEED"
        ),
        React.createElement("br", null),
        React.createElement(
          "h4",
          null,
          "SPEED:"
        ),
        React.createElement(
          "button",
          { onClick: this.props.slow },
          "SLOW"
        ),
        React.createElement(
          "button",
          { onClick: this.props.medium },
          "MEDIUM"
        ),
        React.createElement(
          "button",
          { onClick: this.props.fast },
          "FAST"
        ),
        React.createElement("br", null),
        React.createElement(
          "h4",
          null,
          "BOARD SIZE:"
        ),
        React.createElement(
          "select",
          { ref: "size", onChange: this.size, className: "select" },
          React.createElement(
            "option",
            { value: "5030" },
            "SIZE:50 X 30"
          ),
          React.createElement(
            "option",
            { value: "7050" },
            "SIZE:70 X 50"
          ),
          React.createElement(
            "option",
            { value: "3010" },
            "SIZE:30 X 10"
          )
        )
      );
    }
  }]);

  return Button;
}(React.Component);

var Grid = function (_React$Component2) {
  _inherits(Grid, _React$Component2);

  function Grid() {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));
  }

  _createClass(Grid, [{
    key: "selectCell",
    value: function selectCell(row, col) {
      this.props.selectCell(row, col);
    }
  }, {
    key: "render",
    value: function render() {
      var widthVal = this.props.col * 15 + 1;
      var rowArray = [];
      var cellClass = "";
      for (var i = 0; i < this.props.row; i++) {
        for (var j = 0; j < this.props.col; j++) {
          var cellId = i + "_" + j;
          cellClass = this.props.fullgrid[i][j] ? "cell on" : "cell off";
          rowArray.push(React.createElement("div", { className: cellClass, key: cellId, onClick: this.selectCell.bind(this, i, j) }));
        }
      }
      return React.createElement(
        "div",
        { className: "grid-container", style: { width: widthVal } },
        rowArray
      );
    }
  }]);

  return Grid;
}(React.Component);

var Maingrid = function (_React$Component3) {
  _inherits(Maingrid, _React$Component3);

  function Maingrid() {
    _classCallCheck(this, Maingrid);

    var _this3 = _possibleConstructorReturn(this, (Maingrid.__proto__ || Object.getPrototypeOf(Maingrid)).call(this));

    _this3.medium = function () {
      _this3.speed = 500;
      _this3.start();
    };

    _this3.size = function (size) {
      _this3.clear();
      var col = parseInt(size.slice(0, 2), 10); //it is always a good practice to pass radix with parseInt-parseInt(string,radix);
      var row = parseInt(size.slice(2), 10);
      _this3.col = col;
      _this3.row = row;
      _this3.setState({ generation: 0,
        fullgrid: Array(_this3.row).fill().map(function () {
          return Array(_this3.col).fill(false);
        }) });
    };

    _this3.row = 30;
    _this3.col = 50;
    _this3.speed = 500;
    _this3.state = {
      generation: 0,
      fullgrid: Array(_this3.row).fill().map(function () {
        return Array(_this3.col).fill(false);
      })
    };
    return _this3;
  }

  _createClass(Maingrid, [{
    key: "selectCell",
    value: function selectCell(row, col) {
      //console.log(row,col);
      var arr = this.state.fullgrid;
      arr[row][col] = !arr[row][col];
      this.setState({ fullgrid: arr });
    }
  }, {
    key: "seed",
    value: function seed() {
      var arr1 = this.state.fullgrid;
      for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
          if (Math.floor(Math.random() * 6) === 1) {
            arr1[i][j] = true;
          }
        }
      }
      this.setState({ fullgrid: arr1 });
    }
  }, {
    key: "autoStart",
    value: function autoStart() {
      var arr = this.state.fullgrid;
      var arr2 = arrayClone(this.state.fullgrid);

      for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
          var count = 0;
          if (i > 0) {
            if (arr[i - 1][j]) {
              count++;
            }
          }
          if (i > 0 && j > 0) {
            if (arr[i - 1][j - 1]) {
              count++;
            }
          }
          if (i > 0 && j < this.col - 1) {
            if (arr[i - 1][j + 1]) {
              count++;
            }
          }
          if (j > 0) {
            if (arr[i][j - 1]) {
              count++;
            }
          }
          if (j < this.col - 1) {
            if (arr[i][j + 1]) {
              count++;
            }
          }
          if (i < this.row - 1) {
            if (arr[i + 1][j]) {
              count++;
            }
          }
          if (i < this.row - 1 && j > 0) {
            if (arr[i + 1][j - 1]) {
              count++;
            }
          }
          if (i < this.row - 1 && j < this.col - 1) {
            if (arr[i + 1][j + 1]) {
              count++;
            }
          }
          if (arr[i][j] && (count < 2 || count > 3)) {
            arr2[i][j] = false;
          }
          if (!arr[i][j] && count === 3) {
            arr2[i][j] = true;
          }
        }
      }

      this.setState({ fullgrid: arr2,
        generation: this.state.generation + 1 });
    }
  }, {
    key: "start",
    value: function start() {
      clearInterval(this.stopId);
      this.stopId = setInterval(this.autoStart.bind(this), this.speed);
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this.stopId);
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this4 = this;

      clearInterval(this.stopId);
      this.setState({ generation: 0,
        fullgrid: Array(this.row).fill().map(function () {
          return Array(_this4.col).fill(false);
        }) });
    }
  }, {
    key: "slow",
    value: function slow() {
      this.speed = 2000;
      this.start();
    }
  }, {
    key: "fast",
    value: function fast() {
      this.speed = 100;
      this.start();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.seed();
      this.start();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "main" },
        React.createElement(
          "h1",
          null,
          "The Game of life"
        ),
        React.createElement(Grid, { row: this.row, col: this.col, fullgrid: this.state.fullgrid, selectCell: this.selectCell.bind(this) }),
        React.createElement(
          "h4",
          null,
          "GENERATIONS: ",
          React.createElement(
            "span",
            { style: { color: "white", fontSize: "18px" } },
            this.state.generation
          )
        ),
        React.createElement(Button, { stop: this.stop.bind(this),
          start: this.start.bind(this),
          clear: this.clear.bind(this),
          slow: this.slow.bind(this),
          medium: this.medium,
          fast: this.fast.bind(this),
          size: this.size,
          seed: this.seed.bind(this)
        })
      );
    }
  }]);

  return Maingrid;
}(React.Component);

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
} // if this is not a nested array, Array.slice(0) will do the job, since this is a nested array, we need to use JSON.parsse and JSON.stringify for deep clone
ReactDOM.render(React.createElement(Maingrid, null), document.getElementById('root'));