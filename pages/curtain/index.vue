<template>
  <section class="container mx-auto">
    <div id="canvas"></div>
    <h1>Curtain it up</h1>
    <div class="flex flex-col">
      <div class="plane mb-12">
        <img class="object-cover w-full h-full" src="@/assets/pic.jpeg">
      </div>
      <!-- <div v-for="(photo, i) in photos" class="plane mb-12" :key="photo.id" :class="photo.id" :data-index="i">
        <img class="object-cover w-full h-full" :key="photo.id" :src="photo.thumbnailUrl" crossorigin="anonymous">
      </div> -->
  </div>
  </section>
</template>

<script>
import { Curtains } from 'curtainsjs'
import anime from 'animejs'

export default {
  data() {
    return {
      photos: [],
      loaded: false
    }
  },

  async asyncData({ $axios, error }) {
    const results = await $axios.get('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10')
    return {
      photos: results.data
    }
  },

  components: {

  },

  mounted() {
    console.log('process', process.env.unsplash)
    this.init()
    // console.log('posts', this.posts)
  },

  methods: {
    init() {
      const curtains = new Curtains({
        container: 'canvas'
      })

      const planeEl = document.getElementsByClassName('plane')[0]

      const params = {
        vertexShaderID: 'plane-vs', // our vertex shader ID
        fragmentShaderID: 'plane-fs', // our fragment shader ID
        uniforms: {
          time: {
            name: 'uTime', // uniform name that will be passed to our shaders
            type: '1f', // this means our uniform is a float
            value: 0,
          }
        }
      }

      const plane = curtains.addPlane(planeEl, params)

      if (plane) {
        plane.onRender(() => {
          plane.uniforms.time.value++
        })
      }

    }
  },
  // head () {
  //   return {
  //     script: [
  //       { src: '/shaders-planevs.js', type: 'x-shader/x-vertex', id: 'plane-vs', body: true },
  //       { src: '/shaders-planefs.js', type: 'x-shader/x-fragment', id: 'plane-fs', body: true }
  //     ]
  //   }
  // }
}
</script>

<style>
#canvas {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.plane {
  width: 100%;
  height: 42rem;
}

.plane img {
  display: none;
}

h2 {
  font-size: 1rem;
}

.photo-card {
  float: right;
  opacity: 0;
}

</style>
