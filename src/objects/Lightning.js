import THREE from 'three'
import '../lib/ArgonSunMoon.js'

class Lightning {

    /**
     * @constructor
     */
    constructor() {
      this.ambient = new THREE.AmbientLight( 0x101030 );
      this.sunMoonLight = new THREE.SunMoonLights();
    }

}

export default Lightning
