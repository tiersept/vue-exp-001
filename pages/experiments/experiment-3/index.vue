<template>
		<section class="container">
			<div class="__canvas"></div>
		</section>
</template>

<script>
import * as THREE from 'three';

export default {
	data() {
		return {
			camera: null,
			scene: null,
			renderer: null,
			geometry: null,
			material: null,
			mesh: null,
			noise: null,
			ambientLight: null,
			spotLight: null,
				
		}
	},

	components: {

	},

	created() {

	},

	mounted() {
		window.addEventListener('resize', this.onWindowResize);
		// this.noise = new SimplexNoise();
		this.$nextTick(() => {
			console.log(this.noise);
			this.initThree();
			this.animate();
		});



	},

	destroyed() {
		window.removeEventListener('resize', this.move);
	},

	methods: {

		initThree() {
			const el = document.querySelector('.__canvas');
			console.log('el', el);
			this.scene = new THREE.Scene();
			
			this.camera = new THREE.PerspectiveCamera( 45, el.offsetWidth / el.offsetHeight, 0.1, 1000 );
			this.camera.position.set(0,0,50);
			this.camera.lookAt(this.scene.position);

			this.geometry = new THREE.IcosahedronGeometry(10, 4);
			this.material = new THREE.MeshLambertMaterial({
        color: 0xff00ee,
        wireframe: true
    	});

			this.mesh = new THREE.Mesh(this.geometry, this.material);
			this.mesh.position.set(0, 0, 0);
			this.scene.add( this.mesh );

			var noise = new SimplexNoise();
			var mesh = this.mesh
			// ADD weirdness
			this.mesh.geometry.vertices.forEach(function (vertex, i) {
				var offset = mesh.geometry.parameters.radius;
				// console.log('offset', offset)
				vertex.normalize();
				var amp = 7;
				// var time = window.performance.now();
				var rf = 0.00001;
				var distance = (offset + 1245 ) + noise.noise3D(
					vertex.x + 1 * 0.00007,
					vertex.y + 2 * 0.00008,
					vertex.z + 3 * 0.00009
				) * amp * 100000;
				vertex.multiplyScalar(distance);
			});
			this.mesh.geometry.verticesNeedUpdate = true;
			this.mesh.geometry.normalsNeedUpdate = true;
			this.mesh.geometry.computeVertexNormals();
			this.mesh.geometry.computeFaceNormals();

			//Lights
			this.ambientLight = new THREE.AmbientLight(0xaaaaaa);
			this.scene.add(this.ambientLight);

			this.spotLight = new THREE.SpotLight(0xffffff);
			this.spotLight.intensity = 0.9;
			this.spotLight.position.set(-10, 40, 20);
			this.spotLight.lookAt(this.mesh);
			this.spotLight.castShadow = true;
			this.scene.add(this.spotLight);

			this.renderer = new THREE.WebGLRenderer( { antialias: true } );
			this.renderer.setSize( el.offsetWidth, el.offsetHeight );
			console.log("inner", el.offsetWidth);
			el.appendChild( this.renderer.domElement );			
		},

    // makeRoughBall(mesh, bassFr, treFr) {
		// 	mesh.geometry.vertices.forEach(function (vertex, i) {
		// 		var offset = mesh.geometry.parameters.radius;
		// 		var time = window.performance.now(); 
		// 		vertex.normalize();
		// 		var distance = (offset + bassFr ) + this.noise.noise3D(
		// 					vertex.x + time * 0.00007,
		// 					vertex.y + time * 0.00008,
		// 					vertex.z + time * 0.00009
		// 		) * amp * treFr;
		// 		vertex.multiplyScalar(distance);
		// 	});
		// 	mesh.geometry.verticesNeedUpdate = true;
		// 	mesh.geometry.normalsNeedUpdate = true;
		// 	mesh.geometry.computeVertexNormals();
		// 	mesh.geometry.computeFaceNormals();
		// },

		animate() {
			// this.makeRoughBall(this.mesh, Math.sin(window.performance.now()) * 10, Math.sin(window.performance.now()) * 4)
			// console.log(Math.sin(window.performance.now()) * 100)

			// this.mesh.rotation.x += 0.01;
			// this.mesh.rotation.y += 0.02;

			requestAnimationFrame( this.animate );
			this.renderer.render( this.scene, this.camera );
		},

		// Makes canvas responsive
		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize( window.innerWidth, window.innerHeight );
		}		


	},

  head () {
    return {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.3.0/simplex-noise.min.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
      ]
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
