<template >
  <div >
    
    <div style="width:80%;margin-left: 10%;color:black;margin-top: 50px">
                <x-circle
                :percent="100"
                :stroke-width="5"
                :stroke-color="['#ef6c00', '#ffe57f','#3957FF']"

                :trail-width="6"
                trail-color="#ececec"
                anticlockwise>                
                <span style="font-size:40px;color: #5B86E5;">{{ws_status}}</span>
                </x-circle>
            </div>
            <div style="padding:0 15px;">
    
    </div>


    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item  :label="btn.name" v-for="(btn,i) in btns" :key="i" @click.native="selectMode(i)">        
        <icon slot="icon" :name="btn.icon" scale="3" style="color:gray"></icon>
      </grid-item>
    </grid>



       <!-- <grid :cols="2" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item disabled:true v-for="(sta,i) in status" :key=i  >
              <div style="width:80%;margin-left: 10%;color:black">
                <x-circle
                :percent="status_now[i]/sta.max*100"
                :stroke-width="5"
                stroke-color="#04BE02">
                <p><span style="font-size:30px">{{status_now[i]}}</span>{{sta.dw}}</p>
                <span>{{sta.name}}</span>
                </x-circle>
            </div>          
      </grid-item>
    </grid> -->



      <x-table>
        
        <tbody>
          <tr v-for="(s,i) in status" :key="i">
            <td>{{s.name}}</td>
            <td>{{status_now[i]}} {{s.dw}}</td>
          </tr>
          
        </tbody>
      </x-table>

                <!-- <box gap="20px 20px">
                    <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="startBtn()">Start washing</x-button>
                    <x-button :gradients="['#FF2719', '#FF61AD']" @click.native="stopBtn">Emergency stop</x-button>
                </box> -->
  </div>
</template>



<script>

const btns = [
  {
    icon:"power",
    name:"Power"
  },
  {
    icon:"auto",
    name:"Auto"
  },
  {
    icon:"night",
    name:"Night"
  },
  {
    icon:"manage",
    name:"Manage"
  }
]

import { XCircle,XButton,Box } from 'vux'
import { XTable } from 'vux'

export default {
  components: {
        XCircle,
        XButton,
        Box,
        XTable
    },
    data() {
      return {
        status:this.$store.state.status,
        status_now:this.$store.state.status_now,
        ws_status:"No Device",
        btns:btns
      }
      
    },
    methods: {
      selectMode(index) {
        // this.$vux.toast.text('No Device');
        if(this.$store.state.connect) {
            this.$vux.toast.text('Success');        
            this.ws_status = index > 0?"Running":"Not Working"   ;
        } else {
            this.$vux.toast.text('No Device');                 
        }


        switch (index) {
          case 0:this.status_now = [50,21,0,100];break;
          case 1:this.status_now = [50,21,1000,100];break;
          case 2:this.status_now = [50,21,3000,100];break;
          case 3:this.status_now = [50,21,5000,100];break;
        }
      },
      startBtn() {
        if(this.$store.state.connect) {
          this.$vux.toast.show({
            text:"Success"
          })
          this.ws_status = "Running"
        } else {
        this.$vux.toast.show({
          text:"Unconnected washing machine",
          type:"warn"
        })  
        }
        
      },
      stopBtn() {
        if(this.$store.state.connect) {
          this.$vux.toast.show({
            text:"Success"
          })
          this.ws_status = "Not working"
        } else {
          this.$vux.toast.show({
            text:"Unconnected washing machine",
            type:"warn"
          })
        }
      }
    }
}
</script>

<style>
.cs {
  margin-top: 50px;
  color: #000;
  
}
</style>
