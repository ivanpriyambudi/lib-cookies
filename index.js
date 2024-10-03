(function(global) {
    function MyLibrary() {
      this.sayHello = function(name) {
        return `Hello, ${name}!`;
      };
    }
  
    global.MyLibrary = MyLibrary;
  })(this);
  