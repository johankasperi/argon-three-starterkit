import THREE from 'three'
import * as Argon from '@argonjs/argon'
import { LocationValues } from '../other/Constants'
import { toFixed } from '../services/MathHelpers'

class PrimaryTarget {

    /**
     * @constructor
     */
    constructor(initialLocation) {
        this.geoObject = new THREE.Object3D();

        this.geoEntity = new Argon.Cesium.Entity({
            name: initialLocation.name,
            position: Argon.Cesium.Cartesian3.fromDegrees(initialLocation.long, initialLocation.lat, initialLocation.alt),
            orientation: Argon.Cesium.Quaternion.IDENTITY
        });

        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        this.obj = new THREE.Mesh(geometry, this.cubeMaterial);
        this.geoObject.add(this.obj);
    }

    /**
     * @method
     * @name update
     * @description Triggered on every Argon UpdateEvent
     * @param {obj} pose
     */
    update(pose) {
      this.geoObject.position.copy(pose.position)
    }

}

export default PrimaryTarget
