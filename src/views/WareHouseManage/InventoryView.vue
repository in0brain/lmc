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
import axios from "axios";
export  default {
  name:'inventoryView',
  data(){
    return{
      store:'',
      options:'',
      product:'',
      tableData:[],
      tableLabel:[
        {
          prop:'branchStoreroomName',
          label:'库房名称'
        },
        {
          prop:'productName',
          label:'库房名称'
        },
        {
          prop:'amount',
          label:'总库存量'
        },
        {
          prop:'assigned',
          label:'总库存量'
        },
        // {
        //   prop:'amount'-'assigned',
        //   label:'可分配量'
        // },
      ]
    }
  },
  methods:{
    getBranch() {
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
      axios({
        method:'get',
        url:'delivery/storeroom/get_all_products_in_branch_storeroom?id='+name,
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
      })
    },
    getByProduct(name) {
      axios({
        method:'get',
        url:'delivery/storeroom/get_products_in_all_branch_storeroom_by_name?productName='+name,
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
      })
    },
    getAllList(){
      axios({
        method:'get',
        url:'delivery/storeroom/get_products_in_all_branch_storeroom_by_name?productName='+'',
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
      })
    }
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