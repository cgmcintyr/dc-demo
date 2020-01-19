var myPanzoom;
const TOOTH_NUMBERS = [
    11, 12, 13, 14, 15, 16, 17, 18,
    21, 22, 23, 24, 25, 26, 27, 28,
    31, 32, 33, 34, 35, 36, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48
];

var globalToothElems = [];
var lastTouchedElems = [];
var toothSelectElement;


function handleClick(toothNumber, toothElems) {
    return function f() {
        var opts = toothSelectElement.options;
        for (var opt, j = 0; opt = opts[j]; j++) {
            if (opt.value == toothNumber) {
                toothSelectElement.selectedIndex = j;
                break;
            }
        }
        for (let toothElem of lastTouchedElems) {
            toothElem.style.fill = "none";
            toothElem.style["stroke-width"] = 1;
        };
        for (let toothElem of globalToothElems) {
            toothElem.style["stroke"] = "#ababab";
        };
        for (let toothElem of toothElems) {
            toothElem.style["stroke"] = "black";
            toothElem.style.fill = "#ff9999";
            toothElem.style["stroke-width"] = 2;
        };
        lastTouchedElems = toothElems;
    };
}

function handleSelect(event) {
  var toothNumber = event.target.value;
  var toothClass = "tooth-" + toothNumber;
  var toothElems = document.getElementsByClassName(toothClass);
  console.log(toothClass);
  console.log(toothElems);
  for (let toothElem of lastTouchedElems) {
      toothElem.style.fill = "none";
      toothElem.style["stroke-width"] = 1;
  };
  for (let toothElem of globalToothElems) {
      toothElem.style["stroke"] = "#ababab";
  };
  for (let toothElem of toothElems) {
      toothElem.style["stroke"] = "black";
      toothElem.style.fill = "#ff9999";
      toothElem.style["stroke-width"] = 2;
  };
  lastTouchedElems = toothElems;
}

/**
 * Initialise svg and listeners
 */
window.onload = function () {
    var element = document.querySelector('#chart-scene');
    myPanzoom = panzoom(element, {
      bounds: true,
      boundsPadding: 0.5,
      onTouch: function(e) {
        // Tells the library to not preventDefault.
        return true;
      }
    });

    toothSelectElement = document.getElementById('tooth-select');
    toothSelectElement.addEventListener("onchange", handleSelect);
    toothSelectElement.onchange = handleSelect;

    TOOTH_NUMBERS.forEach(function(toothNumber) {
        var toothClass = "tooth-" + toothNumber;
        var circle = document.getElementById(toothClass + "-circle");
        var toothElems = document.getElementsByClassName(toothClass);
        Array.prototype.push.apply(globalToothElems, toothElems);
        if (circle) {
            circle.addEventListener("touched", handleClick(toothNumber, toothElems));
            circle.addEventListener("click", handleClick(toothNumber, toothElems));
        }
    });
}
