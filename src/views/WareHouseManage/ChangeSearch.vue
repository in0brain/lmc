<template>
  <div class="manage">

    <div class="manage-header">

<!--      <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">-->
<!--        <el-button type="primary" @click="getList(searchFrom.keyword)">查询</el-button>-->
<!--      </common-form>-->
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"><el-input v-model="inputwarehousename" placeholder="请输入库房名"></el-input></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">      <el-input v-model="inputgoodsname" placeholder="请输入商品名"></el-input></div></el-col>
        <el-col :span="6"> <el-select v-model="value" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select><div class="grid-content bg-purple">
         </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">  <el-button type="primary" @click="getList(this.inputwarehousename,this.inputgoodsname,this.value)">查询</el-button></div></el-col>

      </el-row>



    </div>
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>调拨单信息</span>

      </div>
      <div  class="text item">
        任务号：{{this.missionnum}}
      </div>
      <div  class="text item">
        单号：{{this.ordernum}}
      </div>
      <div  class="text item">
        类型：{{this.type}}
      </div>
      <div  class="text item">
        日期：{{this.date}}
      </div>
      <div  class="text item">
        仓库名：{{this.warehousename}}
      </div>

    </el-card>

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
  name: 'ChangeSearch',
  components: {


  },
  data() {
    return {
      inputwarehousename:'',
      inputgoodsname:'',
      options: [{
        value: 'time1',
        label: 'time1'
      }, {
        value: 'time2',
        label: 'time2'
      }, {
        value: 'time3',
        label: 'time3'
      }, {
        value: 'time4',
        label: 'time4'
      }, {
        value: 'time5',
        label: 'time5'
      }],
      value: '',




      tableData: [{
        goodscode:'asduaid',
        goodsname:'Aston',
        price:3000000,
        num:3,
        totalmoney:9000000



      }],
      tableLabel: [
        {
          prop: "goodscode",
          label: "商品代码"
        },
        {
          prop: "goodsname",
          label: "商品名"
        },
        {
          prop: "price",
          label: "单价"
        },
        {
          prop: "num",
          label: "数量"
        },
        {
          prop: "totalmoney",
          label: "总金额"
        },

      ],


      missionnum:'fiuashiu',
      ordernum:'adfhuiafhui',
      type:'出库',
      date:'2023-1-1',
      warehousename:'仓库1',
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
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 1080px;
}
</style>
