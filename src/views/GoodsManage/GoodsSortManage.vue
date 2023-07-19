<template>
  <div class="manage">
    <el-dialog :title="  '修改商品信息' " :visible.sync="isShowformodify">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowformodify = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="商品大图" :visible.sync="isShowforphoto">

      <el-image style="width: 100%; height: 100%" :src="this.imgSrc"></el-image>
    </el-dialog>

    <div class="manage-header">

      <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">
        <el-button type="primary" @click="search(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData" height="100%" stripe>
        <el-table-column label="图片" prop="photo" width="100">
          <template slot-scope="scope">

            <el-button size="mini"  @click="handlePhoto(scope.row)">查看大图</el-button>


          </template>


        </el-table-column>




        <el-table-column
            show-overflow-tooltip
            v-for="item in tableLabel"
            :key="item.prop"
            :label="item.label"
            style="width: 200px"

        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
          </template>

        </el-table-column>


        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">


            <el-button size="mini"  @click="handleExchange(scope.row)">修改</el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          class="pager"
          layout="prev, pager, next"
          :total="config.total"
          :current-page.sync="config.page"
          @current-change="getList"
          :page-size="20"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import CommonForm from '@/components/CommonForm.vue'

import axios from "axios";
export default {
  name: 'GoodsSortManage',
  components: {
    CommonForm,

  },
  data() {
    return {
      isShowformodify:false,
      isShowforphoto:false,
      imgSrc:'',
      operateFormLabel: [
        {
          model: 'id',
          label: '商品代码',
          type: 'input'
        },
        {
          model: 'productName',
          label: '商品名称',
          type: 'input'
        },
        {
          model: 'primaryClassification',
          label: '一级分类',
          type: 'input'
        },
        {
          model: 'secondaryClassification',
          label: '二级分类',
          type: 'input'
        },

        {
          model: 'price',
          label: '商品价格',
          type: 'input'
        },
        {
          model: 'photo',
          label: '图片地址',
          type: 'input'
        }
      ],


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
      operateForm:{
        id: 0,
        productName: "",
        price: 0,
        primaryClassification: "",
        secondaryClassification: "",
        photo:''

      },
      tableData: [{

      }],
      tableLabel: [

        {
          prop: "id",
          label: "编号"
        },
        {
          prop: "productName",
          label: "商品名称"
        },
        {
          prop: "primaryClassification",
          label: "一级分类"
        },
        {
          prop: "secondaryClassification",
          label: "二级分类"
        },
        {
          prop: "price",
          label: "商品价格"
        },

      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {
    confirm() {
      axios.put(
          `/center/product/`,
          {
            id:this.operateForm.id ,
            price:this.operateForm.price ,
            primaryClassification:this.operateForm.primaryClassification,
            productName: this.operateForm.productName,
            secondaryClassification:this.operateForm.secondaryClassification,
            photo:this.operateForm.photo

          }
      )
          .then(({ data: res }) => {
            console.log(res, 'res')
            this.isShowformodify = false
            this.getList()

          })
    },

    handlePhoto(row){
      this.operateForm = row
      this.imgSrc = this.operateForm.photo
      this.isShowforphoto = true
    },
    handleExchange(row){
      this.operateForm = row
      this.operateType="modify"
      this.isShowformodify = true

    },
    seeMore(row){
      this.operateForm = row
      window.alert('查看'+this.operateForm.id+'商品')

    },
    search(name=""){
      if(name === '')
         this.getList()
      else{
        axios.get(
            '/center/product/get_by_infos/',
            {
              params:{
                productName:name,

              }
            }

        )
            .then(({ data: res }) => {
              console.log(res, 'res')

              this.tableData = []
              this.tableData=res.data

            })
      }

    },
    getList() {
      this.config.loading = true


      axios({
        method: 'get',
        url: '/center/product/get_all/',

      })
      .then(({ data: res }) => {
        console.log(res, 'res')
        this.tableData = res.data
        this.config.total = res.data.length
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
<style lang="less" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px
  }
}
</style>
