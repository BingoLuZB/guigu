<template>
    <div>
      <shopHeader></shopHeader>
      <div class="tap">
        <ul>
          <li @click="goto('order')">点餐</li>
          <li @click="goto('evaluate')">评价</li>
          <li @click="goto('seller')">商家</li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
  import shopHeader from '../../components/shopHeader/shopHeader'
    export default {
        name: "shop",
      components:{
          shopHeader
      },
      methods:{
          goto(obj){
            this.$router.push({path: obj})
          }
      }
    }
</script>

<style scoped>

</style>
