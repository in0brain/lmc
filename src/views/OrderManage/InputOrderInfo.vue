<template>
    <div>

      <el-table
          :data="goods"
          style="width: 100%"
          :row-class-name="tableRowClassName">
        <el-table-column
            prop="name"
            label="商品名称"
            width="400">

        </el-table-column>


        <el-table-column
            prop="price"
            label="单价"
            width="400">
        </el-table-column>
        <el-table-column
            prop="num"
            label="数量"
            width="400">
        </el-table-column>
        <el-table-column
            prop="totalmoney"
            label="总金额"
            width="400"
            show-overflow-tooltip>
        </el-table-column>

      </el-table>



        <el-form ref="form" :model="form" label-width="300px">
          <div slot="header" class="clearfix">
            <span>客户信息确认</span>

          </div>
          <el-form-item label="客户姓名">
            {{this.operateForm.name}}
          </el-form-item>
          <el-form-item label="默认地址">
           {{this.operateForm.addr}}
          </el-form-item>
          <el-form-item label="客户邮编">
            <el-input
                placeholder="请输入邮编（最长6字）"
                v-model="form.postcode"
                maxlength="6"
                clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input
                placeholder="请输入内容（最长11字）"
                v-model="form.tel"
                maxlength="11"
                clearable>
            </el-input>
          </el-form-item>


          <el-form-item label="分站选择">
            <el-select v-model="form.childrenstation" placeholder="请选择分站">
              <el-option label="一分站" value="shanghai"></el-option>
              <el-option label="二分站" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="送货日期">
            <el-date-picker

                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="form.senddate"
            ></el-date-picker>

          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>

          <el-form-item label="订单类型">

            <el-radio v-model="form.type" label="1">A</el-radio>
            <el-radio v-model="form.type" label="2">B</el-radio>



          </el-form-item>


          <el-form-item label="发票服务">

              <el-radio label="普通发票" v-model="form.invoice"></el-radio>
              <el-radio label="增值税发票" v-model="form.invoice"></el-radio>

          </el-form-item>


          <el-form-item >
            当前订单总金额为：{{this.allmoney}}元。
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建订单</el-button>
            <el-button @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>



    </div>

</template>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
<script>
import Mock from 'mockjs'

export default {

    name: 'InputOrderInfo',
  components: {},
    data () {

        return {
          username:'',
          goods:[],
          operateForm: {},
          allmoney:0,
          goback:'',
          tableData:[],

          form: {
            childrenstation:'',
            senddate:'',
            postcode:'',
            tel:'',
            delivery: false,
            type: '',
            invoice: '',

          },

        }
    },
  methods:{
    tableRowClassName({rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    onSubmit() {

      let uid1 = Mock.Random.guid();
      //其实此处应该写入订单数据库，新建一个订单，并在最后的OrderSearch显示，进行检索
      this.$router.push({
        path:'/showorder',
        query:{
           uid:uid1,
           username:this.username,
           goods:this.goods,
           operateForm:this.operateForm,
           allmoney:this.allmoney,
           form: {
            childrenstation:this.form.childrenstation,
            senddate:this.form.senddate,
            postcode:this.form.postcode,
            tel:this.form.tel,
            delivery: this.form.delivery,
            type:this.form.type,
            invoice: this.form.invoice,

          },
        }
      });

    },
    goBack(){
      if(this.goback === 'shopdetail'){
        this.$router.push({
          path: '/shopdetail',
          query: {
            username : this.username,
            operateForm:this.operateForm
          }
        });
      }
      if(this.goback === 'shoppingcart'){
        this.$router.push({
          path: '/shoppingcart',
          query: {
            username:this.username,
            tableData:this.tableData,
            operateForm:this.operateForm,
            allmoney:this.allmoney
          }
        });
      }
    }
  },
    mounted() {
      this.username=this.$route.query.username
      this.goods = this.$route.query.goods
      this.operateForm = this.$route.query.operateForm
      this.allmoney = this.$route.query.allmoney
      this.goback=this.$route.query.pagefrom
      this.tableData=this.$route.query.tableData

    },
  created() {

  }
}
</script>

<style>


.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}


</style>
