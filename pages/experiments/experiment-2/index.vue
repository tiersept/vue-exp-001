// TODO: Extract this one into a new project
<template>
  <section class="container">
    <!-- <h1 class="__title">NEW FORTHCOMING</h1> -->
    <div class="__canvas"></div>
  </section>
</template>

<script>
import * as THREE from "three";
import * as Stats from "stats.js";
import OrbitControls from "orbit-controls-es6";

// import Logo from '~/components/Logo.vue';

export default {
  data() {
    return {
      // https://www.mathwarehouse.com/arithmetic/numbers/list-of-perfect-squares.php
      pixelsAmount: 10000,
      pixelDensity: 0.1,
      pixels: null,
      stats: null,
      camera: null,
      controls: null,
      scene: null,
      renderer: null,
      pixelGeometry: null,
      pixelMaterial: null,
      pixelPositions: [],
      meshCube: null,
      noise: null,
      currentPattern: 1,
      patternTimer: null,
      cameraPositions: [
        { x: 0, y: 0, z: 100 }, // front view
        { x: 0, y: 100, z: 0 }, // top view
        { x: 70, y: 0, z: 70 }, // 45 degree right
        { x: -70, y: 0, z: 70 } // 45 degree left
      ],
      currentCameraPosition: 0
    };
  },

  components: {},

  created() {},

  mounted() {
    window.addEventListener("resize", this.onWindowResize);

    setTimeout(() => {
      this.initThree();
      this.setupLights();
      this.addCube();
      this.addPixels();
      this.animate();
      this.scheduleNextPattern();

      this.noise = new SimplexNoise();
    }, 100);

    // this.$nextTick(() => {
    //   console.log(this.noise);
    // });
  },

  destroyed() {
    window.removeEventListener("resize", this.move);
  },

  methods: {
    initThree() {
      const el = document.querySelector(".__canvas");

      // Camera
      this.camera = new THREE.PerspectiveCamera(
        35,
        el.offsetWidth / el.offsetHeight,
        0.1,
        1000
      );
      this.camera.position.z = 200;

      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(el.offsetWidth, el.offsetHeight);
      console.log("inner", el.offsetWidth);
      el.appendChild(this.renderer.domElement);

      // Init Geometry, Material & Positions
      this.pixelGeometry = new THREE.BufferGeometry();
      this.pixelMaterial = new THREE.PointsMaterial({
        // roughness: 1,
        size: 0.1,
        color: new THREE.Color(0xff0000)
        // wireframe: true,
      });
      // this.pixelPositions = new Float32Array(this.pixelsAmount)

      //OrbitControls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.update()

      // Stats
      this.stats = new Stats();
      el.appendChild(this.stats.dom);
    },

    setupLights() {
      let ambientLight = new THREE.AmbientLight(0x0c0c0c, 100);
      this.scene.add(ambientLight);

      let spotLight = new THREE.SpotLight(0xcccccc);
      spotLight.position.set(-10, 60, 60);
      // spotLight.castShadow = true;
      this.scene.add(spotLight);
    },

    addCube() {
      let geometry = new THREE.BoxGeometry(2, 2, 2);
      let material = new THREE.MeshStandardMaterial({
        roughness: 1,
        color: new THREE.Color(0x00c500),
        wireframe: true
      });

      this.meshCube = new THREE.Mesh(geometry, material);
      // this.scene.add(this.meshCube);
    },

    addSphere(i, x, y, z) {
      let geometry = new THREE.SphereGeometry(0.1, 2, 2);
      let material = new THREE.MeshStandardMaterial({
        roughness: 0.8,
        color: new THREE.Color(),
        wireframe: true
      });

      let meshSphere = new THREE.Mesh(this.pixelGeometry, material);
      meshSphere.position.set(x, y, z);
      this.scene.add(meshSphere);
    },

    addSinglePixel(i, x, y, z) {
      let pixel = new THREE.Mesh(this.pixelGeometry, this.pixelMaterial);
      pixel.position.set(x, y, z);
      this.scene.add(pixel);
    },

    addPixels() {
      // Positioning on a grid , then in random z space
      let count = 0;
      let initPosX = -8;
      let initPosY = 0;
      let x;
      let y = -8;
      let z = 0;

      for (let i = 1; i <= this.pixelsAmount; i++) {
        x += this.pixelDensity;
        if (count / Math.sqrt(this.pixelsAmount) === 1) {
          count = 0;
        }
        if (count === 0) {
          x = initPosX;
          y += this.pixelDensity;
        }
        count++;
        // console.log(x, y, z)
        this.pixelPositions.push(x, y, z);
        // this.addSinglePixel(i, x, y, z)
      }

      this.pixelGeometry.addAttribute(
        "position",
        new THREE.Float32BufferAttribute(this.pixelPositions, 3)
      );
      this.pixelGeometry.computeBoundingSphere();
      this.pixels = new THREE.Points(this.pixelGeometry, this.pixelMaterial);
      this.scene.add(this.pixels);
    },

    animate() {
      requestAnimationFrame(this.animate);

      this.meshCube.rotation.x += 0.019;
      this.meshCube.rotation.y += 0.016;

      this.updatePositions();
      this.pixels.geometry.attributes.position.needsUpdate = true;

      this.renderer.render(this.scene, this.camera);

      this.stats.update();
    },

    updatePositions() {
      this.applyCurrentPattern();
    },

    applyCurrentPattern() {
      switch (this.currentPattern) {
        case 1:
          this.pattern1();
          break;
        case 2:
          this.pattern2();
          break;
        case 3:
          this.pattern3();
          break;
        case 4:
          this.pattern4();
          break;
        case 5:
          this.pattern5();
          break;
      }
    },

    scheduleNextPattern() {
      if (this.patternTimer) clearTimeout(this.patternTimer);
      const nextPattern = () => {
        let newPattern;
        do {
          newPattern = Math.floor(Math.random() * 5) + 1;
        } while (newPattern === this.currentPattern);

        this.currentPattern = newPattern;
        this.moveCamera();
        this.patternTimer = setTimeout(nextPattern, Math.random() * 400 + 100);
      };
      nextPattern();
    },

    moveCamera() {
      // Get next position index
      this.currentCameraPosition =
        (this.currentCameraPosition + 1) % this.cameraPositions.length;
      const newPos = this.cameraPositions[this.currentCameraPosition];

      // Add some randomness to the exact position
      const randomOffset = 20;
      const targetPos = {
        x: newPos.x + this.getRandomNrDecimal(-randomOffset, randomOffset),
        y: newPos.y + this.getRandomNrDecimal(-randomOffset, randomOffset),
        z: newPos.z + this.getRandomNrDecimal(-randomOffset, randomOffset)
      };

      // Smoothly move camera to new position
      const duration = 400; // ms
      const startPos = {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z
      };
      const startTime = Date.now();

      const animateCamera = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easing function
        const easing =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        this.camera.position.x =
          startPos.x + (targetPos.x - startPos.x) * easing;
        this.camera.position.y =
          startPos.y + (targetPos.y - startPos.y) * easing;
        this.camera.position.z =
          startPos.z + (targetPos.z - startPos.z) * easing;

        // Always look at center
        this.camera.lookAt(0, 0, 0);

        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        }
      };

      animateCamera();
    },

    pattern1() {
      this.pixels.geometry.attributes.position.array.forEach((pos, i) => {
        if (this.isOdd(i)) {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.cos(pos * this.getRandomNrDecimal(1, 10)) * 20) / Math.PI;
        } else {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.sin(pos * this.getRandomNrDecimal(1, 10)) * 20) / Math.PI;
        }
        if (this.isDivisible(i, 5)) {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.tan(pos * this.getRandomNrDecimal(1, 10)) * 0.5) / Math.PI;
        }
      });
    },

    pattern2() {
      this.pixels.geometry.attributes.position.array.forEach((pos, i) => {
        const randomFactor = this.getRandomNrDecimal(1, 8);
        if (this.isDivisible(i, 3)) {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.sin(pos * randomFactor) * 25) / Math.PI;
        } else {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.cos(pos * randomFactor) * 15) / Math.PI;
        }
        if (this.isDivisible(i, 4)) {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.sin(pos * randomFactor) * 10) / Math.PI;
        }
      });
    },

    pattern3() {
      this.pixels.geometry.attributes.position.array.forEach((pos, i) => {
        const angle = pos * 0.1;
        if (this.isDivisible(i, 2)) {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.cos(angle) * this.getRandomNrDecimal(15, 25)) / Math.PI;
        } else {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.sin(angle) * this.getRandomNrDecimal(10, 20)) / Math.PI;
        }
        if (this.isDivisible(i, 6)) {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.tan(angle) * 0.8) / Math.PI;
        }
      });
    },

    pattern4() {
      this.pixels.geometry.attributes.position.array.forEach((pos, i) => {
        const factor = this.getRandomNrDecimal(1, 5);
        if (this.isOdd(i)) {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.sin(pos * factor) * Math.cos(pos * 0.5) * 25) / Math.PI;
        } else {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.cos(pos * factor) * Math.sin(pos * 0.5) * 20) / Math.PI;
        }
        if (this.isDivisible(i, 7)) {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.sin(pos * factor) * 5) / Math.PI;
        }
      });
    },

    pattern5() {
      this.pixels.geometry.attributes.position.array.forEach((pos, i) => {
        const factor = this.getRandomNrDecimal(1, 6);
        if (this.isDivisible(i, 2)) {
          this.pixels.geometry.attributes.position.array[i] =
            ((Math.sin(pos * factor) + Math.cos(pos * 0.3)) * 15) / Math.PI;
        } else {
          this.pixels.geometry.attributes.position.array[i] =
            ((Math.cos(pos * factor) + Math.sin(pos * 0.3)) * 12) / Math.PI;
        }
        if (this.isDivisible(i, 3)) {
          this.pixels.geometry.attributes.position.array[i] =
            (Math.tan(pos * 0.1) * 0.7) / Math.PI;
        }
      });
    },

    // Makes canvas responsive
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    getRandomNrDecimal(min, max) {
      return Math.random() * (max - min) + min;
    },

    isDivisible(num, factor) {
      return num % factor === 0;
    },

    isOdd(num) {
      return num % 2 == 1;
    }
  }
};
</script>

<style lang="stylus" scoped>
.container
    overflow hidden
    margin 0 auto
    max-height 100vh
    display flex
    justify-content center
    align-items center
    text-align center

.__canvas
    position absolute
    width 100%
    height 100vh
    top 0
    left 0
    z-index -1

.__title
    position relative
    margin-top 35%
    left 12%
    text-align left
    color #00ff8d
    font-size 12rem
    z-index 999
    opacity .2
</style>
