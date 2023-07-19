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
        <el-button type="primary" @click="getByStore(store)" style="margin-left: 20px">查询</el-button>
        <el-date-picker
            v-model="date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            style="margin-left: 50px">
        </el-date-picker>
        <el-button type="primary" @click="getByDate(date)" style="margin-left: 20px">查询</el-button>
        <el-input v-model="productName" placeholder="请输入商品名称" style="margin-left: 50px;width: 200px"></el-input>
        <el-button type="primary" @click="getByProduct(productName)" style="margin-left: 20px">查询</el-button>
        </div>
    </div>
    <el-table :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)" height="80%" stripe ref="multipleTable">
      <el-table-column show-overflow-tooltip
                       v-for="item in tableLabel"
                       :key="item.prop"
                       :label="item.label">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="pageNum"
        :page-sizes="[5,10,15,20]"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export  default {
  name:'allocateOutView',
  data(){
    return{
      date:'',
      store:'',
      options:'',
      productName:'',
      tableData:[],
      tableLabel:[
        {
          prop:'id',
          label:'出库单号'
        },
        {
          prop:'productId',
          label:'商品代码'
        },
        {
          prop:'productName',
          label:'商品名称'
        },
        {
          prop:'productAmount',
          label:'商品数量'
        },
        {
          prop:'productPrice',
          label:'商品价格'
        },
        {
          prop:'outputTime',
          label:'日期'
        },
        {
          prop:'taskId',
          label:'任务单号'
        }
      ],
      total:0,     //一共多少条
      pageNum:1,   //当前页
      pageSize:10   //每页多少条
    }
  },
  methods:{
    handleCurrentChange(val){
      this.pageNum=val
    },
    handleSizeChange(val){
      this.pageSize=val
      //this.getAllList()
      console.log(`每页${val}条`)
    },
    getBranch() {
      axios({
        method:'get',
        url:'/center/branchStoreroom/get_all',
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.options=res.data.data
      })
    },
    getByStore(name){    //仓库id查询
      console.log(name)
      this.date=''
      this.productName=''
      axios.get(
          '/delivery/output/get_by_infos/'+name,
          {
            params:{
            }
          }
      ).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
        this.total=this.tableData.length
      })
    },
    getByDate(name){     //仓库的条件下日期的查询
      this.productName=''
      console.log(name)
      axios.get(
          '/delivery/output/get_by_infos/'+this.store,
          {
            params:{
              outputTime:name
            }
          }
      ).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
        this.total=this.tableData.length
      })
    },
    getByProduct(name){   //仓库的条件下 商品的查询
      this.date=''
      console.log(name)
      axios({
        method:'get',
        url:'/delivery/output/get_by_infos/'+this.store,
        params:{
          productName:name
        }
      }).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
        this.total=this.tableData.length
      })
    },

  },
  created() {
    this.getBranch()
  }
}

</script>


<style scoped lang="less">

</style>