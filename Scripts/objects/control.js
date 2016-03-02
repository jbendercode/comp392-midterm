/// <reference path="../../typings/tsd.d.ts"/>
// Josh Bender - 300746563
// Last Updated 02/03/2016
// Comp392 MidTerm
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(cube1Speed, cube2Speed, cube3Speed, cube4Speed, cube5Speed, towerScale) {
            this.cube1Speed = cube1Speed;
            this.cube2Speed = cube2Speed;
            this.cube3Speed = cube3Speed;
            this.cube4Speed = cube4Speed;
            this.cube5Speed = cube5Speed;
            this.towerScale = towerScale;
        }
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
