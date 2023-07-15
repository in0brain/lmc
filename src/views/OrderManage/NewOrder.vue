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
              <div class="col-md-6 col-lg-4 col-xl-3"  v-for="item in goodsforsearch" :key="item.id"  >
                <div id="product-1" class="single-product"  >
<!--                  :id="partId(item.id)"-->
                  <div class="part-1"  :style="{'--pic':'url('+item.photo+')'}" >
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
imagepath:'https://picsum.photos/300/200'

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
    // see(){
    //   var myDiv = document.getElementById("parts1");
    //   var computedStyle = document.defaultView.getComputedStyle(myDiv, ":before");
    //
    //   window.alert(computedStyle.width);
    //
    //
    //
    // },

    partId(index){
       return 'parts'+index
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
<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

div {
  font-family: "Poppins", sans-serif;
  color: #444444;
  position: relative;

}

a,
a:hover {
  text-decoration: none;
  color: inherit;
}

.myproductlist .section-products {
  padding: 80px 0 54px;
}

.myproductlist .section-products .header {
  margin-bottom: 50px;
}

.myproductlist .section-products .header h3 {
  font-size: 1rem;
  color: #fe302f;
  font-weight: 500;
}

.myproductlist .section-products .header h2 {
  font-size: 2.2rem;
  font-weight: 400;
  color: #444444;
}

.myproductlist .section-products .single-product {
  margin-bottom: 26px;
  float: left;

}

.myproductlist .section-products .single-product .part-1 {
  position: relative;
  height: 290px;
  width: 330px;
  max-height: 290px;
  margin-bottom: 20px;
  overflow: hidden;
  float:left;
  margin-right:30px;
  list-style:none;
}

.myproductlist .section-products .single-product .part-1::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: all 0.3s;
}

.myproductlist .section-products .single-product:hover .part-1::before {
  transform: scale(1.2,1.2) rotate(5deg);
}

.myproductlist .section-products #product-1 .part-1::before {
  content:'';
  background: var(--pic) no-repeat center ;
  background-size: cover;
  transition: all 0.3s;

}


.myproductlist .section-products .single-product .part-1 .discount,
.myproductlist .section-products .single-product .part-1 .new {
  position: absolute;
  top: 15px;
  left: 20px;
  color: #ffffff;
  background-color: #fe302f;
  padding: 2px 8px;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.myproductlist .section-products .single-product .part-1 .new {
  left: 0;
  background-color: #444444;
}

.myproductlist .section-products .single-product .part-1 ul {
  position: absolute;
  bottom: -41px;
  left: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
  opacity: 0;
  transition: bottom 0.5s, opacity 0.5s;
  z-index: 1;
}

.myproductlist .section-products .single-product:hover .part-1 ul {
  bottom: 30px;
  opacity: 1;
}

.myproductlist .section-products .single-product .part-1 ul li {
  display: inline-block;
  margin-right: 4px;
}

.myproductlist .section-products .single-product .part-1 ul li a {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
  color: #444444;
  text-align: center;
  box-shadow: 0 2px 20px rgb(50 50 50 / 10%);
  transition: color 0.2s;
}

.myproductlist .section-products .single-product .part-1 ul li a:hover {
  color: #fe302f;
}

.myproductlist .section-products .single-product .part-2 .product-title {
  font-size: 1rem;
}

.myproductlist .section-products .single-product .part-2 h4 {
  display: inline-block;
  font-size: 1rem;
}

.myproductlist .section-products .single-product .part-2 .product-old-price {
  position: relative;
  padding: 0 7px;
  margin-right: 2px;
  opacity: 0.6;
}

.myproductlist .section-products .single-product .part-2 .product-old-price::after {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #444444;
  transform: translateY(-50%);
}

</style>

