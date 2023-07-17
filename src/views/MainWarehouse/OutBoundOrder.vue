<template>
  <div class="manage">

    <div class="manage-header" style="margin-bottom: 20px">
      <div>
        <el-date-picker
            v-model="date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            style="margin-right: 20px">
        </el-date-picker>
        <el-button type="primary" @click="getByDate(date)" style="margin-left: 20px">查询</el-button>

      </div>
    </div>
      <el-table :data="tableData" height="80%" stripe  ref="multipleTable">
        <el-table-column
            fixed
            show-overflow-tooltip
            v-for="item in tableLabel"
            :key="item.prop"
            :label="item.label">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="print(scope.row)">打印</el-button>
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
</template>

<script>
import axios from "axios";

export default {
  name:'outBoundOrder',
  data(){
    return {
      date:'',
      tableData:[],
      tableLabel:[
        {
          prop:"productId",
          label:"商品编号"
        },
        {
          prop:"productName",
          label:"商品名称"
        },
        {
          prop:"productPrice",
          label:"商品售价"
        },
        {
          prop:"productAmount",
          label:"数量"
        },
        {
          prop:"outputTime",
          label:"日期"
        },
        {
          prop:"notes",
          label:"备注"
        },
      ],
      config: {
        page: 1,
        total: 30
      },
    }
  },
  methods:{
    getAllList() {      //获取所有出库单
      axios({
        method:'get',
        url:'/center/outputTask/get_all',
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
      })
    },
    getByDate(date) {    //根据日期获取
      axios({
        method:'get',
        url:'/center/outputTask/get_by_infos?outputTime='+date,
      }).then((res) => {
        console.log(res.data.data)
        this.tableData=res.data.data
      })
    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      this.config.loading = false
      this.config.total =4
    },
    print(row){
      this.$message('打印成功');
      console.log(row);
    }
  },
  created() {
    this.getAllList()
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