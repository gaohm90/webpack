<template>
    <div style="height:100%">
    <x-header :left-options="{backText: 'Back'}"  style="width:100%;position:absolute;left:0;top:0;z-index:100;"  >Device</x-header>
    <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px" style="height:100%">
        
        <div style="padding: 15px;">
            <button-tab v-model="index">
                    <button-tab-item selected @on-item-click="consoleIndex()">Manual input</button-tab-item>
                    <button-tab-item @on-item-click="consoleIndex()"><span >Automatic search</span></button-tab-item>
            </button-tab>
                
        </div >
        <div v-if="index == 0">
        <group title="Please enter the ip address" >
        <x-input title="IP:"  v-model="maskValue" :max="16" ></x-input>            
       
        </group>

        <group title="" style="padding: 15px;">
            <x-button type="primary" @click.native="connect">Connect</x-button>
        </group>
        </div>

            <div v-if="index == 1">
        

        <group title="" style="padding: 15px;">
            <x-button type="primary" @click.native="search">Seching</x-button>
        </group>
        </div>

    </view-box>
    
    </div>

        

</template>


<script>
import { ButtonTab, ButtonTabItem, Divider ,ViewBox,XInput} from 'vux'
import { setTimeout } from 'timers';

export default {
    components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    ViewBox,
    XInput
  },
  methods: {
    consoleIndex () {
      console.log('click demo01', this.demo01)
    },
    connect() {
          if(process.env.NODE_ENV === "development") {
                    // 开发环境
                    this.$vux.toast.text('Success');
                    this.$store.commit('changeConnect',true);
                } else {
                    this.$vux.toast.text('Device does not exist');                
                }
    },
    search() {
        this.$vux.loading.show({
            text: 'Loading'
            })
            setTimeout( ret=>{
                this.$vux.loading.hide();
                this.$vux.toast.show({
            text: 'Device does not exist',
            type:'text'
        })
            },3000);
    }
  },
  data(){
      return {
          isShowNav:true,
          index:0,
          maskValue:"10.10.10.6",
          
      }
  }
}
</script>
