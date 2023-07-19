<template>
  <div>
    <div>
      <el-form  label="80px"
               :inline="true"
                :model="formInline"
      >
        <el-form-item label="要求送货时间段">
          <el-date-picker
              v-model="deliver_time"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-dialog :title="'更新订单状态'" :visible.sync="showDialog">
        <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="common-table">
      <common-table class="common-table"
          :table-label="tableLabel"
          :table-data="tableData"
          :config = "config"
          @edit="modifyState"
      >
      </common-table>
    </div>
  </div>
</template>
<script>
import CommonTable from "@/components/CommonTable.vue";
import axios from "axios";
import {paramToString, stringToParam} from "@/api/data";
import CommonForm from "@/components/CommonForm.vue";
export default {
  name: "modifyState",
  components :{
    CommonForm,
    CommonTable
  },
  data() {
    return {
      originData: [],
      formLabelPosition: 'left',
      tableData: [],
      deliver_time: '',
      showDialog: false,
      operateFormLabel: [
        {
          /**
           *    [310,"购买订单(直接付款型)"],
           *     [311,"购买订单(货到付款型)"],
           *     [320,"退货订单"],
           *     [330,"换货订单"],
           *     [340,"其他订单"],
           */
          model: 'classification',
          label: '订单类型',
          type: 'select',
          opts : [
            {
              label: "购买订单(直接付款型)",
              value: 310
            },
            {
              label: "购买订单(货到付款型)",
              value: 311
            },
            {
              label: "退货订单",
              value: 320
            },
            {
              label: "换货订单",
              value: 330
            },
            {
              label: "其他订单",
              value: 340
            }
          ]
        },
        {
          /**
           * [100, "已提交,等待调度"],
           *     [110,"已调度,缺货中"],
           *     [111,"中心库房采购中"],
           *     [112, "中心库房有货物,正在送往分站库房"],
           *     [120,"已调度,订单进行中"],
           *     [121,"商品已经就绪,等待发出"],
           *     [122,"退货商品取回中"],
           *     [130,"投递员已领货,任务配送中"],
           *     [140,"已完成"],
           *     [141,"已退订"],
           *     [150,"失败"],
           * */
          model: 'state',
          label: '订单状态',
          type: 'select',
          opts: [
            {
              label: '已提交,等待调度',
              value: 100
            },
            {
              label: '已调度,缺货中',
              value: 110
            },
            {
              label: '中心库房采购中',
              value: 111
            },
            {
              label: '中心库房有货物,正在送往分站库房',
              value: 112
            },
            {
              label: '已调度,订单进行中',
              value: 120
            },
            {
              label: '商品已经就绪,等待发出',
              value: 121
            },
            {
              label: '退货商品取回中',
              value: 122
            },
            {
              label: '投递员已领货,任务配送中',
              value: 130
            },
            {
              label: '已完成',
              value: 140
            },
            {
              label: '已退订',
              value: 141
            },
            {
              label: '失败',
              value: 150
            }
          ]
        }
      ],
      operateForm: {
        id: '',
        state: 0,
        classification: 0
      },
      tableLabel: [
        {
          prop: "id",
          label: "订单号",
          width: 200
        },
        {
          prop: "customName",
          label: "客户名",
          width: 100
        },
        {
          prop: "customPhone",
          label: "电话号",
          width: 200
        },
        {
          prop: "classification",
          label: "订单类型",
          width: 200
        },
        {
          prop: "createTime",
          label: "订购日期",
          width: 200
        },
        {
          prop: "sum",
          label: "订单总款",
          width: 200
        },
        {
          prop: "state",
          label: "订单状态",
          width: 200
        }
      ],
      formInline: {
        deliver_time:''
      },
      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.deliver_time)
      axios.get("/dispatch/order/conditions", {
            params:{
              createTime:this.deliver_time
            }
          }
      ).then(res=> {
        console.log(res)
        this.tableData=res.data.data
        for (let i of this.tableData) {
          i.state = paramToString(i.state)
          i.classification = paramToString(i.classification)
        }
        console.log(res.data.data)
      })
    },
    modifyState(row) {
      this.showDialog = true
      this.operateForm.id = row.id
      this.operateForm.state=row.state
      this.operateForm.classification=row.classification
    },
    getList() {
      axios.get("/dispatch/order/conditions",
          {}
      ).then(res=> {
        this.tableData=res.data.data
        for (let i of this.tableData) {
          i.state = paramToString(i.state)
          i.classification = paramToString(i.classification)
        }
        console.log(res.data.data)
      })
    },
    submit() {
      this.showDialog=false
      console.log(this.operateForm.id)
      console.log(stringToParam(this.operateForm.state))
      console.log(stringToParam(this.operateForm.classification))
      axios({
        method:'put',
        url:'/dispatch/order/',
        data: {
          id: this.operateForm.id,
          state: stringToParam(this.operateForm.state),
          classification: stringToParam(this.operateForm.classification)
        }
      }).then(res=> {
        console.log(res)
        this.getList()
        this.$message({
          message: ' 修改成功',
          type: 'success'
        })
      }).catch(e=>{
        console.log(e)
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>
.common-table {
  height: 700px;
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px
  }
}
</style>