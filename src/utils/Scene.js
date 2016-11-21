import THREE from 'three'

export default class Scene {

    /**
     * @constructor
     */
    constructor(width, height, pixelRatio) {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,
          logarithmicDepthBuffer: true
        });
        this.renderer.setPixelRatio(pixelRatio);
        this.renderer.setSize(width, height);
    }

    /**
     * @method
     * @name add
     * @description Add a child to the scene
     * @param {object} child - A THREE object
     */
    add(child) {
        this.scene.add(child);
    }

    /**
     * @method
     * @name remove
     * @description Remove a child from the scene
     * @param {object} child - A THREE object
     */
    remove(child) {
        this.scene.remove(child);
    }

    /**
     * @method
     * @name resize
     * @description Resize the scene according to screen size
     * @param {number} newWidth
     * @param {number} newHeight
     */
    resize(newWidth, newHeight) {
        this.renderer.setSize(newWidth, newHeight);
    }

    /**
     * @method
     * @name render
     * @description Triggered on every Argon RenderEvent
     */
    render(x, y, width, height, camera) {
        this.renderer.setViewport(x, y, width, height);
        this.renderer.setScissor(x, y, width, height);
        this.renderer.setScissorTest(true);
        this.renderer.render(this.scene, camera);
    }

}
