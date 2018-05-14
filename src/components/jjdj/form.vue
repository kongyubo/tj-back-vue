<template>
  <div class="jjdjForm">
    <el-form ref="djForm" :model="djForm" class="demo-form-inline">
      <el-row class="row" :gutter="20">
        <el-col :span="12">
          <el-col :span="4"><span>接警单编号:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="jjdbh">
              <el-input placeholder="请输入内容" prop="jjdbh" v-model="djForm.jjdbh">
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4"><span>被骗总金额:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="bpzje">
              <el-input placeholder="请输入内容" v-model="djForm.bpzje">
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="row" :gutter="20">
        <el-col :span="12">
          <el-col :span="4"><span>作案方式:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="zafs">
              <el-select v-model="djForm.zafs" style="width:100%" placeholder="请选择">
                <el-option
                  v-for="item in zafsOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4"><span>作案手段:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="zasd.data">
              <el-cascader
                id="zasd"
                style="width:100%"
                :options="djForm.zasd.data"
                @active-item-change="handleItemChange"
                :props="djForm.zasd.props"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="row" :gutter="20">
        <el-col :span="12">
          <el-col :span="4"><span>关键字:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="gjz">
              <el-input placeholder="请输入内容" v-model="djForm.gjz">
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4"><span>报警时间:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="bjsj">
              <el-date-picker
                style="width:100%"
                v-model="djForm.bjsj"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="row" :gutter="20">
        <el-col :span="12">
          <el-col :span="4"><span>接警员:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="jjy">
              <el-input placeholder="请输入内容" v-model="djForm.jjy">
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4"><span>报警电话:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="bjdh">
              <el-input placeholder="请输入内容" v-model="djForm.bjdh">
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="row" :gutter="20">
        <el-col :span="12">
          <el-col :span="4"><span>报警人姓名:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="bjrxm">
              <el-input placeholder="请输入内容" v-model="djForm.bjrxm">
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4"><span>报警人性别:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="bjrxb">
              <el-select v-model="djForm.bjrxb" style="width:100%" placeholder="请选择">
                <el-option
                  v-for="item in bjrxbOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="row" :gutter="20">
        <el-col :span="12">
          <el-col :span="4"><span>单位:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="dw">
              <el-input placeholder="请输入内容" v-model="djForm.dw">
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4"><span>案发地址:</span></el-col>
          <el-col :span="20">
            <el-form-item prop="afdz">
              <el-input placeholder="请输入内容" v-model="djForm.afdz">
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24" style="padding:0 10px;">
          <el-col :span="2"><span>报警内容:</span></el-col>
          <el-col :span="22">
            <el-form-item prop="bjnr">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="djForm.bjnr">
              </el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row style="text-align:center;">
        <el-button type="primary" round @click="onSubmit1">保存</el-button>
        <el-button round @click="resetForm('djForm')" >重置</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>

let zasdxxlAll = [];//所有三级作案手段
let zasdValue = [];//作案手段选择结果
let resetForm;//重置表单数据
export default {
  data(){
    return {
      djForm:{
        jjdbh:'',
        bpzje:'',
        zafs:'',
        zasd:{
          data:[],
          props:{
            label: 'label',
            childrens:'children'
          }
        },
        gjz:'',
        bjsj:'',
        jjy:'',
        bjdh:'',
        bjrxm:'',
        bjrxb:'',
        dw:'',
        afdz:'',
        bjnr:''
      },
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
  created(){
    //空数据
    resetForm = this.djForm;
  },
  mounted(){

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
          this.djForm.zasd.data.push({
            value:element.zpsdCode,
            label:element.zpsdName,
            children:[]
          })
        }else{
          this.djForm.zasd.data.push({
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
          let obj = this.djForm.zasd.data.filter(checkPreLevel1);
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
          let obj = this.djForm.zasd.data.filter(checkPreLevel2);
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
    },
    onSubmit1(){
      let json = this.djForm;
      let text = document.getElementById('zasd').innerText;
      delete json.zasd;
      if(text==""){
        json.zasd = '';
        json.zpsddl = '';
        json.zpsdxl = '';
      }else{
        if(zasdValue.length==3){
          json.zasd = zasdValue[0];
          json.zpsddl = zasdValue[1];
          json.zpsdxl = zasdValue[2];
        }else if(zasdValue.length==2){
          json.zasd = zasdValue[0];
          json.zpsddl = zasdValue[1];
          json.zpsdxl = '';
        }else if(zasdValue.length==1){
          json.zasd = zasdValue[0];
          json.zpsddl = '';
          json.zpsdxl = '';
        }else{
          json.zasd = '';
          json.zpsddl = '';
          json.zpsdxl = '';
        }
      }
      this.$api.dataRegister(json).then(res => {
        console.log(res)
      },err => {
        console.log(err)
      }).catch(error => {
        console.log(error)
      })
    },
    //重置方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>
<style scoped>
  .jjdjForm{
    width: 95%;
    margin: 50px auto 0;
  }
  .row span{
    line-height: 40px;
  }
</style>
