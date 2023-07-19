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
            {{this.customName}}
          </el-form-item>
          <el-form-item label="默认地址">
            <el-input
                placeholder="请输入地址"
                v-model="form.address"


                clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="默认收货人">
            <el-input
                placeholder="请输入收货人"
                v-model="form.receiver"


                clearable>
            </el-input>
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
          <el-form-item label="是否要发票">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>

          <el-form-item label="订单类型">

            <el-radio v-model="form.type" label=310>先付后到</el-radio>
            <el-radio v-model="form.type" label=311>货到付款</el-radio>



          </el-form-item>

          <el-form-item >
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入其他需求"
                v-model="form.request">
            </el-input>
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

</style>
<script>

import axios from "axios";

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



          name:'',
          description:'',
          primaryClassification:'',
          secondaryClassification:'',
          style:'',
          price:'',
          quantity:0,







          address:'',
          company: "",
          customName: "",
          email: "",
          identity: "",
          landline: "",
          phone: "",
          zipCode: "",





          form: {
            childrenstation:'',
            senddate:'',
            postcode:'',
            tel:'',
            delivery: false,
            type: 0,
            request:'',
            address:'',
            receiver:''
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
      axios.post(
          `/customer_service/order/add_new_order`,
          {
            branchId: 0,
            classification: this.form.type,
            courierId: 0,
            createTime: "",
            customAddress: this.operateForm.address,
            customId: this.operateForm.id,
            customName: this.operateForm.customName,
            customPhone: this.operateForm.phone,
            customZipCode:this.operateForm.zipCode,
            id: "",
            invoice: "",
            needInvoice:this.form.delivery? 1:0,
            notes: this.form.request,
            originalId: "string",
            payType: this.form.type===311?1:0,
            productAmount: this.quantity,
            productId:this.goodsdata.id,
            productMeasurement: 0,
            productName: this.name,
            productPrice: this.price,
            productPrimaryClassification: this.primaryClassification,
            productSecondaryClassification: this.secondaryClassification,
            receiveTime: this.form.senddate+'T00:00:00.098Z',
            receiverAddress: this.form.address,
            receiverName:this.form.receiver,
            receiverPhone: this.form.tel,
            receiverZipCode: this.form.postcode,
            request: this.form.request,
            state: 100,
            sum: this.allmoney
          }
      ).then(({ data: res }) => {
        window.alert(res.message)
      })





      this.$router.push({
        path:'/showorder',
        query:{

           username:this.username,
           goods:this.goods,
           operateForm:this.operateForm,
           allmoney:this.allmoney,
           form: this.form
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
      this.goodsdata=this.$route.query.goodsdata


          this.name=this.$route.query.name
          this.description=this.$route.query.description
          this.primaryClassification=this.$route.query.primaryClassification
          this.secondaryClassification=this.$route.query.secondaryClassification
          this.style=this.$route.query.style
          this.price=this.$route.query.price
          this.quantity=this.$route.query.quantity

          this.allmoney=this.$route.query.allmoney







      this.address=this.operateForm.address
      this.company=this.operateForm.company
      this.customName = this.operateForm.customName
      this.email=this.operateForm.email
      this.identity=this.operateForm.identity
      this.landline=this.operateForm.landline
      this.phone=this.operateForm.phone
      this.zipCode=this.operateForm.zipCode
      this.form.postcode = this.zipCode
      this.form.tel = this.phone
      this.form.address = this.address
      this.form.receiver = this.customName

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
