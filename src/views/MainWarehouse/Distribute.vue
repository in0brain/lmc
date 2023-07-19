<template>
  <div class="manage">
    <div class="manage-header" style="margin-bottom: 20px">
      <div>
        <el-select v-model="store" placeholder="库房选择">
          <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.storeroomName"
              :value="item.id">
          </el-option>
        </el-select>
        <el-input v-model="productName" placeholder="请输入商品名称" style="margin-left: 50px;width: 200px"></el-input>
        <el-date-picker
            v-model="date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            style="margin-left: 50px">
        </el-date-picker>
        <el-button type="primary" @click="getBy()" style="margin-left: 20px">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" height="80%" stripe ref="multipleTable">
      <el-table-column show-overflow-tooltip
                       v-for="item in tableLabel"
                       :key="item.prop"
                       :label="item.label">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios"
export default{
  name:'44',
  data(){
    return {
      store:'',
      options:'',
      productName:'',
      date:'',
      tableData:[],
      tableLabel:[
        {
          prop:"branchName",
          label:"仓库名称"
        },
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
          prop:"productMeasurement",
          label:"计量单位"
        },
        {
          prop:"productAmount",
          label:"数量"
        },
        {
          prop:"sendTime",
          label:"日期"
        }
      ],
    }
  },
  methods:{
    getAllList(){
      axios({
        method:'get',
        url:'/center/distributeTask/get_all',
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
      })
    },
    getBranch(){
      axios({
        method:'get',
        url:'/center/branchStoreroom/get_all',
        dat:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.options=res.data.data
      })
    },
    getBy(){
      axios.get(
          '/center/distributeTask/get_by_infos/',
          {
            params:{
              branchId:this.store,
              productName:this.productName,
              sendTime:this.date,
            }
          }
      ).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
      })
      // axios({
      //   method:'get',
      //   url:'/center/distributeTask/get_by_infos/'+name,
      //   data:{}
      // }).then((res)=>{
      //   console.log(res.data.data)
      //   this.tableData=res.data.data
      // })
    },
  },
  created() {
    this.getAllList()
    this.getBranch()
  }
}
</script>

<style scoped lang="less">
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>