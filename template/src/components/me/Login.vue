<template>
    <div>

        <!-- <img  class="logo" src="../../assets/logo.jpg"> -->
      <h1 class="logo">Saya-ups</h1>

    <group title="Please enter your account password to login">
      <x-input title="Account" name="mobile" v-model="phone" placeholder="Please enter the phone number" keyboard="number" ></x-input>
        <x-input title="Password" v-model="pwd" type="password" placeholder="Please enter password" ></x-input>
        
    </group>
    <group style="margin:20px 20px">
        <x-button type="primary" @click.native="login">Login</x-button>
        <x-button type="default" @click.native="regist">Regist</x-button>
    </group>
    </div>
</template>


<script>
import { XInput } from 'vux'
import { setTimeout } from 'timers';

export default {
    components: {
    XInput
  },
  data() {
      return {
          phone:"",
          pwd:""
      }
  },
  methods: {
      login() {
          if(this.phone.length>10) {

              this.$store.commit('setLogin',true);
              this.$vux.toast.text('Success');
              setTimeout(ret=>{
                    this.$router.go(-1);
              },2000)
              

          } else {
              this.$vux.toast.text('Mobile phone number or password is wrong');
          }
          
      },
      regist() {
          this.$router.push('/regist');
      }
  }
}
</script>


<style scoped>
    .logo {
    margin-top: 10%;
    width: 100%;
    /* margin-left: 30%; */
    text-align: center;
    margin-bottom: 15%;
    border-radius: 50%;
    font-size: 40px;
    color: #00b0ff

    
}
</style>
