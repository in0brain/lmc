<template>
  <div >
<div class="manage-header">
  <div style="width: 100px;height: 40px;float: left;display:inline-block;">你好！{{this.username}}</div>



    <el-button type="primary" @click="goShoppingCart"> {{this.username}}  购物车</el-button>


</div>
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple " >
        <div class="col-md-6">
          <div class="card">
            <img :src="image" class="card-img-top"  alt="">
            <div class="card-body">
              <h5 class="card-title">{{ name }}</h5>
              <p class="card-text">{{ description }}</p>
            </div>
          </div>
        </div>
      </div></el-col>

      <el-col :span="12"><div class="grid-content bg-purple ">
        <div class="row">

          <div class="col-md-6">
            <form class="card">
              <div class="card-body">

                <div class="form-group">
                  <label>商品名称：</label>
                  <input type="text" class="form-control" v-model="name" readonly>
                </div>


                <div class="form-group">
                  <label>商品类别：</label>
                  <input type="text" class="form-control" v-model="category" readonly>
                </div>


                <div class="form-group">
                  <label>款式：</label>
                  <select v-model="style" class="form-control" readonly>
                    <option v-for="option in styleOptions" :key="option">{{ option }}</option>
                  </select>
                </div>


                <div class="form-group">
                  <label>单价：</label>
                  <input type="text" class="form-control" v-model="price" readonly>
                </div>


                <div class="form-group" >
                  <label>数量：</label>
                  <div class="input-group" >


                    <div class="input-group-prepend">
                      <button class="btn btn-outline-secondary" type="button" @click="decrement">-</button>
                    </div>


                    <input type="text" class="form-control text-center" v-model="quantity">


                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button" @click="increment">+</button>
                    </div>


                  </div>
                </div>




                <div class="form-group">
                  <div style="float: right;display:inline-block;">
                    <el-button type="primary"  @click="addToCart"> 加入购物车</el-button>
                  </div>

                  <el-button type="primary" @click="buyNow">立即购买</el-button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div></el-col>

    </el-row>



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
      isShow: false,
      cartisShow:false,
      username:'',
      operateForm: {},
      image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0110324f-2b8e-48b8-aa16-c5e06e99bd64%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690423231&t=b82aedbeecca3a7d036fd2fb67d4bf31',
      name: '阿斯顿马丁',
      description: '阿斯顿·马丁（Aston Martin） 汽车总部设在英国盖顿，阿斯顿·马丁公司始建于1913年3月，创始人是莱昂内尔·马丁（Lionel Martin）和罗伯特·班福特（Robert Banford）。',
      category: '商品类别',
      style: '款式 A',
      styleOptions: ['款式 A', '款式 B', '款式 C'],
      price: 3000000,
      quantity: 3,
      formLabel: [
        {
          model: "keyword",
          label: '',
          type: 'input'
        }
      ],

      tableData: [],

      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {

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
          name: this.name,
          description: this.description,
          category:this.category,
          style: this.style,
          price: this.price,
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
          name: this.name,
          description: this.description,
          category:this.category,
          style: this.style,
          price: this.price,
          quantity: this.quantity,
          operateForm:this.operateForm,
          allmoney:this.quantity* this.price,
          goods:[
            {
              name: this.name,
              price:this.price,
              num: this.quantity,
              totalmoney:this.price*this.quantity,
            }
          ]

        }
      });

    }

  },
  mounted() {
    this.username=this.$route.query.username,
        this.operateForm=this.$route.query.operateForm


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
  background: #d3dce6;
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
}
.form-group{

  height: 70px;
  text-align: left;
  margin: 10px;
  margin-bottom: 20px;
}
.form-group .input-group{
  height: 100px;
}
</style>


