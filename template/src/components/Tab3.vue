<template>
    <div>
        
    


    <group >      
      <cell :title="list.name" :link="list.link" v-for="(list,i) in lists" :key="i" :value="list.value"></cell>
    <x-switch title="Receive notification" @on-change="changeNotice" v-model="notice"></x-switch>  
    </group>
    

    </div>
</template>

<script>
import { XSwitch } from 'vux'


const lists = [
    {
        name:"Device",
        link:"/device"
    },{
        name:"Message",
        link:'/tongzhi'
    },{
        name:"Feedback",
        link:'/fankui'
    }
];

export default {
    components: {
     XSwitch
    },
    
    data(){
        return {
            lists:lists,
            notice:this.$store.state.notice
        }
    },
    methods:{
        changeNotice(v) {
            this.$store.commit('changeNotice',v);
        }
    }
}
</script>
