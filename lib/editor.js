  App.editor = function() {
    var editor = CodeMirror(Config.area, {
      autofocus: true,
      lineNumbers: true,
      tabSize: '2',
      theme: 'paraiso-dark',
      autoCloseBrackets: true,
      autoCloseTags: true,
      extraKeys: {
        'F11': function(cm) {
          cm.setOption('fullScreen', !cm.getOption('fullScreen'));
        },
        'F10': function(cm) {
          App.save(Data.text, editor.getValue());
          App.notify('Codely.', 'The content was saved.');
        }
      },
      profile: 'xhtml'
    });

    if (window.matchMedia) {
      if (matchMedia("(min-width: 481px)").matches) {
        editor.setSize('100%', '480px');
      } else {
        editor.setSize('100%', '300px');
      }
    } else {
      editor.setSize('100%', '480px');
    }

    try {
      var lang = App.get(Data.lang),
          mode = App.get(Data.keys),
          text = App.get(Data.text);
      editor.setValue(text);
      editor.setOption('mode', lang);
      editor.setOption('keyMap', mode);
      Utils.option(lang, Config.lang);
      Utils.option(mode, Config.keys);
    } catch(e) {
      App.save(Data.lang, 'htmlmixed');
      App.save(Data.keys, 'default');
      editor.setOption('mode', 'htmlmixed');
      editor.setOption('keyMap', 'default');
    }

    Utils.bind(Config.lang, 'change', function(event) {
      var lang = event.target.value;
      if (lang) {
        App.save(Data.lang, lang);
        editor.setOption('mode', lang);
      }
    });

    Utils.bind(Config.keys, 'change', function(event) {
      var mode = event.target.value;
      if (mode) {
        App.save(Data.keys, mode);
        editor.setOption('keyMap', mode);
      }
    });

    Utils.bind(Config.save, 'click', function(event) {
      App.save(Data.text, editor.getValue());
      App.notify('Codely.', 'The content was saved.');
    });

    Utils.bind(Config.clear, 'click', function(event) {
      App.clear();
      editor.setValue('');
      App.notify('Codely.', 'The content was cleared.');
    });

    setInterval(function() {
      App.save(Data.text, editor.getValue());
    }, 2000);
  };
