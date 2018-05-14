<template>
  <div class="jjSearch">
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="demo-form-inline">
      <el-form-item label="接警单编号" prop="jjdbh">
        <el-input v-model="searchForm.jjdbh" placeholder="接警单编号"></el-input>
      </el-form-item>
      <el-form-item label="报警电话" prop="bjdh">
        <el-input v-model="searchForm.bjdh" placeholder="报警电话"></el-input>
      </el-form-item>
      <el-form-item label="报警人姓名" prop="bjrxm">
        <el-input v-model="searchForm.bjrxm" placeholder="报警人姓名"></el-input>
      </el-form-item>
      <el-form-item label="接警员" prop="jjy">
        <el-input v-model="searchForm.jjy" placeholder="接警员"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        type='index'
        label="序号">
      </el-table-column>
      <el-table-column
        prop="jjdbh"
        label="接警单编号">
      </el-table-column>
      <el-table-column
        width="170"
        prop="bjsj_format"
        label="报警时间">
      </el-table-column>
      <el-table-column
        prop="gjz"
        label="关键字">
      </el-table-column>
      <el-table-column
        prop="afdz"
        label="案发地址">
      </el-table-column>
      <el-table-column
        prop="zafs"
        :formatter="formatterZafs"
        label="作案方式">
      </el-table-column>
      <el-table-column
        prop="bjrxm"
        label="报警人姓名">
      </el-table-column>
      <el-table-column
        prop="bjrxb"
        label="报警人性别">
      </el-table-column>
      <el-table-column
        prop="bjdh"
        label="报警电话">
      </el-table-column>
      <el-table-column
        prop="bjnr"
        label="报警内容">
      </el-table-column>
      <el-table-column
        width="160"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="searchForm.pageNo"
      :page-size="pageData.pageSize"
      layout="prev, pager, next, jumper"
      :total="pageData.count">
    </el-pagination>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="changeForm">
        <el-form-item label="接警单编号" label-width='90px'>
          <el-input v-model="changeForm.jjdbh" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="被骗总金额" label-width='90px'>
          <el-input v-model="changeForm.bpzje" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="作案方式" label-width='90px'>
          <el-select v-model="changeForm.zafs" style="width:202px" placeholder="请选择">
            <el-option
              v-for="item in zafsOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作案手段" label-width='90px'>
          <el-cascader
              id="zasd"
              style="width:202px"
              v-model="selectedOptions3"
              :options="changeForm.zasd.data"
              @active-item-change="handleItemChange"
              :props="changeForm.zasd.props"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="关键字" label-width='90px'>
          <el-input v-model="changeForm.gjz" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="报警时间" label-width='90px'>
          <el-date-picker
            style="width:202px"
            v-model="changeForm.bjsj"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报警人姓名" label-width='90px'>
          <el-input v-model="changeForm.bjrxm" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="报警人性别" label-width='90px'>
          <el-select v-model="changeForm.bjrxb" style="width:202px" placeholder="请选择">
              <el-option
                v-for="item in bjrxbOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="单位" label-width='90px'>
          <el-input v-model="changeForm.dw" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="案发地址" label-width='90px'>
          <el-input v-model="changeForm.afdz" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="报警内容" label-width='90px'>
          <el-input v-model="changeForm.bjnr" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

let zasdxxlAll = [];//所有三级作案手段
let zasdValue = [];//作案手段选择结果
export default {
  data (){
    return{
      searchForm:{
        pageSize:'3',
        pageNo:1,
        jjdbh:'',
        bjdh:'',
        bjrxm:'',
        jjy:''
      },
      tableData:[],
      pageData:[],
      changeForm:{
        jjdbh:'',
        bpzje:'',
        bjsj:'',
        gjz:'',
        afdz:'',
        zafs:'',
        zasd:{
          data:[],
          props:{
            label: 'label',
            childrens:'children'
          }
        },
        bjrxm:'',
        bjrxb:'',
        dw:'',
        bjdh:'',
        bjnr:'',
        zafsCode:''
      },
      selectedOptions3:[],
      dialogFormVisible:false,
      zafsOptions:[],
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      bjrxbOptions:[{
        value:0,
        label:'男'
      },{
        value:1,
        label:'女'
      }]
    }
  },
  mounted(){
    //初始化表格数据
    this.$api.dataSearch(this.searchForm).then(res => {
      this.pageData = res.page;
      res.content.forEach(element => {
        this.tableData.push({
          jjdbh:element.jjdbh,
          bjsj:element.bjsj,
          bjsj_format:element.bjsj_format,
          gjz:element.gjz,
          afdz:element.afdz,
          zafs:element.zafs,
          zafsCode:element.zafsCode,
          bjrxm:element.bjrxm,
          bjrxb:element.bjrxb,
          bjdh:element.bjdh,
          bjnr:element.bjnr,
          dw:element.dw,
          jjy:element.jjy,
          bpzje:element.bpzje,
          id:element.id,
          zasddl:element.zasddl,
          zasdfl:element.zasdfl,
          zasdxl:element.zasdxl,
          zasddlCode:element.zasddl,
          zasdflCode:element.zasdfl,
          zasdxlCode:element.zasdxl
        })
      });
    },err => {
      console.log(err)
    })

    //作案方式加载
    this.$api.getZafs().then(res => {
      res.forEach(element => {
        this.zafsOptions.push({
          value:element.id,
          label:element.methodName
        })
      });
    },err => {
      console.log(err)
    })

    //作案手段加载
    this.$api.getZpsdfl().then(res => {
      //大类筛选
      function checkPreFl(param){
        return param.zpsdCode.length < 3
      }
      let obj = res.filter(checkPreFl)
      //小类筛选
      function checkPreXl(param){
        return param.zpsdCode.length == 4
      }
      let objXl = res.filter(checkPreXl)
      //小小类筛选
      function checkPreXxl(param){
        return param.zpsdCode.length > 4
      }
      let objXxl = res.filter(checkPreXxl)
      //全局小小类数据
      zasdxxlAll = objXxl
      obj.forEach(element => {
        function hasXl(param){
          return param.zpsdCode.substring(0,2) == element.zpsdCode
        }
        if(objXl.filter(hasXl).length>0){
          this.changeForm.zasd.data.push({
            value:element.zpsdCode,
            label:element.zpsdName,
            children:[]
          })
        }else{
          this.changeForm.zasd.data.push({
            value:element.zpsdCode,
            label:element.zpsdName
          })
        }

      });
    },err => {
      console.log(err)
    })
  },
  methods:{
    //表格数据自定义转换
    formatterZafs(row, column) {
      return row.zafsCode;
    },
    //查询方法
    onSubmit() {
      this.searchForm.pageNo = 1;
      this.$api.dataSearch(this.searchForm).then(res => {
        this.pageData = res.page;
        this.tableData = [];
        res.content.forEach(element => {
          this.tableData.push({
            jjdbh:element.jjdbh,
            bjsj:element.bjsj,
            bjsj_format:element.bjsj_format,
            gjz:element.gjz,
            afdz:element.afdz,
            zafs:element.zafs,
            zafsCode:element.zafsCode,
            bjrxm:element.bjrxm,
            bjrxb:element.bjrxb,
            bjdh:element.bjdh,
            bjnr:element.bjnr,
            dw:element.dw,
            jjy:element.jjy,
            bpzje:element.bpzje,
            id:element.id,
            zasddl:element.zasddl,
            zasdfl:element.zasdfl,
            zasdxl:element.zasdxl,
            zasddlCode:element.zasddl,
            zasdflCode:element.zasdfl,
            zasdxlCode:element.zasdxl
          })
        });
      },err => {
        console.log(err)
      })
    },
    //重置方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //展示条数操作
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页跳转
    handleCurrentChange(val) {
      this.searchForm.pageNo = val;
      this.$api.dataSearch(this.searchForm).then(res => {
        this.pageData = res.page;
        this.tableData = [];
        res.content.forEach(element => {
          this.tableData.push({
            jjdbh:element.jjdbh,
            bjsj:element.bjsj,
            bjsj_format:element.bjsj_format,
            gjz:element.gjz,
            afdz:element.afdz,
            zafs:element.zafs,
            zafsCode:element.zafsCode,
            bjrxm:element.bjrxm,
            bjrxb:element.bjrxb,
            bjdh:element.bjdh,
            bjnr:element.bjnr,
            dw:element.dw,
            jjy:element.jjy,
            bpzje:element.bpzje,
            id:element.id,
            zasddl:element.zasddl,
            zasdfl:element.zasdfl,
            zasdxl:element.zasdxl,
            zasddlCode:element.zasddl,
            zasdflCode:element.zasdfl,
            zasdxlCode:element.zasdxl
          })
        });
      },err => {
        console.log(err)
      })
    },
    //表格数据编辑
    handleEdit(index, row){
      console.log(index,row)
      this.dialogFormVisible = true;
      for (const key in this.changeForm) {
        if (key == 'zasd') {
          this.selectedOptions3 = [];
        }else if(key == 'zafs'){
          this.changeForm[key] = row.zafsCode;
        }else{
          this.changeForm[key] = row[key];
        }
      }
    },
    //作案手段选择监听
    handleItemChange(val) {
      //作案手段选择结果赋值
      zasdValue = val;
      //判断是否有下一层级
      if(val.length==1){
        let data = {
          'zpsdCode':val[0]
        }
        //作案手段大类加载
        this.$api.getZpsddl(data).then(res => {
          if(res.length<1){
            return false;
          }
          function checkPreLevel1(param){
            return param.value == val[0]
          }
          let obj = this.changeForm.zasd.data.filter(checkPreLevel1);
          obj[0].children = []
          res.forEach(element => {
            function hasXxl(param){
              return param.zpsdCode.substring(0,4) == element.zpsdCode
            }
            if(zasdxxlAll.filter(hasXxl).length>0){
              obj[0].children.push({
                value:element.zpsdCode,
                label:element.zpsdName,
                children:[]
              })
            }else{
               obj[0].children.push({
                value:element.zpsdCode,
                label:element.zpsdName
              })
            }

          });
        },err => {
          console.log(err)
        })
      }else if(val.length==2){
        let data = {
          'zpsdCode':val[1]
        }
        //作案手段小类加载
        this.$api.getZpsdxl(data).then(res => {
          if(res.length<1){
            return false;
          }
          function checkPreLevel2(param){
            return param.value == val[1].substring(0,2)
          }
          let obj = this.changeForm.zasd.data.filter(checkPreLevel2);
          function checkPreLevelXl(param){
            return param.value == val[1]
          }
          let objXl = obj[0].children.filter(checkPreLevelXl);
          objXl[0].children = []
          res.forEach(element => {
            objXl[0].children.push({
              value:element.zpsdCode,
              label:element.zpsdName
            })
          });
        },err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped>
  .jjSearch{
    width: 95%;
    margin: 50px auto 0;
  }
</style>
