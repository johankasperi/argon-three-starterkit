import THREE from 'three'
import * as Argon from '@argonjs/argon'
import { toFixed } from '../services/MathHelpers'

class Hud {

    /**
     * @constructor
     */
    constructor(primaryTarget) {
        document.getElementById('ui').style.display = 'block';
        this.primaryTarget = primaryTarget;

        this.content = document.getElementById('hud');

        this.locationLatitude = document.getElementById('locationLatitude');
        this.locationLongitude = document.getElementById('locationLongitude');
        this.locationAltitude = document.getElementById('locationAltitude');
        this.locationDistance = document.getElementById('locationDistance');

        this.reloadBtn = document.getElementById('reloadBtn');
        this.addListeners();
    }

    /**
     * @method
     * @name addListeners
     */
    addListeners() {
        this.reloadBtn.addEventListener('click', this.onReload.bind(this));
    }

    onReload() {
      window.location.reload();
    }

    /**
     * @method
     * @name update
     * @description Triggered on every Argon UpdateEvent
     * @param {obj} pose
     */
    update(userPoseFixed, userPos, modelPos) {
        var gpsCartographicDeg = [0, 0, 0];
        // get user position in global coordinates
        var userLLA = Argon.Cesium.Ellipsoid.WGS84.cartesianToCartographic(userPoseFixed.position);
        if (userLLA) {
          gpsCartographicDeg = [
              Argon.Cesium.CesiumMath.toDegrees(userLLA.longitude),
              Argon.Cesium.CesiumMath.toDegrees(userLLA.latitude),
              userLLA.height
          ];
        }

        var distanceToModel = userPos.distanceTo(modelPos);
        this.locationLatitude.innerHTML = toFixed(gpsCartographicDeg[0], 6);
        this.locationLongitude.innerHTML = toFixed(gpsCartographicDeg[1], 6);
        this.locationAltitude.innerHTML = toFixed(gpsCartographicDeg[2], 2);
        this.locationDistance.innerHTML = toFixed(distanceToModel, 2);
    }

}

export default Hud
