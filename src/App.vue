<template>
  <div>
    <router-view></router-view>
    <footert-guide v-show="$route.meta.showfooter"/>
  </div>
</template>

<script>
  import FootertGuide from './components/FooterGuide/FooterGuide'
  import {mapActions} from 'vuex'
  export default {
    mounted(){
      this.$store.dispatch('getAddress')
      if(sessionStorage.getItem('userInfo')){
        this.$store.dispatch('saveUser',{name:'娃哈哈',phone:13249267670})
      }
    } ,
    methods:{
      ...mapActions(['saveUser']),
    },
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
