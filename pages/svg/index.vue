<template>
  <section class="section-1">

    <h1>SVG goodness</h1>

    <div class="container">
      <div class="box box-1"></div>
      <div class="box box-2"></div>
    </div>


    <div class="grid-x">
      <div class="cell medium-6 large-4">
        <div class="image-container large">
          <img src="https://source.unsplash.com/random" alt="">
        </div>
      </div>
      <div class="cell medium-6 large-8">
        <div class="text-container">
          <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Donec sollicitudin molestie malesuada. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Donec sollicitudin molestie malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
        </div>
      </div>
    </div>

  </section>

</template>

<script>

import { TweenMax, TimelineLite, Expo, Elastic, CSSPlugin } from "gsap/TweenMax";

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
    TweenMax.to('.box-1', 2, {rotation:30, scaleX:0.8});

  },
  methods: {


  }
}
</script>

<style lang="scss" scoped>

.section-1 {
  padding-left: 4.8rem;
  padding-right: 4.8rem;
}

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
  padding: 4.2rem 8.4rem;
  @include horizontal(center, flex-end);
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
  &.large {
    width: 24rem;
    height: 18rem;
  }
}
.box-1 {
  display: block;
  position: absolute;
  width: 32rem;
  height: 24rem;
  top: -2rem;
  right: -4rem;
  background: rgba(0,0,0,.14);
  z-index: -1;
}
.box-2 {
  display: block;
  width: 32rem;
  height: 24rem;
  background: rgba(0,0,0,.14);
}

</style>
