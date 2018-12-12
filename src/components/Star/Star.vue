<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(item,index) in starArr" :class="item" :key="index"></span>
  </div>
</template>

<script>
    export default {
        name: "Star",
      props:['score','size'],
      computed: {
        starArr(){
          let starOn = 'on',starHalf = 'half',starOff = 'off',starArr = [];
          //先on，然后到half，最后才到off，
          // 有0个或最多5个on满星   只有1个或0个半星half，有0个或最多5个灰星
          let scoreOn = parseInt(this.score),   //有星 取整
            scoreHalf = Math.round(this.score),   //半星  四舍五入
            scoreOff = 5 - scoreHalf;             //灰星   减去四舍五入之后的半星
          for(var i = 0;i<scoreOn;i++){
            starArr.push(starOn)
          }
          if(scoreHalf > this.score){
            starArr.push(starHalf)
          }
          for(var k = 0;k<scoreOff;k++){
            starArr.push(starOff)
          }
          return starArr
        }
      }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
         width 20px
         height 20px
         margin-right 22px
         background-size 20px 20px
         &:last-child
            margin-right: 0
         &.on
           bg-image('./images/stars/star48_on')
         &.half
            bg-image('./images/stars/star48_half')
         &.off
            bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
     .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
