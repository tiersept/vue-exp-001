<template>
  <div class="grid-x grid-margin-x">

    <section class="cell large-12 hero">
      <transition
        @enter="handleEnter"
        appear
      >
        <div class="anime-1">
          <h1>Title reveal animations</h1>
          <span class="clip"></span>
        </div>
      </transition>
    </section>

    <section class="cell large-12 medium-6">
        <div class="anime anime-2">
          <h1>A New Hope</h1>
          <span class="clip"></span>
        </div>
    </section>

    <section class="cell large-12 medium-6">
      <div class="anime anime-3">
        <h1>The Empire Strikes Back</h1>
      </div>
    </section>

    <section class="cell large-12 medium-6">
      <div class="anime anime-4">
        <h1>Return of the Jedi</h1>
      </div>
    </section>

    <section class="cell large-12 medium-6">
      <div class="anime anime-5">
        <h1>The Phantom Menace</h1>
      </div>
    </section>


  </div>
</template>

<script>

import anime from 'animejs'
import scrollMonitor from 'scrollmonitor'

export default {
  data() {
    return {
      lastScrollTop: 0,
      scrollUp: false,
      scrolled: false
    }
  },

  async asyncData({ $axios, params, query, error }) {

  },

  components: {

  },

  mounted() {
    this.initScrollMonitor();
    this.initScrollEvents();
  },

  destroyed() {
    window.removeEventListener('scroll', this.scrollDirectionInit);
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {

    handleScroll() {

    },

    initScrollEvents() {
      window.addEventListener("scroll", this.scrollDirectionInit, false);
      window.addEventListener('scroll', this.handleScroll);
    },

    scrollDirectionInit() {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > this.lastScrollTop){
        this.scrollUp = false
      } else {
        this.scrollUp = true
      }
      this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      return
    },

    initScrollMonitor() {

      const elArr = document.querySelectorAll('.anime');
      var vm = this;

      //init watchers
      elArr.forEach(el => {
        let watchEl = scrollMonitor.create( el, {top: -200, bottom: -100});
        let watchElFull = scrollMonitor.create( el, {top: 300, bottom: 300} );

        watchEl.enterViewport(function() {
          // console.log('watchEl', watchEl)
          // watchEl.recalculateLocation()
          // watchElFull.recalculateLocation()
          let animeIn = anime({
            targets: el.querySelector('h1'),
            opacity: [0, 1],
            translateY: function() {
              console.log('scroll enter')
              return vm.scrollUp ? [-42, 0] : [-42, 0]
            },
            scaleY:
              [
                { value: 3, duration: 300 },
                { value: 1, duration: 400 }
              ],
            clipPath: function() {
              return vm.scrollUp ? ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'] : ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']
            },
            duration: 600,
            transformOrigin: function() {
              return vm.scrollUp ? '50% 0%' : '50% 100%';
            },
            easing: 'easeInOutCubic',
          });
          return
        });

        watchEl.exitViewport(function() {
          let animeOut = anime({
            targets: el.querySelector('h1'),
            opacity: {
              value: 0,
              duration: 300,
              delay: 100,
              easing: 'easeOutQuart'
            },
            translateY: function() {
              return vm.scrollUp ? [0, -42] : [0, 42]
            },
            // clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
            duration: 400,
            easing: 'easeOutQuart',
          });
          return
        });


      })
      return
    },

    handleEnter() {
      // Test Hero title
      let animeOneTitle = anime({
        targets: '.anime-1 h1',
        opacity: [0, 1],
        // clipPath: ['polygon(34% 0%, 66% 15%, 189% 111%, -62% 79%)', 'polygon(0% 0%, 277% 148%, 221% 140%, 80% 46%)'],
        clipPath: ['polygon(0% 0%, 277% 148%, 221% 140%, 80% 46%)', 'polygon(20% 0%, 105% 15%, 189% 111%, -62% 79%)'],
        // loop: true,
        duration: 1400,
        easing: 'easeInOutSine'
      });
      return
    }
  }
}
</script>

<style lang="scss" scoped>

section {
  width: 100%;
  height: 80vh;
  background: #1d1d1d;

  h1 {
    width: -webkit-fit-content;
    padding: 0 2.4rem;
    text-align: left;
    color: white;
    font-size: 6rem;
    opacity: 0;
    // backface-visibility: visible;
    transform-style: preserve-3d;
  }

  &:nth-child(even) {
    // @include horizontal(flex-start, flex-end);
    background: #8805ff;

    h1 {
      text-align: right;
    }
  }

  // @include breakpoint(medium only) {
  //   margin-bottom: 30px;

  //   h1 {
  //     font-size: 4rem;
  //   }
  // }
}

.anime-1 {
  position: relative;
  width: -webkit-fit-content;

  h1 {
    width: -webkit-fit-content;
    -webkit-text-fill-color: white; /* Will override color (regardless of order) */
    // clip-path: polygon(0% 0%, 277% 148%, 221% 140%, 80% 46%);
  }

  // &:after {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background: #6200ff;
  //   clip-path: polygon(25% 0%, 100% 30%, 75% 100%, 75% 100%);
  //   mix-blend-mode: hard-light;
  //   transition: all .24s ease-in;
  // }
}

.anime-2 {
  position: relative;
  width: -webkit-fit-content;

  h1 {
    width: -webkit-fit-content;
    -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: white;
  }
}

</style>
