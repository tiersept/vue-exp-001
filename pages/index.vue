<template>
  <section class="container">
    <div>
      <h1 class="title">
        Experiments
      </h1>
      <h2 class="subtitle">
        Try whatever
      </h2>
      <div class="links">
        <nuxt-link 
        to="/experiments"
        class="button--green">
          Experiments
        </nuxt-link>

        <nuxt-link 
        class="button--green"
        to="/experiments">
          What is this?
        </nuxt-link>

        <nuxt-link 
        to="/posts"
        class="button--green">
          Posts
        </nuxt-link>

        <!-- <nuxt-link 
        to="/posts/post/145"
        class="button--green">
          Posts 145
        </nuxt-link> -->

        <nuxt-link to="/post/145"
        class="button--green">
          Popup Post 145
        </nuxt-link>

        <nuxt-link to="/parallel"
        class="button--green">
          Go Parallel
        </nuxt-link>

        <nuxt-link to="/tilt"
        class="button--green">
          Go Tilt
        </nuxt-link>

        <nuxt-link to="/parralax"
        class="button--green">
          Go Parralax
        </nuxt-link>

        <nuxt-link to="/svg"
        class="button--green">
          Go SVG
        </nuxt-link>

      </div>
    </div>

    <div>
      <transition 
        @enter="enter"
        @leave="leave"
        :css=false
      >
        <span v-if="showPopup">
          <NuxtChild name="popup"/>
        </span>
        
      </transition>
    </div>
  
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data() {
    return {
      showPopup: false
    }
  },
  components: {
    Logo
  },
  mounted() {

    this.$nuxt._route.name === 'index-post' ? this.showPopup = true : this.showPopup = false

  },

  methods: {
    enter (el, done) {
      console.log(el, 'in')
      done()
    },
    leave (el, done) {
      console.log(el, 'leave')
      done()
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.from-right-enter-active, .from-right-leave-active {
  transition: all 4s cubic-bezier(0, 0.26, 0, 0.99);
}
.from-right-enter, .from-right-leave-to {
  transform: translateX(24rem);
  opacity: 0;
}

</style>
