<template>
    <div style="height:100%">
    <x-header :left-options="{backText: 'Back'}"  style="width:100%;position:absolute;left:0;top:0;z-index:100;"  >Statistics</x-header>
    <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px" style="height:100%">
        
         <v-chart
      ref="demo"
      :data="data">
      <v-bar />
      <v-tooltip :show-item-marker="false" />
    </v-chart>

    </view-box>
    </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, XButton,ViewBox } from 'vux'

var data1 = [{year:0,sales:100}];
for(var i=1;i<30;i++) {
    
    data1.push({ year: i, sales: 0 })
}

export default {
    components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    XButton,
    ViewBox
  },
  data () {
    return {
      data: data1,
      isShowNav:true
    }
  }
}
</script>
