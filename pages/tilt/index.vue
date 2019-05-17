<template>
  <section class="has-tilt">
    <h1>Tilt</h1>
    <div class="wrapper wrapper-1">

      <h1 class="title">Tilt</h1>
      <div class="card card-1">
        Card
      </div>

      <div class="card card-2">
        Other card
      </div>


    </div>

    <div class="wrapper wrapper-2">
  
      <h1 class="title">Tilt</h1>
      <div class="card card-2">
        Other card
      </div>
      <div class="card card-1">
        Card
      </div>

    </div>
  </section>

</template>

<script>

import anime from 'animejs'
import tilt from '@/utils/tilt'

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
    tilt('.card-1', '.card-2')
  },
  methods: {

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

.wrapper-2 {
  padding-right: 20rem;
  justify-content: flex-end;
  .card-1 {
    width: 12rem;
    height: 16rem;
  }

  .card-2 {
    margin-top: 7rem;
    width: 24rem;
    margin-left: -6rem;
    box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.12);
  }
}

.card {
  width: 10rem;
  height: 14rem;
  margin: 1rem;
  padding: 2rem;
  margin-bottom: 1rem;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  color: black;
}

.card-2 {
  margin-top: -2rem;
  margin-left: -3rem;
  box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.12);
}

</style>
