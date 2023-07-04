<template>
  <div class="manage">

    <div class="manage-header">

      <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData" height="90%" stripe>
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
        picture:'',
        goodsname:'',
        goodssort:'',
        goodsprice:0
      },
      tableData: [{
        picture:'1',
        goodsname:'1',
        goodssort:'1',
        goodsprice:10
      }],
      tableLabel: [
        {
          prop: "picture",
          label: "图片"
        },
        {
          prop: "goodsname",
          label: "商品名称"
        },
        {
          prop: "goodssort",
          label: "商品分类"
        },
        {
          prop: "goodsprice",
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
      window.alert('删除'+this.operateForm.ordernum+'商品')
    },
    handleExchange(row){
      this.operateForm = row
      window.alert('换货'+this.operateForm.ordernum+'商品')
    },
    seeMore(row){
      this.operateForm = row
      window.alert('查看'+this.operateForm.ordernum+'商品')
    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      this.config.loading = false
      this.config.total =4
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
