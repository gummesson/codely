  App.get = function(data) {
    return localStorage.getItem(data);
  };

  App.save = function(data, content) {
    localStorage.setItem(data, content);
  };

  App.clear = function() {
    localStorage.clear();
  };
