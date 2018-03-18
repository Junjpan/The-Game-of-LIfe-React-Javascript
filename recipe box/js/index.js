var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.state = {
      keyword: ""
    };
    return _this;
  }

  _createClass(Search, [{
    key: "search",
    value: function search() {
      this.setState({ keyword: this.refs.keyword.value }, function () {
        var searchKey = this.state.keyword.toLowerCase();
        //console.log(searchKey)
        this.props.keyword(searchKey);
      });
    }
  }, {
    key: "closeSearch",
    value: function closeSearch() {
      $(".searchForm").css("display", "none");
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "searchForm" },
        React.createElement("input", { type: "text", ref: "keyword", style: { width: "600px", height: "50px" }, placeholder: "SEARCH" }),
        React.createElement(
          "button",
          { onClick: this.search.bind(this), style: { height: "50px", width: "60px", color: "#032f3e" } },
          React.createElement("i", { className: "zmdi zmdi-search zmdi-hc-lg" })
        ),
        React.createElement(
          "button",
          { onClick: this.closeSearch.bind(this), style: { height: "50px", width: "60px", color: "red" } },
          React.createElement("i", { className: "zmdi zmdi-close-circle zmdi-hc-lg" })
        ),
        " ",
        React.createElement("br", null)
      );
    }
  }]);

  return Search;
}(React.Component);

var RecipeItem = function (_React$Component2) {
  _inherits(RecipeItem, _React$Component2);

  function RecipeItem(props) {
    _classCallCheck(this, RecipeItem);

    var _this2 = _possibleConstructorReturn(this, (RecipeItem.__proto__ || Object.getPrototypeOf(RecipeItem)).call(this, props));

    _this2.state = {
      newrecipe: {}
    };
    return _this2;
  }

  _createClass(RecipeItem, [{
    key: "add",
    value: function add() {
      if (this.refs.name.value === "" || this.refs.ingrident.value === "" || this.refs.directions.value === "") {
        alert("Please fill out the field with '*' symbol before you add the recipe!");
      } else {
        this.setState({
          newrecipe: {
            id: uuid.v4(),
            img: this.refs.url.value,
            name: this.refs.name.value,
            ingridents: this.refs.ingrident.value,
            directions: this.refs.directions.value
          }
        }, function () {
          this.props.recipe(this.state.newrecipe);
        });
        $(".add-recipe-form").css("display", "none");
      }
    }
  }, {
    key: "closeWindow",
    value: function closeWindow() {
      $(".add-recipe-form").css("display", "none");
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "add-recipe-form" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "h4",
            { style: { color: "white", textAlign: "center", fontWeight: "bold" } },
            "ADD Recipe"
          ),
          React.createElement(
            "h3",
            { onClick: this.closeWindow.bind(this), style: { position: "relative", textAlign: "right", marginRight: "10%" } },
            React.createElement("i", { className: "zmdi zmdi-close-circle zmdi-hc-fw" })
          )
        ),
        React.createElement("br", null),
        React.createElement(
          "label",
          null,
          "Recipe Name *:"
        ),
        React.createElement("br", null),
        React.createElement("input", { ref: "name" }),
        React.createElement("br", null),
        React.createElement(
          "label",
          null,
          "Ingridents *:"
        ),
        React.createElement("br", null),
        React.createElement("textarea", { ref: "ingrident" }),
        React.createElement("br", null),
        React.createElement(
          "label",
          null,
          "Directions *:"
        ),
        React.createElement("br", null),
        React.createElement("textarea", { ref: "directions" }),
        React.createElement("br", null),
        React.createElement(
          "label",
          null,
          "Image URL:"
        ),
        React.createElement("br", null),
        React.createElement("input", { type: "text", placeholder: "url(otpional)", ref: "url" }),
        React.createElement("br", null),
        React.createElement(
          "button",
          { onClick: this.add.bind(this) },
          "ADD"
        )
      );
    }
  }]);

  return RecipeItem;
}(React.Component);

var Recipe = function (_React$Component3) {
  _inherits(Recipe, _React$Component3);

  function Recipe() {
    _classCallCheck(this, Recipe);

    var _this3 = _possibleConstructorReturn(this, (Recipe.__proto__ || Object.getPrototypeOf(Recipe)).call(this));

    _this3.state = {
      recipeitem: {},
      edititem: {},
      status: false,
      editstatus: false,
      searchitem: [],
      searchstatus: false,
      recipe: []
    };
    return _this3;
  }

  _createClass(Recipe, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var recipeFromStorage = JSON.parse(localStorage.getItem("recipe"));
      if (localStorage.getItem("recipe") === null || recipeFromStorage.length === 0) {
        var recipeArr = [{
          id: uuid.v4(),
          img: "https://images.media-allrecipes.com/userphotos/720x405/667748.jpg",
          name: "Spaghetti Sauce with Ground Beef",
          ingridents: "lb. lean ground beef \n\n 1 sweet onion, diced \n\n 4 cloves garlic, minced \n\n 2 3/4 c. water\n\n15 oz. canned tomato sauce\n\n 15 oz. canned diced tomatoes, drained\n\n1 tbsp. dried Italian seasoning\n1 tsp. kosher salt\n\n1 tsp. Freshly ground black pepper\n\n1/2 tsp. sugar\n\n12 oz. spaghetti\n\n1/2 c. freshly grated Parmesan\n\n2 tbsp. chopped parsley",
          directions: "In a Dutch oven over medium-high heat, add beef, onion, and garlic and cook until beef is cooked through. Drain fat.Add water, tomato sauce, diced tomatoes, Italian seasoning, salt, pepper, and sugar. Bring to a boil over high heat. Break spaghetti noodles in half and add to pan. Reduce heat to a simmer and cover. Cook, stirring often, until noodles are cooked through, 12 to 15 minutes.Stir in the Parmesan and parsley just before serving"
        }, {
          id: uuid.v4(),
          img: "https://static01.nyt.com/images/2014/04/29/dining/Roasted-Brussels-Sprouts/Roasted-Brussels-Sprouts-articleLarge-v3.jpg",
          name: "Roasted Brussels Sprouts With Garlic",
          ingridents: "1 pint brussels sprouts (about a pound)\n\n 4 to 6 tablespoons extra virgin olive oil, to coat bottom of pan\n\n5 cloves garlic, peeled\n\nSalt and pepper to taste\n\n1 tablespoon balsamic vinegar",
          directions: "Heat oven to 400 degrees. Trim bottom of brussels sprouts, and slice each in half top to bottom. Heat oil in cast-iron pan over medium-high heat until it shimmers; put sprouts cut side down in one layer in pan. Put in garlic, and sprinkle with salt and pepper.Cook, undisturbed, until sprouts begin to brown on bottom, and transfer to oven. Roast, shaking pan every 5 minutes, until sprouts are quite brown and tender, about 10 to 20 minutes.Taste, and add more salt and pepper if necessary. Stir in balsamic vinegar, and serve hot or warm."
        }];
        var recipeJSON = JSON.stringify(recipeArr);
        //console.log(recipeJSON);
        localStorage.setItem("recipe", recipeJSON);

        //console.log(recipeFromStorage);
        this.setState({ recipe: recipeFromStorage });
      } else {
        this.setState({ recipe: recipeFromStorage });
      }
    }
  }, {
    key: "closeWindow",
    value: function closeWindow() {
      if (this.state.status) {
        this.setState({ status: false });
      }
      if (this.state.editstatus) {
        this.setState({ editstatus: false });
      }
    }
  }, {
    key: "addRecipe",
    value: function addRecipe(recipe) {
      var arr = this.state.recipe;
      arr.push(recipe);
      var arrJSON = JSON.stringify(arr);
      localStorage.setItem("recipe", arrJSON);

      var arrFromStorage = JSON.parse(localStorage.getItem("recipe"));
      //console.log(arrFromJSON);
      this.setState({ recipe: arrFromStorage });
      //console.log(arr);
    }
  }, {
    key: "addRecipeForm",
    value: function addRecipeForm() {
      $(".add-recipe-form").css("display", "block");
    }
  }, {
    key: "editRecipe",
    value: function editRecipe(data) {
      this.setState({ status: false,
        editstatus: true
      });
    }
  }, {
    key: "saveRecipe",
    value: function saveRecipe() {
      var object = { id: this.state.recipeitem.id,
        img: this.refs.url.value,
        name: this.refs.name.value,
        ingridents: this.refs.ingridents.value,
        directions: this.refs.directions.value };
      var editId = this.state.recipeitem.id;

      var arr = this.state.recipe;
      var i = arr.findIndex(function (data) {
        return data.id === editId;
      });

      arr[i] = object;
      var arrtoJSON = JSON.stringify(arr);
      localStorage.setItem("recipe", arrtoJSON);
      var arrFromJSON = JSON.parse(localStorage.getItem("recipe"));

      this.setState({ recipe: arrFromJSON,
        status: true,
        editstatus: false,
        recipeitem: object });
      var newarr = this.state.recipe;
    }
  }, {
    key: "editRecipeForm",
    value: function editRecipeForm() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "recipeitem" },
          React.createElement(
            "button",
            { onClick: this.saveRecipe.bind(this) },
            React.createElement("i", { className: "zmdi zmdi-save zmdi-hc-fw" }),
            "Save"
          )
        ),
        React.createElement(
          "table",
          { className: "table-bordered" },
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              React.createElement("i", { className: "zmdi zmdi-close zmdi-hc-lg", onClick: this.closeWindow.bind(this) })
            )
          ),
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              React.createElement("img", { src: this.state.recipeitem.img, height: "200px", width: "400px" })
            )
          ),
          React.createElement("input", { ref: "url", defaultValue: this.state.recipeitem.img, style: { width: "400px" } }),
          React.createElement(
            "tr",
            null,
            React.createElement("input", { ref: "name", style: { width: "400px" }, defaultValue: this.state.recipeitem.name })
          ),
          React.createElement(
            "tr",
            null,
            React.createElement("textarea", { ref: "ingridents", style: { width: "400px", height: "550px" }, defaultValue: this.state.recipeitem.ingridents })
          ),
          React.createElement(
            "tr",
            null,
            React.createElement("textarea", { ref: "directions", style: { width: "400px", height: "300px" }, defaultValue: this.state.recipeitem.directions })
          )
        )
      );
    }
  }, {
    key: "openRecipe",
    value: function openRecipe(data) {
      this.setState({ recipeitem: data,
        status: true });
      // console.log(this.state.recipeitem);
    }
  }, {
    key: "openRecipeForm",
    value: function openRecipeForm() {
      var data = this.state.recipeitem;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "recipeitem" },
          React.createElement(
            "button",
            { className: "delete-button", onClick: this.deleteRecipe.bind(this, data.id) },
            React.createElement("i", { className: "zmdi zmdi-delete zmdi-hc-fw" }),
            "Delete"
          ),
          " ",
          React.createElement("br", null),
          React.createElement(
            "button",
            { className: "edit-button", onClick: this.editRecipe.bind(this, data) },
            React.createElement("i", { className: "zmdi zmdi-edit zmdi-hc-fw" }),
            "Edit"
          ),
          React.createElement("br", null)
        ),
        React.createElement(
          "table",
          { className: "table-bordered" },
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              React.createElement("i", { className: "zmdi zmdi-close zmdi-hc-lg", onClick: this.closeWindow.bind(this) })
            )
          ),
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              React.createElement("img", { src: data.img, height: "200px", width: "400px" })
            )
          ),
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              { className: "recipe-name" },
              data.name
            )
          ),
          React.createElement(
            "tr",
            null,
            React.createElement("td", { dangerouslySetInnerHTML: { __html: marked(data.ingridents) } })
          ),
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              React.createElement(
                "b",
                null,
                "Directions:"
              ),
              data.directions
            )
          )
        )
      );
    }
  }, {
    key: "deleteRecipe",
    value: function deleteRecipe(id) {
      //console.log(id);
      var arr = this.state.recipe;
      var index = arr.findIndex(function (data) {
        return data.id === id;
      });
      arr.splice(index, 1);
      var arrtoJSON = JSON.stringify(arr);
      localStorage.setItem("recipe", arrtoJSON);
      var arrFromJSON = JSON.parse(localStorage.getItem("recipe"));
      this.setState({ recipe: arrFromJSON,
        status: false,
        recipeitem: {} });
    }
  }, {
    key: "opensSearchForm",
    value: function opensSearchForm() {
      $(".searchForm").css("display", "block");
    }
  }, {
    key: "searchForm",
    value: function searchForm(keyword) {
      var searcharr = JSON.parse(localStorage.getItem("recipe"));
      var searchResult = searcharr.filter(function (recipe) {
        //console.log(recipe.name);
        return recipe.name.toLowerCase().indexOf(keyword) > -1;
      });
      if (searchResult.length === 0) {
        alert("there is no " + keyword + " recipe here,please try searching different recipe!");
      } else {
        this.setState({ searchitem: searchResult,
          searchstatus: true });
        console.log(this.state.searchstatus);
        console.log(this.state.searchitem);
        $(".searchForm").css("display", "none");
      }
      $(".add").attr('disabled', 'disabled');
    }
  }, {
    key: "searchResultForm",
    value: function searchResultForm() {
      var _this4 = this;

      var searchItem = this.state.searchitem.map(function (data, index) {
        return React.createElement(
          "table",
          { className: "table-bordered", key: index },
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              React.createElement("img", { src: data.img, height: "210px", width: "390px" })
            )
          ),
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              { className: "recipe-name", ref: "recipename", onClick: _this4.openRecipe.bind(_this4, data) },
              data.name,
              React.createElement("i", { className: "zmdi zmdi-open-in-new zmdi-hc-fw" })
            )
          )
        );
      });

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "search" },
          React.createElement(
            "button",
            { className: "btn-primary", onClick: this.allRecipe.bind(this) },
            React.createElement("i", { className: "zmdi zmdi-book zmdi-hc-lg" }),
            "  ALL RECIPES"
          )
        ),
        React.createElement("br", null),
        searchItem
      );
    }
  }, {
    key: "allRecipe",
    value: function allRecipe() {

      var all = JSON.parse(localStorage.getItem("recipe"));
      this.setState({ recipe: all,
        searchstatus: false });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      if (this.state.status) {
        return this.openRecipeForm();
      } else if (this.state.editstatus) {
        return this.editRecipeForm();
      } else if (this.state.searchstatus && this.state.searchitem.length > 0) {
        return this.searchResultForm();
      } else {
        var _React$createElement;

        var eachRecipe = this.state.recipe.map(function (data, index) {
          return React.createElement(
            "table",
            { className: "table-bordered", key: index },
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                React.createElement("img", { src: data.img, height: "210px", width: "390px" })
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                { className: "recipe-name", ref: "recipename", onClick: _this5.openRecipe.bind(_this5, data) },
                data.name,
                React.createElement("i", { className: "zmdi zmdi-open-in-new zmdi-hc-fw" })
              )
            )
          );
        });

        return React.createElement(
          "div",
          { className: "menu" },
          React.createElement(
            "button",
            (_React$createElement = { className: "btn-primary" }, _defineProperty(_React$createElement, "className", "add"), _defineProperty(_React$createElement, "onClick", this.addRecipeForm.bind(this)), _React$createElement),
            React.createElement("i", { className: "zmdi zmdi-collection-image zmdi-hc-fw" }),
            " ADD RECIPE"
          ),
          React.createElement(
            "button",
            { className: "btn-primary", onClick: this.opensSearchForm.bind(this), style: { backgroundColor: "white", color: "#032f3e", border: "1px solid #032f3e" } },
            React.createElement("i", { className: "zmdi zmdi-search zmdi-hc-lg" }),
            "  SEARCH"
          ),
          React.createElement(
            "div",
            null,
            eachRecipe
          ),
          React.createElement(RecipeItem, { recipe: this.addRecipe.bind(this) }),
          React.createElement(Search, { keyword: this.searchForm.bind(this) })
        );
      }
    }
  }]);

  return Recipe;
}(React.Component);

ReactDOM.render(React.createElement(Recipe, null), document.getElementById("app"));