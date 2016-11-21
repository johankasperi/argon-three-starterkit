import * as Argon from '@argonjs/argon'
import THREE from 'three'

import Scene from './utils/Scene'
import Camera from './objects/Camera'
import UserLocation from './objects/UserLocation'
import PrimaryTarget from './objects/PrimaryTarget'
import Lightning from './objects/Lightning'
import NativeBridge from './utils/NativeBridge'
import Hud from './objects/Hud'
import { LocationValues } from './other/Constants'

export default class App {

    /**
     * @constructor
     */
    constructor() {
        this.initialLocation = LocationValues.KTH;

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = window.devicePixelRatio;

        this.app = Argon.init();
        this.app.context.setDefaultReferenceFrame(this.app.context.localOriginEastUpSouth);

        this.scene = new Scene(this.width, this.height, this.pixelRatio);
        this.camera = new Camera();
        this.lightning = new Lightning();

        this.userLocation = new UserLocation();
        this.primaryTarget = new PrimaryTarget(this.initialLocation);

        this.scene.add(this.camera.obj);
        this.scene.add(this.userLocation.obj);
        this.scene.add(this.lightning.ambient);
        this.scene.add(this.lightning.sunMoonLight.lights);
        this.scene.add(this.primaryTarget.geoObject);

        this.hud = new Hud(this.primaryTarget);

        this.nativeBridge = new NativeBridge(this.camera, this.app, this.arrow, this.occlusionObjectManager, this.primaryTarget, this.hud);

        this.app.view.element.appendChild(this.scene.renderer.domElement);

        this.addListeners();
    }


    /**
     * @method
     * @name addListeners
     */
    addListeners() {
        window.addEventListener('resize', this.onResize.bind(this));
        this.app.updateEvent.addEventListener(this.update.bind(this));
        this.app.renderEvent.addEventListener(this.render.bind(this));
    }

    /**
     * @method
     * @name onResize
     * @description Triggered when window is resized
     */
    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.scene.resize(this.width, this.height);
    }

    /**
     * @method
     * @name update
     * @description Triggered by Argon
     * @param {obj} frame
     */
    update(frame) {
        const userPose = this.app.context.getEntityPose(this.app.context.user);
        // assuming we know the user's pose, set the position of our
        // THREE user object to match it
        if (userPose.poseStatus & Argon.PoseStatus.KNOWN) {
            this.userLocation.update(userPose);
        } else {
            return;
        }

        // Update other Three objects
        const targetPose = this.app.context.getEntityPose(this.primaryTarget.geoEntity);
        this.primaryTarget.update(targetPose);

        // Update HUD
        const userPoseFixed = this.app.context.getEntityPose(this.app.context.user, Argon.Cesium.ReferenceFrame.FIXED);
        const userPos = this.userLocation.obj.getWorldPosition();
        const modelPos = this.primaryTarget.geoObject.getWorldPosition();
        this.hud.update(userPoseFixed, userPos, modelPos);
    }

    /**
     * @method
     * @name render
     * @description Triggered by THREE
     */
    render() {
        // set the renderers to know the current size of the viewport.
        // This is the full size of the viewport, which would include
        // both views if we are in stereo viewing mode
        const viewport = this.app.view.getViewport();
        this.scene.resize(viewport.width, viewport.height);
        // there is 1 subview in monocular mode, 2 in stereo mode
        for (var _i = 0, _a = this.app.view.getSubviews(); _i < _a.length; _i++) {
            const subview = _a[_i];
            const frustum = subview.frustum;
            const position = subview.pose.position,
              orientation = subview.pose.orientation;

            this.camera.render(position, orientation, subview.projectionMatrix, frustum.fovy);

            const _b = subview.viewport, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
            this.scene.render(x, y, width, height, this.camera.obj);
        }
    }

}
