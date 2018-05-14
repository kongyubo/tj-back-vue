<template>
  <div id="menu">
    <div style="height:50px;text-align:center;">
      <span style="color:#fff;font-size:20px;line-height:50px;" v-if="!isCollapse">Anti Telecom fraud</span>
      <span style="color:#fff;font-size:20px;line-height:50px;" v-else-if="isCollapse"><i class="el-icon-service"></i></span>
    </div>
    <!-- <div style="text-align:center;width:64px;" @click="collapse">
      <i class="el-icon-d-arrow-right" v-if="isCollapse"  style="color:#fff;cursor:pointer;"></i>
      <i class="el-icon-d-arrow-left" v-else-if="!isCollapse" style="color:#fff;cursor:pointer;"></i>
    </div> -->
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      background-color="#20222A"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse">
      <router-link to="/">
        <el-menu-item index="0">
          <i class="el-icon-news"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <router-link to="/jjdj">
            <el-menu-item index="1-1">接警登记</el-menu-item>
          </router-link>
          <router-link to="/jjSearch">
            <el-menu-item index="1-2">接警查询</el-menu-item>
          </router-link>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>
<script>
export default {
  props:['is-collapse'],
  data() {
    return {
      // isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style scoped>
  .el-tree{
    background: transparent;
    color: #fff;
  }
  .el-tree-node__content:hover{
    background:#009688!important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 300px;
    min-height: 400px;
  }
  .el-menu{
    border:none;
  }
</style>
