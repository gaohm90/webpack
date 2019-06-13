<template>
    <div>
<x-header :left-options="{showBack: true,backText:'Back'}"  style="width:100%;position:absolute;left:0;top:0;z-index:100;"  >Regist</x-header>
        <!-- <img  class="logo" src="../../assets/logo.jpg"> -->
      <h1> </h1>

    <group title="Please fill in the registration information">
              <x-input title="Username:"  placeholder="username"></x-input>

      <x-input title="Nickname:"  placeholder="nickname"></x-input>

      <x-input title="Phone" name="mobile" v-model="phone" placeholder="phone number" keyboard="number"></x-input>
      <x-input title="Send" class="weui-vcode">
        <x-button slot="right" type="primary" mini @click.native="sendSmg">Send Code</x-button>
      </x-input>
        <x-input title="Password" v-model="pwd" type="password" placeholder="Password" ></x-input>
        <x-input title="Password" v-model="pwd" type="password" placeholder="Re-Password" ></x-input>
    </group>
    <group style="margin:20px 20px">
        <x-button type="primary" @click.native="login">Regist</x-button>
        
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
          this.$vux.toast.text('Please enter correct verify code');
          
      },
      sendSmg() {
          this.$vux.toast.text('Success');
      }
  }
}
</script>


<style scoped>
    .logo {
    margin-top: 20%;
    width: 40%;
    margin-left: 30%;
    margin-bottom: 15%;
    border-radius: 50%;
    
}
</style>
