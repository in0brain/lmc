<template>
  <div class="manage">

    <div class="manage-header">

<!--      <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">-->
<!--        <el-button type="primary" @click="getList(searchFrom.keyword)">查询</el-button>-->
<!--      </common-form>-->
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="inputwarehousename" placeholder="请输入库房名"></el-input></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">      <el-input v-model="inputgoodsname" placeholder="请输入商品名"></el-input></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">  <el-button type="primary" @click="getList(this.inputwarehousename,this.inputgoodsname)">查询</el-button></div></el-col>

      </el-row>



    </div>
    <br>
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



export default {
  name: 'InventorySearch',
  components: {


  },
  data() {
    return {
      inputwarehousename:'',
      inputgoodsname:'',





      tableData: [{
        warehousename:'分库2',
        goodsname:'Aston',
        totalnum:10,
        returnnum:0,
        availablenum:10,
        donenum:2,


      }],
      tableLabel: [
        {
          prop: "warehousename",
          label: "库房"
        },
        {
          prop: "goodsname",
          label: "商品名"
        },
        {
          prop: "totalnum",
          label: "总库存量"
        },
        {
          prop: "returnnum",
          label: "退回量"
        },
        {
          prop: "availablenum",
          label: "可分配量"
        },
        {
          prop: "donenum",
          label: "已分配量"
        },
      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {



    getList() {
      // this.config.loading = true
      // name ? (this.config.page = 1) : ''
      // this.config.loading = false
      // this.config.total =4
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
