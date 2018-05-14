<template>
    <el-menu id="self-info-menu" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">个人中心</template>
        <el-menu-item index="2-1"><i class="el-icon-info"></i>我的信息</el-menu-item>
        <el-menu-item index="2-2"><i class="el-icon-menu"></i>账号管理</el-menu-item>
        <el-submenu index="2-3">
          <template slot="title"><i class="el-icon-setting"></i>设置</template>
          <el-menu-item index="2-3-1">选项1</el-menu-item>
          <el-menu-item index="2-3-2">选项2</el-menu-item>
          <el-menu-item index="2-3-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="2-4"><i class="el-icon-warning"></i>注销</el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
  #self-info-menu .el-submenu__title{
    height: 48px!important;
    line-height: 48px!important;
    border: none!important;
  }
</style>
