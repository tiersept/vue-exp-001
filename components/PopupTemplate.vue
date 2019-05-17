<template>
  <div class="post">
    <transition name="fade-down">
      <div v-show="isActive" class="nav">
      </div>
    </transition>
    <button @click="handler">Go back</button>
    <h2>Child content</h2>
    ID:{{ id }}
  </div>
</template>

<script>
export default {
  name: 'Child',
  data() {
    return {
      isActive: false
    }
  },
  validate({ params }) {
    return !isNaN(+params.id)
  },
  mounted() {
    console.log('mounted')
    this.$nextTick(() => {
      this.isActive = true;
    });
  },
  beforeDestroy() {
    console.log('Destroy');
    this.isActive = false;
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    handler() {
      this.$nuxt.$router.back()
    }
  }
}
</script>

<style scoped>
  .nav {
    position: fixed;
    height: 4rem;
    width: 100vw;
    top: 0;
    left: 0;
    background: #171717;
    box-shadow: 0 4px 12px rgba(0,0,0,12);
  }

  .post {
    overflow: hidden
  }

  .fade-down-enter-active, .fade-down-leave-active {
    transition: all .6s .6s cubic-bezier(0, 0.26, 0, 1);
  }
  .fade-down-enter, .fade-down-leave-to {
    transform: translateY(-4rem);
    opacity: 0;
  }

</style>
