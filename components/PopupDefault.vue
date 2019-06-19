<template>
  <div>
    <transition name="slide-fade">
      <div v-show="isActive" class="popup" id="popup-default">
        <button @click="goBack">go back</button>
        <h1>Popup component</h1>
        <p>Populate content</p>
      </div>  
    </transition>  
  </div>
</template>

<script>
export default {
  name: 'PopupDefault',
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    // console.log("mounted")
    this.isActive = true
    console.log('params', this.$route.params)
  },
  beforeDestroy() { //DOESNT WORK
    // console.log("before destroy")
    this.isActive = false
  },
  methods: {
    goBack() {
      this.isActive = false
      setTimeout(() => {
        this.$router.back()
      },800)
      
    }
  }
}
</script>

<style scoped>
.popup {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 9999;
  width: 50%;
  height: 50%;
  background: red;
}


</style>
