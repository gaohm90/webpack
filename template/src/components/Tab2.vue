<template>
    <div>
        
    <grid :cols="3" :show-lr-borders="false">
      <grid-item :label="mode.name" v-for="(mode,i) in modes" :key="i" @on-item-click="SelectMode(i)">
        <img slot="icon" :src="mode.img">
      </grid-item>
    </grid>

     <grid :cols="2" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item disabled:true v-for="(sta,i) in status" :key=i >
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
    </grid>

    </div>
</template>



<script>
import { XCircle } from 'vux'


const modes = [
   
]



export default {
    components: {
        XCircle
    },
    data(){
        return {
            modes:modes,
            status:this.$store.state.status,
            status_now:this.$store.state.status_now,
            percent:50
        }
    },
    methods: {
        SelectMode(a){ 
            
            this.status_now = modes[a].status;
            this.$store.commit('changeStatus', modes[a].status);


            console.log(this.$store.state.status_now);
        }
    }
}
</script>

<style>
.cicle {
    width: 60%;
    
}
</style>
