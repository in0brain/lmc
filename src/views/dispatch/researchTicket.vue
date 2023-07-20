<template>
    <div>

      <el-dialog class="dialog" :visible.sync="showDialog" style="font-family: serif; font-size: medium">
          <div class="dialog">
            分站编号：{{this.rowData.branchId}}
          </div>
          <div class="dialog">
            总价：{{this.rowData.capital}}
          </div >
          <div>
            分类：{{this.rowData.classification}}
          </div>
          <div class="dialog">
            公司：{{this.rowData.companyName}}
          </div>
          <div class="dialog">
            配送员编号：{{this.rowData.courierId}}
          </div>
          <div class="dialog">
            任务单号：{{this.rowData.id}}
          </div>
          <div class="dialog">
            备注：{{this.rowData.notes}}
          </div>
          <div class="dialog">
            订单号：{{this.rowData.orderId}}
          </div>
          <div class="dialog">
            商品数量：{{this.rowData.productAmount}}
          </div>
          <div class="dialog">
            商品编号：{{this.rowData.productId}}
          </div>
          <div class="dialog">
            测量单位：{{this.rowData.productMeasurement}}
          </div>
          <div class="dialog">
            商品名字：{{this.rowData.productName}}
          </div>
          <div class="dialog">
            商品价格：{{this.rowData.productPrice}}
          </div>
          <div>
            接收时间：{{this.rowData.receiveTime}}
          </div>
          <div>
            接收者地址：{{this.rowData.receiverAddress}}
          </div>
          <div>
            接收者名字：{{this.rowData.receiverName}}

          </div>
          <div>
            接收者手机号：{{this.rowData.receiverPhone}}
          </div>
          <div>
            任务单状态：{{this.rowData.state}}
          </div>
      </el-dialog>

      <div>
        <el-form  label="80px"
                  :inline="true"
                  :model="form"
        >
          <el-form-item label="要求完成日期">
            <el-date-picker
                v-model="value0"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="任务类型">
            <el-select v-model="value1" placeholder="请选择">
              <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="任务状态" >
            <el-select v-model="value2" placeholder="任务状态">
              <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分站">
            <el-select v-model="value3" placeholder="分站">
              <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getListByConditions">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div id="table">
        <el-table :data="ticketData" style="width: fit-content">
          <el-table-column
              show-overflow-tooltip
              v-for = "item in ticketLabel"
              :key="item.prop"
              :label="item.label"
              :width="item.width ? item.width : 125"

          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" @click="goToDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            class="pager"
            layout="prev, pager, next"
            :total="config.total"
            :current-page.sync="config.page"
            @current-change="changePage"
            :page-size="page_size"
        ></el-pagination>
      </div>
    </div>
</template>
<script>

import axios from "axios";
import {paramToString} from "@/api/data";

export default {
  name: 'researchTicket',

  data() {
    return {
      /**
       *      [310,"购买订单(直接付款型)"],
       *     [311,"购买订单(货到付款型)"],
       *     [320,"退货订单"],
       *     [330,"换货订单"],
       *     [340,"其他订单"],
       */
      options1: [
        {
          value: 410,
          label: '配送任务(直接付款型)'
        },
        {
          value: 411,
          label: '配送任务(货到付款型)'
        },
        {
          value: 420,
          label: '配送任务(退货取货)'
        },
        {
          value: 430,
          label: '配送任务(换货型)'
        },
        {
          value: 440,
          label: '其他任务'
        }
      ],
      /**
       *      [200,"缺货中"],
       *     [201,"中心库房采购中"],
       *     [202,"中心库房有货物,正在送往分站库房"],
       *     [210,"商品已经就绪,等待分配"],
       *     [211,"商品已经就绪,等待发出"],
       *     [220,"任务执行中"],
       *     [221,"投递员已领货,任务配送中"],
       *     [222,"退货商品取回中"],
       *     [230,"已完成"],
       *     [231,"退订中止"],
       *     [240,"失败"],
       */
      options2: [
        {
          value: 200,
          label: '缺货中'
        },
        {
          value: 201,
          label: '中心库房采购中'
        },
        {
          value: 202,
          label: '中心库房有货物,正在送往分站库房'
        },
        {
          value: 210,
          label: '商品已经就绪,等待分配'
        },
        {
          value: 211,
          label: '商品已经就绪,等待发出'
        },
        {
          value: 220,
          label: '任务执行中'
        },
        {
          value: 221,
          label: '投递员已领货,任务配送中'
        },
        {
          value: 222,
          label: '退货商品取回中'
        },
        {
          value: 230,
          label: '已完成'
        },
        {
          value: 231,
          label: '退订中止'
        },
        {
          value: 240,
          label: '失败'
        }

      ],
      options3: [
        {
          value: '1',
          label: '第一分站'
        },
        {
          value: '2',
          label: '第二分站'
        }
      ],
      ticketLabel:[
        {
          prop: "id",
          label: "任务单号",
          width:200
        },
        {
          prop: "orderId",
          label: "订单号",
          width:200
        },
        {
          prop: "receiverName",
          label: "客户姓名",
          width:200
        },
        {
          prop: "receiveTime",
          label: "要求完成日期",
          width:200
        },{
          prop: "classification",
          label: "任务类型",
          width:200
        },
        {
          prop: "state",
          label: "要求完成状态",
          width:200
        },
        {
          prop: "branchId",
          label: "分站",
          width:200
        }
      ],
      value0:'',
      value1:'',
      value2:'',
      value3:'',
      ticketData:[],
      showDialog: false,
      rowData: {},
      page_size:20,
      config:{
        page:1,
        total:30
      },
      form: {
        deadline : '',
      }
    }
  },
  methods: {
    goToDetail(row) {
      this.showDialog=true
      this.rowData = row

    },
    changePage() {

    },
    getListByConditions() {
      console.log(this.value0)
      console.log(this.value1)
      console.log(this.value2)
      console.log(this.value3)

      axios.get("/branch/deliveryTask/conditions",
          {
            params: {
              receiveTime: this.value0,
              classification: this.value1,
              state: this.value2,
              branchId: this.value3
            }
          }
      ).then(res=>{
        console.log(res.data.data)
        this.ticketData=[]
        for (let item of res.data.data) {
          item.state = paramToString(item.state)
          item.classification = paramToString(item.classification)
          item.branchId = paramToString(item.branchId)
          this.ticketData.push(item)
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    getAllList() {
      axios.get("/branch/deliveryTask/conditions",
          {
            params: {}
          }
      ).then(res=>{
        console.log(res.data.data)
        this.ticketData=[]
        for (let item of res.data.data) {
          item.state = paramToString(item.state)
          item.classification = paramToString(item.classification)
          item.branchId = paramToString(item.branchId)
          this.ticketData.push(item)
        }
      }).catch(e=>{
        console.log(e)
      })
    }
  },
  mounted() {
    this.getAllList()
  }
}
</script>

<style scoped>
#table {
  height: calc(100% - 62px);
}
</style>