import THREE from 'three'

class UserLocation {

    /**
     * @constructor
     */
    constructor() {
        this.obj = new THREE.Object3D();
    }

    /**
     * @method
     * @name update
     * @description Triggered on every Argon UpdateEvent
     * @param {obj} pose
     */
    update(pose) {
        this.obj.position.copy(pose.position);
    }

}

export default UserLocation
