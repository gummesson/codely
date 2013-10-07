  Utils.bind = function(element, action, callback) {
    if (element.addEventListener) {
      element.addEventListener(action, function(event) {
        callback(event);
      });
    } else {
      element.attachEvent('on' + action, function(event) {
        callback(event);
      });
    }
  };

  Utils.option = function(data, select) {
    var options = select.options,
        total = options.length,
        i;
    for (i = 0; i < total; i++) {
      if (options[i].value === data) {
        select.selectedIndex = i;
      }
    }
  };
