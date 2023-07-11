<template>
  <div >
    <el-dialog :title="'新增客户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">   <!--确定用户 查看购物车-->

  <el-button type="primary" @click="goShoppingCart"> {{this.username}}  购物车</el-button>

    </div>
    <div class="manage-header">  <!--      查询商品-->
      <span>
        <el-select v-model="value" placeholder="类别" style="float: left;"  >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
          </el-option>

        </el-select>
        <el-button type="primary" @click="chooseSort" style="margin-left: 10px">商品查询</el-button></span>
      <span>
         <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form" style="margin-left: 400px">
        <el-button type="primary" @click="getList(searchFrom.keyword)" style="margin-left: 10px">客户查询</el-button>
      </common-form>
      </span>




    </div>
    <div>

      <div class="myproductlist">
        <section class="section-products">
          <div class="container">
            <div class="row justify-content-center text-center">
              <div class="col-md-8 col-lg-6">

              </div>
            </div>
            <div class="row" >
              <!-- Single Product -->
              <div class="col-md-6 col-lg-4 col-xl-3"  v-for="item in goodsforsearch" :key="item.id">
                <div id="product-1" class="single-product"  >

                  <div class="part-1" >
                    <ul>
                      <el-button @click="goDetail(item)">查看详情</el-button>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">{{ item.productName}}</h3>

                    <h4 class="product-price">${{ item.price}}</h4>
                  </div>
                </div>
              </div>






            </div>
          </div>
        </section>


      </div>

    </div>

  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm.vue'

import '@/assets/styles.css';

import axios from "axios";


export default {
  name: 'NewOrder',
  components: {

    CommonForm,


  },
  data() {
    return {
      //下拉选项框
      goods:[],
      goodsforsearch : [],
      options: [],
      value:'',
      operateType: 'add',
      isShow: false,
      cartisShow:false,
      username:'',
      userid:'',
      operateFormLabel: [
        {
          model: 'customName',
          label: '客户姓名',
          type: 'input'
        },
        {
          model: 'identity',
          label: '身份证号',
          type: 'input'
        },
        {
          model: 'company',
          label: '工作单位',
          type: 'input'
        },
        {
          model: 'landline',
          label: '座机',
          type: 'input'
        },
        {
          model: 'phone',
          label: '移动电话',
          type: 'input'
        },
        {
          model: 'address',
          label: '联系地址',
          type: 'input'
        },
        {
          model: 'zipCode',
          label: '邮编',
          type: 'input'
        },
        {
          model: 'email',
          label: '电子邮箱',
          type: 'input'
        },
      ],
      operateForm: {
        id:"",
        address: "",
        company: "",
        customName: "",
        email: "",
        identity: "",
        landline: "",
        phone: "",
        zipCode: ""
      },
      formLabel: [
        {
          model: "keyword",
          label: '',
          type: 'input'
        }
      ],
      searchFrom: {
        keyword: ''
      },
      searchShopForm:{
        keyword: ''
      },



    }
  },
  methods: {
    confirm() {
      if (this.operateType === 'add') {
        axios.post(
            '/customer_service/custom/',
            {
              address: this.operateForm.address,
              company:  this.operateForm.company,
              customName:  this.operateForm.customName,
              email:  this.operateForm.email,
              identity:  this.operateForm.identity,
              landline:  this.operateForm.landline,
              phone:  this.operateForm.phone,
              zipCode: this.operateForm.zipCode
            },
        ).then(({ data: res }) => {
          window.alert(res.message)
          this.username = this.operateForm.customName
          this.isShow = false
        })
      }
    },

    goShoppingCart() {
      this.$router.push({
        path: '/shoppingcart',
        query: {
          username : this.username,
          operateForm:this.operateForm
        }
      });


    },
    goDetail(item){
     // window.alert(this.username)
      if(this.username===''){
        window.alert("未选中客户，不可进入购买！")
      }

      else {
        this.$router.push({
          path: '/shopdetail',
          query: {
            username : this.username,
            operateForm:this.operateForm,
            goodsdata:item
          }
        });
      }


    },
    getList(name='') {
       if(name==='')
         window.alert("您未输入查询姓名！")
      else{
         axios({
           method: 'get',
           url: '/customer_service/custom/get_by_infos?customName='+name,

         })
             .then(({ data: res }) => {
               console.log(res, 'res')
               if(res.data.length===0)
               {
                 this.operateForm.customName = name
                 this.isShow = true
               }

               else if(res.data.length>1)
                 window.alert("查询到"+res.data.length+"个用户！请精确搜索用户名。")
               else{
                 window.alert(res.message)
                 this.username = res.data[0].customName
                 this.userid = res.data[0].userName
                 this.operateForm.id = res.data[0].id
                 this.operateForm.customName = res.data[0].customName
                 this.operateForm.address = res.data[0].address
                 this.operateForm.company = res.data[0].company
                 this.operateForm.email = res.data[0].email
                 this.operateForm.identity = res.data[0].identity
                 this.operateForm.landline = res.data[0].landline
                 this.operateForm.phone = res.data[0].phone
                 this.operateForm.zipCode = res.data[0].zipCode

               }




             })
       }

    },
    chooseSort(){

       if(this.value===''){
         window.alert('未选中商品分类！')
       }
       else if(this.value==='all'){
          this.goodsforsearch = this.goods
       }
      else{
        this.goodsforsearch = []
            var arr = []
         for(var item of this.goods){
             if(item.primaryClassification===this.value){
               arr.push(item)
             }

         }
         this.goodsforsearch = arr
       }
    },
    init(){
      axios({
        method: 'get',
        url: '/center/product/get_all',


      }).then(({ data: res }) => {

        this.goods = res.data
        this.goodsforsearch = res.data
        this.options.push({
          value:'all',
          label:'全部'
        })
        var arr = []
        for (var i=0;i<this.goods.length;i++){
          arr[i] = this.goods[i].primaryClassification
        }
        var myset = new Set(arr);
        for(var item of myset){
          this.options.push({
            value:item,
            label: item
          })
        }




      })
    }
  },
  created() {
    this.init();


  },
  mounted() {

    if(typeof this.$route.query.username!=='undefined'){
      if(this.$route.query.username !==''&&this.$route.query.operateForm!== {}){
        this.username=this.$route.query.username,
            this.operateForm=this.$route.query.operateForm
      }
    }





  }
}




</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>


