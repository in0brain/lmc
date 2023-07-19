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
        <el-input v-model="product" placeholder="请输入商品名称" style="width: 200px;margin-left: 50px"></el-input>
        <el-button type="primary" @click="getByProduct(product)" style="margin-left: 20px">查询</el-button>
      </div>
    </div>
    <el-table
        :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)"
        style="width: 100%">
      <el-table-column
          label="库房名称"
          prop="branchStoreroomName">
      </el-table-column>
      <el-table-column
          label="商品名称"
          prop="productName">
      </el-table-column>
      <el-table-column
          label="总库存量"
          prop="amount">
      </el-table-column>
      <el-table-column
          label="已分配量"
          prop="assigned">
      </el-table-column>
      <el-table-column
          label="可分配量"
          prop="ableAssigned">
        <template slot-scope="scope">
          <span>{{scope.row.amount-scope.row.assigned}}</span>
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
  name:'inventoryView',
  data(){
    return{
      store:'',
      options:'',
      product:'',
      tableData:[],
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
    getBranch() {    //获得库房列表
      axios({
        method:'get',
        url:'center/branchStoreroom/get_all',
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.options=res.data.data
      })
    },
    getByStore(name) {
      this.product=''
      axios({
        method:'get',
        url:'delivery/storeroom/get_all_products_in_branch_storeroom?id='+name,
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
        this.total=this.tableData.length
      })
    },
    getByProduct(name) {
      this.store=''
      axios({
        method:'get',
        url:'delivery/storeroom/get_products_in_all_branch_storeroom_by_name?productName='+name,
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
        this.total=this.tableData.length
      })
    },
    getAllList(){
      axios({
        method:'get',
        url:'delivery/storeroom/get_products_in_all_branch_storeroom_by_name?productName='+'',
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        //this.list=res.data.data
        //this.total=this.list.length
        //this.tableData=this.getSlice(this.list)
        this.tableData=res.data.data
        this.total=this.tableData.length
      })
    },
    // getSlice(list){
    //   let index=0;
    //   let resIndex=0;
    //   let result=new Array(Math.ceil(list.length/this.pageSize));
    //   while (index < list.length) {
    //     //循环过程中设置result[0]和result[1]的值
    //     result[resIndex++] = list.slice(index, (index += this.pageSize));
    //   }
    //   return result;
    // }

    // getSummaries(param){
    //   const{colums,data}=param
    //   const sums=[]
    //   colums.forEach((colum,index)=>){
    //     if(){}
    //   }
    // }
  },
  created() {
    this.getBranch()
    this.getAllList()
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