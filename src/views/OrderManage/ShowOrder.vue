<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="width: 700px">订单信息              订单号：{{this.uid}}</span>

        </div>
        <div  class="text item">
           客户名：{{this.username}}
        </div>
        <div v-for="item in goods" :key="item" class="text item">
          {{'商品名称: ' + item.name }}
          {{'商品单价: ' + item.price }}
          {{'选购数量: ' + item.num }}
          {{'总计金额: ' + item.totalmoney }}


        </div>


        <div  class="text item">
          {{'送货日期:'+this.form.senddate}}
        </div>
        <div  class="text item">
          {{'送货地址:'+this.operateForm.addr}}
        </div>
        <div  class="text item">
          {{'收货人:'+this.operateForm.name }}
        </div>
        <div  class="text item">
          {{'邮编:'+this.form.postcode }}
        </div> <div  class="text item">
        {{'电话:'+this.form.tel }}
      </div>
        <div  class="text item">
          {{'合计金额:'+this.allmoney}}
        </div>


      </el-card>
      <el-button @click="goBackNewOrder">返回</el-button>
    </div>

</template>
<script>

export default {
    name: 'ShowOrder',
    data () {
        return {

          uid:'',
          username:'',
          goods:[],
          operateForm: {},
          allmoney:0,
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
    goBackNewOrder() {
      this.$router.push('/neworder')
    }
  },
  mounted() {
    this.uid = this.$route.query.uid
    this.username=this.$route.query.username
    this.goods=this.$route.query.goods
    this.operateForm=this.$route.query.operateForm
        this.allmoney=this.$route.query.allmoney
        this.form=this.$route.query.form

  }
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 1080px;
}
</style>
