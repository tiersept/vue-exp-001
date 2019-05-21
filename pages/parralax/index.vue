<template>
  <section class="section-1">
    <h1>Parralax</h1>

    <div class="container">
      <div class="half">
        <p>Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat.</p>
      </div>
      
      <div class="half">
        <div class="image-container parralax"  data-speed="4" >
          <img src="https://source.unsplash.com/random/640x420" alt="">
        </div>
        <div class="box"></div>
      </div>
    </div>

    <div class="container">
      <div class="half">
        <div class="image-container parralax"  data-speed="-2">
          <img src="https://source.unsplash.com/random/640x420" alt="">
        </div>
        <div class="box"></div>
      </div>

      <div class="half">
        <p>Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat.</p>
      </div>
    </div>

    <div class="container">
      <div class="half">
        <p>Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat.</p>
      </div>
      
      <div class="half">
        <div class="image-container parralax"  data-speed="1">
          <img src="https://source.unsplash.com/random/640x420" alt="">
        </div>
        <div class="box"></div>
      </div>
    </div>

    <div class="container">
      <div class="half">
        <div class="image-container parralax"  data-speed="2">
          <img src="https://source.unsplash.com/random/640x420" alt="">
        </div>
        <div class="box"></div>
      </div>

      <div class="half">
        <p>Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat.</p>
      </div>
    </div>

  </section>

</template>

<script>

import anime from 'animejs'
import parralax from '@/utils/parralax'

export default {
  data() {
    return {

    }
  },

  async asyncData({ $axios, query, error }) {

  },

  components: {

  },
  mounted() {
    this.initParralax();

  },
  methods: {
    initParralax() {
      const parralax = new Parralax('.parralax', {
        center: false,
        callback: function(positions) {
          // callback every position change
          console.log(positions);
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60vh;
}

.container {
  display: flex;
  padding: 4.2rem 8.4rem;
  .half {
    position: relative;
    margin: 0 4.2rem;
    width: 50%;
  }
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 44px rgba(0,0,0, .18);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.box {
  display: block;
  position: absolute;
  width: 32rem;
  height: 24rem;
  top: -2rem;
  right: -4rem;
  background: rgba(0,0,0,.14);
  z-index: -1;
}

</style>
