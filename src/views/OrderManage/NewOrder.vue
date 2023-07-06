<template>
  <div >
    <el-dialog :title="'新增用户'" :visible.sync="isShow">
      <common-form :formLabel="opertateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
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
        <el-select v-model="value" placeholder="类别" style="float: left;">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form" style="margin-left: 400px">
        <el-button type="primary" @click="getList(searchFrom.keyword)" style="margin-left: 10px">查询</el-button>
      </common-form>
      </span>

      <!--      <el-dropdown>-->
<!--        <el-button type="primary">-->
<!--          类别<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--        </el-button>-->
<!--        <el-dropdown-menu slot="dropdown">-->
<!--          <el-dropdown-item>黄金糕</el-dropdown-item>-->
<!--          <el-dropdown-item>狮子头</el-dropdown-item>-->
<!--          <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
<!--          <el-dropdown-item>双皮奶</el-dropdown-item>-->
<!--          <el-dropdown-item>蚵仔煎</el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--      </el-dropdown>-->
<!--      <common-form :formLabel="formLabel" :form="searchShopFrom" :inline="true" ref="form">-->
<!--        <el-button type="primary" @click="getShopList(searchShopFrom.keyword)">查询商品</el-button>-->
<!--      </common-form>-->

    </div>
    <div>

      <div class="myproductlist">
        <section class="section-products">
          <div class="container">
            <div class="row justify-content-center text-center">
              <div class="col-md-8 col-lg-6">

              </div>
            </div>
            <div class="row">
              <!-- Single Product -->
              <div class="col-md-6 col-lg-4 col-xl-3" >
                <div id="product-1" class="single-product"  >
<!--                  <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0110324f-2b8e-48b8-aa16-c5e06e99bd64%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690423231&t=b82aedbeecca3a7d036fd2fb67d4bf31-->
<!--                  " alt="">-->
                  <div class="part-1" >
                    <ul>
                      <el-button @click="goDetail">查看详情</el-button>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Here Product Title</h3>
                    <h4 class="product-old-price">$79.99</h4>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
              <!-- Single Product -->
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-2" class="single-product">
                  <div class="part-1">
                    <span class="discount">15% off</span>
                    <ul>
                      <el-button @click="goDetail">查看详情</el-button>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Here Product Title</h3>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
              <!-- Single Product -->
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-3" class="single-product">
                  <div class="part-1">
                    <ul>
                      <el-button @click="goDetail">查看详情</el-button>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Here Product Title</h3>
                    <h4 class="product-old-price">$79.99</h4>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
              <!-- Single Product -->
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-4" class="single-product">
                  <div class="part-1">
                    <span class="new">new</span>
                    <ul>
                      <el-button @click="goDetail">查看详情</el-button>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Here Product Title</h3>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
              <!-- Single Product -->
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-1" class="single-product">
                  <div class="part-1">
                    <ul>
                      <el-button @click="goDetail">查看详情</el-button>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Here Product Title</h3>
                    <h4 class="product-old-price">$79.99</h4>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
              <!-- Single Product -->
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-2" class="single-product">
                  <div class="part-1">
                    <span class="discount">15% off</span>
                    <ul>
                      <el-button @click="goDetail">查看详情</el-button>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Here Product Title</h3>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
              <!-- Single Product -->
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-3" class="single-product">
                  <div class="part-1">
                    <ul>
                      <el-button @click="goDetail">查看详情</el-button>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Here Product Title</h3>
                    <h4 class="product-old-price">$79.99</h4>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
              <!-- Single Product -->
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-4" class="single-product">
                  <div class="part-1">
                    <span class="new">new</span>
                    <ul>
                      <el-button @click="goDetail">查看详情</el-button>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Here Product Title</h3>
                    <h4 class="product-price">$49.99</h4>
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

import { getUser } from '@/api/data'


export default {
  name: 'NewOrder',
  components: {

    CommonForm,


  },
  data() {
    return {
      //下拉选项框
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value:'',
      operateType: 'add',
      isShow: false,
      cartisShow:false,
      username:'',
      opertateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
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
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexLabel",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200
        },
        {
          prop: "addr",
          label: "地址",
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {
    confirm() {
      if (this.operateType === 'add') {
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res)

          this.isShow = false


          this.getList(this.operateForm.name)
        })
      }
    },
    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
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
    goDetail(){
      this.$router.push({
        path: '/shopdetail',
        query: {
          username : this.username,
          operateForm:this.operateForm
        }
      });
    },
    getList(name = '') {
      this.username = name
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        console.log(res, 'res')

        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex === 0 ? "女" : "男"


            return item


        })
        if(this.tableData.length===0){
          this.addUser()
        }
       // if(this.tableData.length>1&&this.tableData.length==res.list.length){
       //    // window.alert("您查询到了多个用户，请正确输入完整用户名确保唯一！！")
       //  }
        this.config.total = res.count
        this.config.loading = false
      })
    }
  },
  created() {
    this.getList()
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


