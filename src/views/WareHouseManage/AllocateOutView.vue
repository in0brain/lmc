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
            style="margin-right: 20px">
        </el-date-picker>
        <el-button type="primary" @click="getByDate(date)" style="margin-left: 20px">查询</el-button>
        <el-input v-model="productName" placeholder="请输入商品名称" style="margin-left: 50px;width: 200px"></el-input>
        <el-button type="primary" @click="getByProduct(date)" style="margin-left: 20px">查询</el-button>
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

      ],
      config: {
        page: 1,
        total: 30
      }
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
    getByStore(name){    //仓库id查询
      console.log(name)
      axios.get(
          '/delivery/output/get_by_infos/',
          {
            params:{
              branchStoreroomId: 0,
              condition: {},
            }
          }
      ).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
      })
    },
    getByDate(name){     //仓库的条件下日期的查询
      console.log(name)
      axios.get(
          '/delivery/output/get_by_infos/',
          {
            params:{
              branchStoreroomId: this.store,
              deliveryTime:name
            }
          }
      ).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
      })
    },
    getByProduct(name){   //仓库的条件下 商品的查询
      console.log(name)
      axios({
        method:'get',
        url:'/delivery/input/get_by_infos',
        params:{
          branchStoreroomId:this.store,
          condition:{
            receiveTime:name,
          },
        }
      }).then((res)=>{
        console.log(res.data.data)
        this.tableData=res.data.data
      })
    },
    getList(name = ''){
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      this.config.loading = false
      this.config.total =4
    }
  },
  created() {
    this.getBranch()
  }
}

</script>


<style scoped lang="less">

</style>