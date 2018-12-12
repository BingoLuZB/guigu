<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" @click="loginWay = true" :class="{on:loginWay}">短信登录</a>
          <a href="javascript:;" @click="loginWay = false" :class="{on:!loginWay}">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent = "login">
          <!--短信登录-->
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)" class="get_verification" :class="{rightPhone:/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)}" @click.prevent="getCode">
                {{time>0?`已发送，请等待${time}s`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!--密码登录-->
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="btn?`text`:`password`" maxlength="8" placeholder="密码"  v-model="pwd">
                <!--<input type="text" maxlength="8" placeholder="密码"  v-model="pwd" v-if="btn">-->
                <!--<input type="password" maxlength="8" placeholder="密码"  v-model="pwd" v-else>-->
                <div class="switch_button" @click="btn = !btn" :class="btn?'on':'off'">
                  <div class="switch_circle" :class="{right:btn}"></div>
                  <span class="switch_text">{{btn?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip v-if="alertJudge" :alertText = "alertText" @closeTip="close"></AlertTip>
  </section>
</template>

<script>
  // var regex =
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqSendCode,reqPwdLogin,reqSmsLogin} from '../../api'
  import {mapActions} from 'vuex'
  export default {
    name: "login",
    data(){
      return{
        loginWay:true, //ture短信登录
        phone:'',
        time: 0,
        pwd:'',
        btn:false,
        code:'',  //短信验证码
        captcha:'', //图形验证码
        name:'',    //用户名
        alertJudge:false,
        alertText:''
      }
    },
    methods:{
      ...mapActions(['saveUser',]),
      getCaptcha(){
        //为了每次指定的src都不一样，所以要加上Date.now()
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      },
      async getCode(){
        //倒计时  发送请求拿验证码
        if(this.time == '0'){  //开启倒计时
          this.time = 10
          this.timeId = setInterval(() => {   //注意这里要用箭头函数，否则this的指向会有问题
            this.time--
            if(this.time == '0'){  //结束倒计时
              clearInterval(this.timeId)
            }
          },1000)
        }
        const result = await reqSendCode(this.phone)
        if(result.code === 1){
          this.showAlert(result.msg)
          this.time = 0;
          clearInterval(this.timeId)
        }
      },
      showAlert(text){
        this.alertJudge = true;
        this.alertText =text;
      },
      close(){
        this.alertJudge = false
      },
      async login (){ //登录
        //先要表单验证
        //先要判断是短信登录还是密码登录
        let data = {name:'娃哈哈',phone:13249267670}
        this.saveUser(data)
        this.$router.replace('/person')
        sessionStorage.setItem('userInfo',data.name);
        let result
        if(this.loginWay){   //短信登录
          let result
          if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)){
            //电话格式不正确
            this.showAlert('电话号码错误');
            return
          }else if(!/^\d{6}$/.test(this.code)){
            //短信验证不正确
            console.log(this.code);
            this.showAlert('验证码错误');
            return
          }else{
            //电话跟验证码都正确，发送表单
            result = await reqSmsLogin(this.phone,this.code)
          }
        }else{  //密码登录
          const {name,pwd,captcha} = this
          if(!this.name){
            this.showAlert('帐号错误')
            return
          }
          else if(!this.pwd){
            this.showAlert('密码错误')
            return
          }
          else if(!this.captcha || this.captcha.length != 4){
            this.showAlert('图形验证码错误')
            this.getCaptcha()
            return

          }else{
            //帐号 密码 图形验证码都正确
            result = await reqPwdLogin({name,pwd,captcha})
          }
        }
        if(result.code === 0){
          const user = result.data
          //保存用户信息
          this.saveUser(user);
          // this.$store.dispatch('saveUser',user)
          //跳转页面
          this.$router.replace('/person')
        }else{
          this.showAlert(result.msg)
          this.getCaptcha()
        }
        clearInterval(this.timeId)
      }
    },
    components:{
      AlertTip,
    },
    // mounted(){
    //   this.saveUser({name:'hahaha',phone:13249267670});
    // }
  }
</script>

<style scoped lang="stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.rightPhone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
