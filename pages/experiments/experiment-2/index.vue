<template>
        <section class="container">
            <!-- <h1 class="__title">NEW FORTHCOMING</h1> -->
            <div class="__canvas">

            </div>
        </section>

</template>

<script>
import * as THREE from 'three'
import * as Stats from 'stats.js'
// import Logo from '~/components/Logo.vue';

export default {
	data() {
		return {
      // https://www.mathwarehouse.com/arithmetic/numbers/list-of-perfect-squares.php
      pixelsAmount: 6084,
      pixelDensity: .2,
      pixels: null,
      stats: null,
			camera: null,
			scene: null,
			renderer: null,
			pixelGeometry: null,
      pixelMaterial: null,
      pixelPositions: [],
      meshCube: null,
		}
	},

	components: {

	},

	created() {

	},

	mounted() {
		window.addEventListener('resize', this.onWindowResize);

		setTimeout(() => {
			this.initThree();
			this.setupLights();
			this.addCube();
      this.addPixels();

      this.animate();

		}, 100);

	},

	destroyed() {
		window.removeEventListener('resize', this.move);
	},

	methods: {

		initThree() {
      const el = document.querySelector('.__canvas')

      // Camera
			this.camera = new THREE.PerspectiveCamera( 35, el.offsetWidth / el.offsetHeight, 0.1, 1000 );
			this.camera.position.z = 200;

			this.scene = new THREE.Scene();

			this.renderer = new THREE.WebGLRenderer( { antialias: true } );
			this.renderer.setSize( el.offsetWidth, el.offsetHeight );
			console.log("inner", el.offsetWidth);
      el.appendChild( this.renderer.domElement );

      // Init Geometry, Material & Positions
      this.pixelGeometry = new THREE.BufferGeometry()
			this.pixelMaterial = new THREE.PointsMaterial({
          // roughness: 1,
          size: .1,
					color: new THREE.Color(0xFF0000),
					// wireframe: true,
      })
      // this.pixelPositions = new Float32Array(this.pixelsAmount)

      // Stats
      this.stats = new Stats()
      el.appendChild( this.stats.dom )
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
			let geometry = new THREE.BoxGeometry( 2, 2, 2 );
			let material = new THREE.MeshStandardMaterial({
					roughness: 1,
					color: new THREE.Color(0x00c500),
					wireframe: true,
			});

			this.meshCube = new THREE.Mesh( geometry, material );
			this.scene.add( this.meshCube );
		},

		addSphere(i, x, y, z) {
			let geometry = new THREE.SphereGeometry( .1, 2, 2 );
			let material = new THREE.MeshStandardMaterial({
				roughness: 0.8,
				color: new THREE.Color(),
				wireframe: true,
			});

			let meshSphere = new THREE.Mesh( this.pixelGeometry, material );
			meshSphere.position.set(x, y, z);
			this.scene.add( meshSphere );

		},

		addSinglePixel(i, x, y, z) {
			let pixel = new THREE.Mesh( this.pixelGeometry, this.pixelMaterial );
			pixel.position.set(x, y, z);
			this.scene.add( pixel );
		},

		addPixels() {
      // Positioning on a grid , then in random z space
      let count = 0
      let initPosX = -8
      let initPosY = 0
      let x
      let y = -8
      let z = 0

      for (let i = 1; i <= this.pixelsAmount; i++) {
        x += this.pixelDensity
        if (count / Math.sqrt(this.pixelsAmount) === 1 ) {
          count = 0
        }
        if (count === 0){
          x = initPosX
          y += this.pixelDensity
        }
        count++
        // console.log(x, y, z)
        this.pixelPositions.push(x, y, z)
        // this.addSinglePixel(i, x, y, z)
      }

      this.pixelGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( this.pixelPositions, 3 ) )
      this.pixelGeometry.computeBoundingSphere()
			this.pixels = new THREE.Points( this.pixelGeometry, this.pixelMaterial )
      this.scene.add( this.pixels )

		},

		animate() {
			requestAnimationFrame( this.animate );

			this.meshCube.rotation.x += 0.019;
			this.meshCube.rotation.y += 0.016;

      this.updatePositions()
      this.pixels.geometry.attributes.position.needsUpdate = true

      this.renderer.render( this.scene, this.camera );

      this.stats.update()
    },

    updatePositions () {
      this.pixels.geometry.attributes.position.array.forEach((pos, i) => {
        this.pixels.geometry.attributes.position.array[i] = Math.tan(pos * this.getRandomNrDecimal(-.2, .2)) * 20
      })
    },

		// Makes canvas responsive
		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize( window.innerWidth, window.innerHeight );
    },

    getRandomNrDecimal (min, max) {
      return Math.random() * (max - min) + min
    }


	}

}
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
    font-size 18rem
    z-index 999
</style>
