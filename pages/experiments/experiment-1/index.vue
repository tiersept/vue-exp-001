<template>
		<section class="container">
			<h1 class="__title">NEW FORTHCOMING</h1>
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
			mesh: null
				
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

			this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
			this.material = new THREE.MeshNormalMaterial();

			this.mesh = new THREE.Mesh( this.geometry, this.material );
			this.scene.add( this.mesh );

			this.renderer = new THREE.WebGLRenderer( { antialias: true } );
			this.renderer.setSize( el.offsetWidth, el.offsetHeight );
			console.log("inner", el.offsetWidth);
			el.appendChild( this.renderer.domElement );			
		},

		animate() {
			requestAnimationFrame( this.animate );

			this.mesh.rotation.x += 0.01;
			this.mesh.rotation.y += 0.02;

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
