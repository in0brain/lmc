<template>
  <div>
    <div class="manage-header">     <!--  用户信息-->
      <span>
      <div style="width: 100px;height: 40px;display:inline-block;float: left">
        用户：{{this.username}}
      </div>
<!--        <el-link type="primary" @click="goShoppingCart" target="_blank" style="margin-left: 200px" underline="true">购物车</el-link>-->
<!--      el-link<el-button type="primary" @click="goShoppingCart" style="margin-left: 200px">购物车</el-button>-->
      </span>
    </div>

    <div style="margin-top:20px">
      <el-card>
        <div slot="header" class="clearfix">
          <span>商品详情</span>
        </div>
        <el-row gutter="20">
          <el-col span="12">
            <div class="grid-content bg-purple " >
              <div class="col-md-6">
                <div class="card">
                  <img :src="image" class="card-img-top"  alt="">
                </div>
              </div>
            </div>
          </el-col>
          <el-col span="12">
            <div class="grid-content bg-purple ">
              <div class="row">
                <div class="col-md-6">
                  <form class="card">
                    <div class="card-body">
                      <div class="form-group">商品名称：{{this.goodsdata.productName}}</div>
                      <div class="form-group">商品介绍：{{this.goodsdata.productName}}</div>
                      <div class="form-group">一级分类：{{this.goodsdata.primaryClassification}}</div>
                      <div class="form-group">二级分类：{{this.goodsdata.secondaryClassification}}</div>
                      <div class="form-group">
                        <label>商品款式：</label>
<!--                          <el-select v-model="value" label:商品款式 placeholder="款式" style="float: left;">-->
<!--                            <el-option v-for="item in styleOptions"-->
<!--                                       :key="item.value"-->
<!--                                       :label="item.label"-->
<!--                                       :value="item.value">-->
<!--                            </el-option>-->
<!--                          </el-select>-->
                        <select v-model="style" class="form-control" readonly>-->
                          <option v-for="option in styleOptions" :key="option">{{ option }}</option>
                        </select>
                      </div>
                      <div class="form-group">商品单价：{{this.goodsdata.price}}</div>
                      <div class="form-group">
                        <label style="float: left">数量：</label>
<!--                        <div class="input-group" >-->
                        <div class="input-group-prepend" style="float: left">
                          <button class="btn btn-outline-secondary" type="button" @click="decrement">-</button>
                        </div>
                        <input type="text" class="text-center" v-model="quantity" style="float:left;">
                        <div class="input-group-append" style="float: left">
                          <button class="btn btn-outline-secondary" type="button" @click="increment">+</button>
                        </div>
<!--                      </div>-->
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="form-group">


          <div style="float: right;display:inline-block;">
            <el-button type="primary"  @click="addToCart"> 加入购物车</el-button>
          </div>

          <div style="float: right;display:inline-block;margin-right: 20px">
            <el-button type="primary" @click="buyNow">立即购买</el-button>
          </div>
          <div style="float: left;display:inline-block;margin-right: 20px">
            <el-button type="primary" @click="goBack">返回</el-button>
          </div>
        </div>
      </el-card>
    </div>






  </div>
</template>

<script>


import '@/assets/styles.css';




export default {
  name: 'ShopDetail',
  components: {




  },
  data() {
    return {
      operateType: 'add',
      goodsdata:{},
      isShow: false,
      cartisShow:false,
      username:'',
      operateForm: {},
      image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0110324f-2b8e-48b8-aa16-c5e06e99bd64%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690423231&t=b82aedbeecca3a7d036fd2fb67d4bf31',

      style: '款式 A',
      // styleOptions: [{
      //   value: '选项1',
      //   label: '款式1'
      // }, {
      //   value: '选项2',
      //   label: '款式2'
      // }, {
      //   value: '选项3',
      //   label: '款式3'
      // }],
      //value:'',
      styleOptions: ['款式 A', '款式 B', '款式 C'],

      quantity: 1,
      formLabel: [
        {
          model: "keyword",
          label: '',
          type: 'input'
        }
      ],
      readyforshopingcart:[]



    }
  },
  methods: {
    goBack(){
      this.$router.push({
        path: '/neworder',
        query: {

          username : this.username,
          operateForm:this.operateForm
        }
      });
    },
    goShoppingCart() {
      this.$router.push({
        path: '/shoppingcart',
        query: {
          pagefrom:'shopdetail',
          username : this.username,
          operateForm:this.operateForm
        }
      });


    },
    increment() {
      this.quantity++;
    },
    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      // 将商品数据加入购物车
      this.$router.push({
        path: '/shoppingcart',
        query: {
          pagefrom:'shopdetail',
          username : this.username,
          image: this.image,
          name: this.goodsdata.productName,
          description:this.goodsdata.productName,
          primaryClassification:this.goodsdata.primaryClassification,
          secondaryClassification:this.goodsdata.secondaryClassification,
          style: this.style,
          price: this.goodsdata.price,
          quantity: this.quantity,
          operateForm:this.operateForm
          //add到购物车数据库
        }
      });
    },
    buyNow() {
      this.$router.push({
        path: '/inputorderinfo',
        query: {
          pagefrom:'shopdetail',
          username : this.username,
          image: this.image,
          name: this.goodsdata.productName,
          description:this.goodsdata.productName,
          primaryClassification:this.goodsdata.primaryClassification,
          secondaryClassification:this.goodsdata.secondaryClassification,
          style: this.style,
          price: this.goodsdata.price,
          quantity: this.quantity,
          operateForm:this.operateForm,
          allmoney:this.quantity*  this.goodsdata.price,
          goodsdata:this.goodsdata,
          goods:[
            {
              name: this.goodsdata.productName,
              price:this.goodsdata.price,
              num: this.quantity,
              totalmoney:this.goodsdata.price*this.quantity,
            }
          ]

        }
      });

    }

  },
  mounted() {
        this.username=this.$route.query.username
        this.operateForm=this.$route.query.operateForm
        this.goodsdata = this.$route.query.goodsdata



  }
}
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@import url("//unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css");
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  height: 500px;
  text-align: center;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.image-container {
  width: 100%;
  max-width: 400px;
  margin: auto;
}

.product-image {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

.product-form {
  margin: auto;
  max-width: 400px;
}

.card .card-img-top{
  width: 100%;
  height: 450px;
}
.form-group{
  text-align: left;
  margin-bottom: 40px;
  line-height: 1.5em;
}
.form-group .input-group{

}
</style>


