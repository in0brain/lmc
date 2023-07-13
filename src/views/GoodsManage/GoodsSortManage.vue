<template>
  <div class="manage">
    <el-dialog :title=" '修改商品信息'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">

      <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">
        <el-button type="primary" @click="search(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData" height="100%" stripe>
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
<!--            <el-button size="mini" @click="seeMore(scope.row)">查看</el-button>-->

            <el-button size="mini"  @click="handleExchange(scope.row)">修改</el-button>
<!--            <el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>-->
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
      isShow:false,
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
        "id": 0,
        "productName": "",
        "price": 0,
        "primaryClassification": "",
        "secondaryClassification": ""

      },
      tableData: [{

      }],
      tableLabel: [
        {
          prop: "picture",
          label: "图片"
        },
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
            secondaryClassification:this.operateForm.secondaryClassification

          }
      )
          .then(({ data: res }) => {
            console.log(res, 'res')
            this.isShow = false
            this.getList()

          })
    },

    handleDelete(row){
      this.operateForm = row
      window.alert('删除'+this.operateForm.id+'商品')
    },
    handleExchange(row){
      this.operateForm = row
      this.isShow = true

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
