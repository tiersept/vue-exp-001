<template>
  <section class="container">
    <div>
      <h1 class="title">
        Posts
      </h1>

      <div class="links">

        <a
        href="posts/post/145"
        class="button--green">
          post 145
        </a>

      </div>
    </div>

    <!-- <div>
      <transition name="from-right">
        <div v-if="this.$nuxt._route.name !== 'posts'" class="popup">
          <NuxtChild />
        </div>
      </transition>
    </div> -->


    <transition name="from-right">
      <div v-if="showPopup">
        <NuxtChild name="popup"/>
      </div>
    </transition>



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
    console.log(this.$nuxt._route.name);
    this.$nextTick(() => {
      this.$nuxt._route.name === 'posts-post' ? this.showPopup = true : this.showPopup = false
    });
    console.log(this.showPopup);

  },

  beforeDestroy() {
    console.log("beforeDestroy posts")
  }

}

</script>

<style>

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
  transition: all .6s cubic-bezier(0, 0.26, 0, 0.99);
}
.from-right-enter, .from-right-leave-to {
  transform: translateX(24rem);
  opacity: 0;
}

.grow-in-enter-active, .grow-in-leave-active {
  transition: all .6s cubic-bezier(0, 0.26, 0, 0.99);
}
.grow-in-enter, .grow-in-leave-to {
  transform: scale(0);
  opacity: 0;
}

.fade-up-enter-active, .fade-up-leave-active {
  transition: all .6s cubic-bezier(0, 0.26, 0, 1);
}
.fade-up-enter, .fade-up-leave-to {
  transform: translateY(24rem);
  opacity: 0;
}

</style>
