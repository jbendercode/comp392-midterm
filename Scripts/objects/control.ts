/// <reference path="../../typings/tsd.d.ts"/>

// Josh Bender - 300746563
// Last Updated 02/03/2016
// Comp392 MidTerm

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public cube1Speed:number;
        public cube2Speed:number;
        public cube3Speed:number;
        public cube4Speed:number;
        public cube5Speed:number;
        public towerScale:number;
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(cube1Speed:number, cube2Speed:number, cube3Speed:number, cube4Speed:number, cube5Speed:number, towerScale:number) {
            this.cube1Speed = cube1Speed;
            this.cube2Speed = cube2Speed;
            this.cube3Speed = cube3Speed;
            this.cube4Speed = cube4Speed;
            this.cube5Speed = cube5Speed;
            this.towerScale = towerScale;
        }
    }
}
