// Josh Bender - 300746563
// Last Updated 02/03/2016
// Comp392 MidTerm
var config;
(function (config) {
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = window.innerWidth;
        Screen.HEIGHT = window.innerHeight;
        Screen.RATIO = window.innerWidth / window.innerHeight;
        return Screen;
    }());
    config.Screen = Screen;
})(config || (config = {}));

//# sourceMappingURL=screen.js.map
