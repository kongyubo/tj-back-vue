<template>
  <div id="app">
    <el-container>
      <el-aside>
        <asideTree :is-collapse="isCollapse"></asideTree>
      </el-aside>
      <el-header style="background:#fff;border-bottom:1px solid #ccc;box-sizing:border-box;height:50px;">
        <indexHead @showHideAside="getCollapse"></indexHead>
      </el-header>
      <el-container class="index-content">
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import indexHead from './components/head/head.vue'
import asideTree from './components/aside/asideTree.vue'
import home from './components/Home.vue'
export default {
  name: 'App',
  data(){
    return {
      isCollapse:false
    }
  },
  computed:{

  },
  components:{
    indexHead,
    home,
    asideTree
  },
  methods:{
    getCollapse(param){
      this.isCollapse = param;
      let menu = document.getElementsByClassName('el-menu-vertical-demo');
      let aside = document.getElementsByClassName('el-aside');
      let indexContent = document.getElementsByClassName('index-content');
      if(param){
        aside[0].style.width = 64 + 'px';
        indexContent[0].style.marginLeft = 64 + 'px';
      }else{
        aside[0].style.width = 300 + 'px';
        indexContent[0].style.marginLeft = 300 + 'px';
      }
    }
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  .el-aside{
    background:#20222A;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
  .index-content{
    margin-left: 300px;
  }
</style>
