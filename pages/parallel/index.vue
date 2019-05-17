<template>
  <section class="container-vert">
    <h1>Parallel</h1>
    <div class="wrapper">
      <transition name="fade-up">
        <div class="half">
          <div v-for="post in posts" :key="post.id" class="card">
            <h2>{{ post.title }}</h2>
          </div>
        </div>
      </transition>
      <div class="half">
        <transition-group
          @enter="handleEnter"
          appear
        >
          <div v-for="photo in photos" :key="photo.id"  class="photo-card" :class="photo.id">
            <img :key="photo.id" :src="photo.thumbnailUrl">
          </div>
        </transition-group>
      </div>
    </div>
  </section>

</template>

<script>

import anime from 'animejs'

export default {
  data() {
    return {

    }
  },

  async asyncData({ $axios, query, error }) {
    let [postRes, photosRes] = await Promise.all([
      $axios.get('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=500'),
      $axios.get('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=50'),
    ])
    return {
       posts: postRes.data,
       photos: photosRes.data
    }
  },

  components: {

  },
  mounted() {
    // console.log('posts', this.posts)
  },
  methods: {
    handleEnter(done) {
      anime({
        targets: '.photo-card',
        translateX: 270,
        delay: anime.stagger(100) // increase delay by 100ms for each elements.
      });

    }
  }
}
</script>

<style>
container-vert {
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.wrapper {
  display: flex;
  width: 100%
}

.half {
  width: 50%
}

.card {
  width: 10rem;
  padding: 2rem;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  color: black;
  float: right;
}

h2 {
  font-size: 1rem;
}

.photo-card {
  float: right;
}

</style>
