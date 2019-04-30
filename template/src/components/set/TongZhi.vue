<template>
    <div style="height:100%">
    <x-header :left-options="{backText: 'Back'}"  style="width:100%;position:absolute;left:0;top:0;z-index:100;"  >Message</x-header>
        <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" body-padding-bottom="55px" style="height:100%">
            <span class="message">
                No Message!
            </span>
        </view-box>
    </div>
</template>
<script>
export default {
    data() {
    return {
      isShowNav:true,
      title:"",
      desp:""
    }
  },
}
</script>

<style scoped>
    .message {
        padding-top: 100px;
        width: 100%;
        text-align: center;
        margin-top: 100px;
        font-size: 30px;
        color: #8c8c8c;
    }
</style>
