/// <reference path="_reference.ts"/>

// Josh Bender - 300746563
// Last Updated 02/03/2016
// Comp392 MidTerm

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;
import ImageUtils = THREE.ImageUtils;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var tower: Object3D;
    var spotLight: SpotLight;
    var ambientLight: AmbientLight;
    var plane: Mesh;
    var towerObjects: Mesh[];
    var cubeGeometry: CubeGeometry;
    var cubeMaterial: LambertMaterial;
    var axes: AxisHelper;
    var sphereMaterial: LambertMaterial;
    var sphereGeometry: SphereGeometry;
    var sphere: Mesh;

    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        
        setupRenderer(); // setup the default renderer
	
        setupCamera(); // setup the camera

        towerObjects = []; // Initialize the array to hold the towerObjects
        
        // add an axis helper to the scene
        axes = new AxisHelper(15);
        scene.add(axes);
        console.log("Added Axis Helper to scene..."); 
        
        //Add a Plane to the Scene
        plane = new gameObject(
            new PlaneGeometry(24, 24, 1, 1),
            new LambertMaterial({ map: ImageUtils.loadTexture("../../Assets/darkStoneTexture.jpg") }),
            0, 0, 0);
            plane.castShadow = true;
            plane.receiveShadow = true;
    
        plane.rotation.x = -0.5 * Math.PI;
    
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");
        
        // Start with creating an empty group for tower
        tower = new Object3D();
        tower.position.set(0, 0, 0);
        scene.add(tower);
        console.log("Added tower to scene...");
        
        // Set Mat and Geometry to use for cubes
        cubeMaterial = new LambertMaterial({ map: ImageUtils.loadTexture("../../Assets/towerTexture.jpg") });
        cubeGeometry = new CubeGeometry(3, 2, 3);
        
        //Add Cubes to the tower
        for (var i = 0; i < 5; i++){
            towerObjects[i] = new Mesh(cubeGeometry, cubeMaterial);
            towerObjects[i].castShadow = true;
            towerObjects[i].receiveShadow = true;
            towerObjects[i].position.x = 0;
            towerObjects[i].position.y = 1 + i * 2;
            towerObjects[i].position.z = 0;
            tower.add(towerObjects[i]);
            cubeGeometry = new CubeGeometry(3 - (1 + i) * 0.3, 2, 3 - (1 + i) * 0.3);
        }
        
        // Set Mat and Geo for sphere
        sphereMaterial = new LambertMaterial({ map: ImageUtils.loadTexture("../../Assets/metalTexture.jpg") });
        sphereGeometry = new SphereGeometry(0.5);
        
        
        // Add a sphere to the top of the tower
        sphere = new Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = false;
        sphere.receiveShadow = true;
        sphere.position.x = 0;
        sphere.position.y = 10.5;
        sphere.position.z = 0;
        towerObjects[5] = sphere;
        tower.add(sphere);
        
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0x949494);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
    	
        // Add a SpotLight to the scene
        spotLight = new SpotLight(0xFFFFFF);
        spotLight.position.set(5.6, 23, 10.4);
        spotLight.rotation.set(-0.8, 42.7, 19.5);
        spotLight.castShadow = true;
        spotLight.shadowCameraFar = 1000;
        spotLight.shadowCameraNear = 0.1;
        spotLight.intensity = 2;
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");
        
        // add controls
        gui = new GUI();
        control = new Control(0, 0, 0, 0, 0, 1);
        addControl(control);

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        window.addEventListener('resize', onResize, false);
        
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	

    }

    function addControl(controlObject: Control): void {
        gui.add(controlObject, 'cube1Speed', -0.2, 0.2);
        gui.add(controlObject, 'cube2Speed', -0.2, 0.2);
        gui.add(controlObject, 'cube3Speed', -0.2, 0.2);
        gui.add(controlObject, 'cube4Speed', -0.2, 0.2);
        gui.add(controlObject, 'cube5Speed', -0.2, 0.2);
        gui.add(controlObject, 'towerScale', 0, 1);
    }

    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }

    // Setup main game loop
    function gameLoop(): void {
        stats.update();
        
        // rotate tower Cubes
        towerObjects[0].rotation.y += control.cube5Speed;
        towerObjects[1].rotation.y += control.cube4Speed;
        towerObjects[2].rotation.y += control.cube3Speed;
        towerObjects[3].rotation.y += control.cube2Speed;
        towerObjects[4].rotation.y += control.cube1Speed;
        
        // Scale Tower
        for (var m in towerObjects){
            towerObjects[m].scale.x = control.towerScale;
            towerObjects[m].scale.y = control.towerScale;
            towerObjects[m].scale.z = control.towerScale;
        }
        
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x333333, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 15.3;
        camera.position.y = 18.5;
        camera.position.z = -28.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    
    // Resize function
    function onResize(): void {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }


    window.onload = init;

    return {
        scene: scene
    }

})();

