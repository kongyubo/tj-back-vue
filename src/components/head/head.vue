<template>
  <div>
    <div class="leftHead"></div>
    <div class="rightHead">
      <div class="showHideBox" @click="collapseSend">
        <i class="el-icon-d-arrow-right" v-if="isCollapse"></i>
        <i class="el-icon-d-arrow-left" v-else-if="!isCollapse"></i>
      </div>
    </div>
    <div class="selfInfoBox">
      <self-info></self-info>
    </div>
  </div>
</template>

<script>
import selfInfo from './self/selfInfo.vue'
export default {
  data (){
    return {
      isCollapse: false
    }
  },
  components:{selfInfo},
  methods:{
    collapseSend(){
      if(this.isCollapse){
        document.getElementsByClassName('leftHead')[0].style.width = 300 + 'px';
      }else{
        document.getElementsByClassName('leftHead')[0].style.width = 64 + 'px';
      }
      this.isCollapse = !this.isCollapse;
      this.$emit('showHideAside',this.isCollapse)
    }
  }
}
</script>

<style scoped>
  .leftHead{
    width:300px;
    height:50px;
    float:left;
  }
  .rightHead{
    width:auto;
    height:50px;
    float:left;
  }
  .showHideBox{
    text-align:center;
    width:64px;
  }
  .showHideBox i{
    cursor:pointer;
    line-height:50px;
  }
  .selfInfoBox{
    width:auto;
    height:50px;
    float:right;
  }
</style>
