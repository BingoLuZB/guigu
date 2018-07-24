<template>
  <div>
    <router-view></router-view>
    <footert-guide v-show="$route.meta.showfooter"/>
  </div>
</template>

<script>
  import FootertGuide from './components/FooterGuide/FooterGuide'
export default {
  name: 'App',
  components:{FootertGuide}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width: 100%
    height: 100%
    background-color: #f5f5f5
</style>
