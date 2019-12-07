<template>
  <section class="app-main">
    <app-header>header</app-header>

      <!-- <router-view :key="key"></router-view> -->
      <router-view id="main"></router-view>
    <app-right-nav></app-right-nav>
    <app-footer>footer</app-footer>
  </section>
</template>

<script>
  import AppHeader from './AppHeader'
  import AppFooter from './AppFooter'
  import AppRightNav from './AppRightNav'
export default {
  name: 'AppMain',
  components:{AppHeader,AppFooter,AppRightNav},
  data(){
    return {
    }
  },
  mounted(){},
  computed: {

  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

#main{
  width:100%;
  min-width: 1280px;
}
</style>
