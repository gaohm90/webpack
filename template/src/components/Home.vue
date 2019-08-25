<template>
    <div style="height:100%">
    <x-header :left-options="{showBack: false}"  style="width:100%;position:absolute;left:0;top:0;z-index:100;"  >\{{menus[index].label}}</x-header>
<view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px" style="height:100%">
    <tab1 v-if="index == 0"></tab1>
    <tab2 v-if="index ==1"></tab2>
    <tab3 v-if="index ==2"></tab3>
    
</view-box>

    <tabbar v-model="index"  >
      <tabbar-item v-for="(menu,i) in menus" :key="i" @on-item-click="changeSelect()">        
        <icon slot="icon" :name="menu.icon" scale="3"></icon>        
        <span slot="label">\{{menu.label}}</span>
      </tabbar-item>      
    </tabbar>

    </div>
</template>

<script>

const menus = [
    {        
        icon:"home",        
        label:"Status"
    },{        
        icon:"msg",
        label:"Message"
    },{       
        icon:"setting",
        label:"Setting"
    }
]

import {messgeShow,openWin, openFrm, openNewUrl} from '../lib/common.js'
import {getUrl} from '../lib/tool.js'

import { Tabbar, TabbarItem, Group, Cell ,ViewBox} from 'vux'

import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'

export default {
    components: {
     Tabbar,
    TabbarItem,
    ViewBox,
    Group,
    Cell,
    Tab1,
    Tab2,
    Tab3
  },
  data() {
      return {
          index:this.$store.state.tab_select,
          menus:menus,
          isShowNav:true
      }
  },
  methods: {
      changeSelect() {
          this.$store.commit('changeSelect', this.index);
          setTimeout(ret=>{
            this.$refs.viewBox.scrollTo(top);
          },50);
      }
  },
  mounted() {
      var that = this;
    if(!this.$store.state.isLogin) {
        this.$router.push('/login');        
        return;
    }
        // 跳转连接设备页面
        if(!this.$store.state.connect){
            this.$vux.confirm.show({
                title: 'No Device',
                content: 'Go to connect ?',
                confirmText : "ok",
                cancelText:"Cancel",
            
            onCancel : () => {
                console.log(this) 
            },
            onConfirm : () => {
                that.$router.push('/device');
            }
            })
    
        }
    
  } 
}
</script>
