import THREE from 'three'

class Camera {

    /**
     * @constructor
     */
    constructor() {
        this.vfov = null;
        this.hfov = null;

        this.obj = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 10000000);
        this.obj.updateProjectionMatrix();
        this.setFOV.bind(this);
    }

    setFOV(value) {
      this.vfov = value * this.obj.aspect;
      this.hfov = value;
      this.obj.fov = this.hfov;
      document.getElementById("fov").innerHTML = this.obj.fov;
      this.obj.updateProjectionMatrix();
    }

    /**
     * @method
     * @name render
     * @description Triggered on every Argon RenderEvent
     */
    render(position, orientation, projectionMatrix, fovy) {
        this.obj.position.copy(position);
        this.obj.quaternion.copy(orientation);
        this.obj.projectionMatrix.fromArray(projectionMatrix);
        this.obj.fov = THREE.Math.radToDeg(fovy);
    }

}

export default Camera
