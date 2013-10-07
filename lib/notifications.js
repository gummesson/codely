  App.notify = function(title, body) {
    var notifier = Notification;
    if (notifier) {
      var permission = notifier.permission,
          request = notifier.requestPermission;
      if (permission === 'granted') {
        App.notification(title, body);
      } else if (permission !== 'denied') {
        request(function(value) {
          if (!permission) {
            permission = value;
          }
          if (value === 'granted') {
            App.notification(title, body);
          }
        });
      }
    }
  };

  App.notification = function(title, body) {
    var popup = new Notification(title,  {
      icon: 'assets/img/notificon.png',
      body: body
    });

    popup.onshow = function () {
      setTimeout(function () {
        popup.close();
      }, 3000);
    };
  };
