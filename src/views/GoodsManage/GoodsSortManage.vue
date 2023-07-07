<template>
  <div class="manage">

    <div class="manage-header">

      <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">
        <el-button type="primary" @click="searchbyId(searchFrom.keyword)">搜索</el-button>
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
            <el-button size="mini" @click="seeMore(scope.row)">查看</el-button>

            <el-button size="mini"  @click="handleExchange(scope.row)">修改</el-button>
            <el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
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


    handleDelete(row){
      this.operateForm = row
      window.alert('删除'+this.operateForm.id+'商品')
    },
    handleExchange(row){
      this.operateForm = row
      window.alert('修改'+this.operateForm.id+'商品')
    },
    seeMore(row){
      this.operateForm = row
      window.alert('查看'+this.operateForm.id+'商品')

    },
    searchbyId(id=""){
      if(id === '')
         this.getList()
      axios({
        method: 'get',
        url: 'http://10.25.36.151:8079/swagger-center/center/product/get_by_id/'+id,

      })
          .then(({ data: res }) => {
            console.log(res, 'res')

            this.tableData = []
            this.tableData.push(res.data)
            this.config.total = res.data.length
            this.config.loading = false
          })
    },
    getList() {
      this.config.loading = true


      axios({
        method: 'get',
        url: 'http://10.25.36.151:8079/swagger-center/center/product/get_all',

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
