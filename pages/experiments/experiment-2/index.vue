<template>
        <section class="container">
            <!-- <h1 class="__title">NEW FORTHCOMING</h1> -->
            <div class="__canvas">

            </div>
        </section>

</template>

<script>
import * as THREE from 'three';
// import Logo from '~/components/Logo.vue';

export default {
	data() {
		return {
			camera: null,
			scene: null,
			renderer: null,
			geometry: null,
			material: null,
			meshCube: null
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
			this.addSpheres();
			this.animate();
		}, 1000);

	},

	destroyed() {
		window.removeEventListener('resize', this.move);
	},

	methods: {

		initThree() {
			const el = document.querySelector('.__canvas');
			console.log('el', el);
			this.camera = new THREE.PerspectiveCamera( 70, el.offsetWidth / el.offsetHeight, 0.01, 10 );
			this.camera.position.z = 1;

			this.scene = new THREE.Scene();

			this.renderer = new THREE.WebGLRenderer( { antialias: true } );
			this.renderer.setSize( el.offsetWidth, el.offsetHeight );
			console.log("inner", el.offsetWidth);
			el.appendChild( this.renderer.domElement );			
		},

		setupLights() {
			let ambientLight = new THREE.AmbientLight(0x0c0c0c, 12);
			this.scene.add(ambientLight);
			
			let spotLight = new THREE.SpotLight(0xcccccc);
			spotLight.position.set(-10, 60, 60);
			spotLight.castShadow = true;
			this.scene.add(spotLight);
		},

		addCube() {
			let geometry = new THREE.BoxGeometry( 0.6, 0.6, 0.6 );
			let material = new THREE.MeshStandardMaterial({
					roughness: 0.8,
					color: new THREE.Color(0x00c500),
					wireframe: true,
			});

			this.meshCube = new THREE.Mesh( geometry, material );
			this.scene.add( this.meshCube );			
		},

		addSphere(i, x, y, z) {
			let geometry = new THREE.SphereGeometry( .1, 10, 10 );
			let material = new THREE.MeshStandardMaterial({
				roughness: 0.8,
				color: new THREE.Color(),
				wireframe: true,
			});

			let meshSphere = new THREE.Mesh( geometry, material );
			meshSphere.position.set(x, y, z);
			this.scene.add( meshSphere );

		},

		addSpheres() {
			// Positioning on a grid , then in random z space
			const count = 50;
			let cols = 0;
			let y = 2;
			for (let i = 1; i < count; i++) {
				cols++;
				let n = 0.5 * (cols * 1.25);
				let x = -2.8 + n;
				if(cols % 10 === 0 ) {
					cols = 0;
					y--
				}
				let z = -5 * Math.random();
				this.addSphere(i, x, y, z);
			}
		},

		animate() {
			requestAnimationFrame( this.animate );

			this.meshCube.rotation.x += 0.009;
			this.meshCube.rotation.y += 0.006;

			this.renderer.render( this.scene, this.camera );
		},

		// Makes canvas responsive
		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize( window.innerWidth, window.innerHeight );
		}		


	}

}
</script>

<style lang="stylus">
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
