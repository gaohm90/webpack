<template>
    <div style="height:100%">
    <x-header :left-options="{backText: 'Back'}"  style="width:100%;position:absolute;left:0;top:0;z-index:100;"  >Feedback</x-header>
    <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px" style="height:100%">
<group >
      <x-textarea v-model="title" :placeholder="$t('What is the problem')" :show-counter="false" :rows="1" autosize></x-textarea>
      
      <x-textarea v-model="desp" :max="200" placeholder="Detailed description" :show-counter="false" :height="200" :rows="8" :cols="30" ></x-textarea>

    </group>


<group title="" style="padding: 15px;">
            <x-button type="primary" @click.native="submit">Submit</x-button>
        </group>
        </view-box>
    </div>
</template>

<script>
import { XTextarea, Group, XInput } from 'vux'

export default {
     components: {
    XTextarea,
    Group,
    XInput
  },
  data() {
    return {
      isShowNav:true,
      title:"",
      desp:""
    }
  },
  methods:{
    submit() {
      if(this.title.length < 1 || this.desp.length <1) {
        this.$vux.toast.show({
          text:"Please enter feedback information",
          type:"warn"
        })
        return;
      } 
      this.$vux.loading.show({
            text: 'Weating'
            })
            setTimeout( ret=>{
                this.$vux.loading.hide();
                this.$vux.toast.show({
            text: 'Success',
            
        })
            },3000);
    }
  }
}
</script>
