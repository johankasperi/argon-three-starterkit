import THREE from 'three'
import * as Argon from '@argonjs/argon'
import { toFixed } from '../services/MathHelpers'
import { LocationValues } from '../other/Constants'

class NativeBridge {

  constructor(app) {
    this.app = app;
    this.bridge = document.getElementById('native-bridge');

    this.addListeners();
  }

  addListeners() {
    this.bridge.addEventListener('message', function (e) {
      this.onMessage(e.detail);
    }.bind(this), false);
  }

  onMessage(data) {
    const decodedData = JSON.parse(data);
    if (decodedData.method == "fov") {
      document.getElementById("fov").innerHTML = decodedData.value;
      this.app.reality.setDesiredFov(THREE.Math.degToRad(decodedData.value));
    }
  }

  sendMessage(data) {
    const codedData = JSON.stringify(data);
    var event = new CustomEvent('sendMessage', { 'detail': codedData });
    this.bridge.dispatchEvent(event);
  }
}

export default NativeBridge
