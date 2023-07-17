<template>
  <div class="manage">
    <div class="manage-header" style="margin-bottom: 20px">
      <div>
        <el-select v-model="branch" placeholder="库房选择">
          <el-option
              v-for="item in options1"
              :key="item.storeroomName"
              :label="item.storeroomName"
              :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="productName" placeholder="商品选择">
          <el-option
              v-for="item in options2"
              :key="item.productName"
              :label="item.productName"
              :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
            v-model="date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            style="margin-right: 20px">
        </el-date-picker>
        <el-button type="primary"  style="margin-left: 20px">查询</el-button>
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

export default {
  name: 'distribute',
  data() {
    return {
      branch:'',
      date:'',
      productName:'',
      options1:[],
      options2:[],
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
          prop:"company",
          label:"厂商"
        },
        {
          prop:"sendTime",
          label:"日期"
        }
      ],
    }
  },
  mounted() {
    this.getBranches()
    this.getProducts()
  },
  method: {
    getBranches(){    //仓库列表
      axios({
        method:'get',
        url:'center/branchStoreroom/get_all',
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.options1=res.data.data
      })
    },
    getProducts(){    //商品列表
      axios({
        method:'get',
        url:'center/product/get_all',
        data:{}
      }).then((res)=>{
        console.log(res.data.data)
        this.options2=res.data.data
      })
    },
    getBy(){

    },
    search1() {    //查询
      axios({
        method:'get',
        url:'/center/distributeTask/get_by_infos?receiveTime='+this.date
        +'&branchName='+this.branch+'&productName='+this.productName,
      }).then((res) => {
        console.log(res.data.data)
        this.tableData=res.data.data
      })
    }
  },


}
</script>

<style scoped lang="less">
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>