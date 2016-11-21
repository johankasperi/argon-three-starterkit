import THREE from 'three'
import * as Argon from '@argonjs/argon'
import { toFixed } from '../services/MathHelpers'
import { LocationValues } from '../other/Constants'

class NativeBridge {

  constructor(app) {
    this.app = app;
    this.initialized = false;
    this.hasPosition = false;
    this.hasFOV = false;
    this.addListeners();
  }

  addListeners() {
    document.addEventListener('message', function (e) {
      this.onMessage(e.detail);
    }.bind(this), false);
  }

  onMessage(data) {
    const decodedData = JSON.parse(data);
    if (decodedData.method == "fov") {
      //document.getElementById("fov").innerHTML = decodedData.value;
      this.app.reality.setDesiredFov(THREE.Math.degToRad(decodedData.value));
      //this.camera.setFOV(decodedData.value);
      this.hasFOV = true;
    }
  }

  sendMessage(data) {
    const codedData = JSON.stringify(data);
    var event = new CustomEvent('sendMessage', { 'detail': codedData });
    window.postMessage(event);
  }
}

export default NativeBridge
