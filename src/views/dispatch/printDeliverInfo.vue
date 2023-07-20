<template>
  <div class="table">

    <div>

    </div>

    <el-form label="80px"
             :inline="true"
             :model="form"

    >
      <el-form-item label="要求完成日期">
        <el-date-picker
            v-model="form.deadline"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
        >
        </el-date-picker>

      </el-form-item>
      <el-form-item label="任务类型">
        <el-select v-model="form.task_type" placeholder="任务类型">
          <el-option
              v-for="item in task_types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配送员">
        <el-select v-model="form.courier" placeholder="请选择" style="margin: auto">
          <el-option
              v-for="item in courierOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <common-table ref="children_table"
                  :table-label="tableLabel"
                  :table-data="tableData"
                  :config = "config"
                  @edit="printInfoToWord"
                  @detail="handleDetail"

    >

    </common-table>
  </div>
</template>
<script>
import CommonTable from "@/components/CommonTable.vue";
import axios from "axios";
import {paramToString, stringToParam} from "@/api/data";
import wordxport from "@/api/wordxport";

export default {
  name :"printDeliverInfo",
  components: {
    CommonTable
  },
  data() {
    return {

      courierOptions:[],//所有配送员在下拉框的选项

      form:{
        deadline: '',
        task_type: '',
        courier: 1//提交时配送员编号
      },

      task_types: [
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
      tableLabel:[
        {
          prop: 'id',
          label: '任务号',
          width :200
        },
        {
          prop: 'receiverName',
          label: '客户姓名',
          width :200
        },
        {
          prop: 'receiverAddress',
          label: '投递地址',
          width :200
        },
        {
          prop: 'createTime',
          label: '任务生成日期',
          width :200
        },
        {
          prop: 'receiveTime',
          label: '要求完成日期',
          width :200
        },
        {
          prop: 'classification',
          label: '任务类型',
          width :200
        }
      ],
      tableData:[],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {
    modifyButton() {
      this.$refs.children_table.buttonInfo="打印"
    },
    getCouriers(){
      axios.get('/branch/courier/list').then(res=>{
        for(let courier of res.data.data) {
          let obj = {}
          obj.value = courier.id
          obj.label = courier.id+':'+courier.courierName
          this.courierOptions.push(obj)
        }
        console.log(this.courierOptions)
      })
    },
    printInfoToWord(row) {
      console.log(row)
      const map = new Map([
            ['任务号', row.id],
            ['电话', row.receiverPhone],
            ['送货日期', row.receiveTime],
            ['任务类型', row.classification],
            ['送货分站编号', row.branchId],
            ['客户姓名', row.receiverName],
            ['商品名称', row.productName],
            ['商品单价', row.productPrice],
            ['分站名称', paramToString(row.branchId)],
            ['商品数量', row.id],
            ['备注', row.notes],
            ['送货类型', paramToString(row.state)],
            ['客户反馈', ''],
            ['客户签名', '']
          ]
      )


      let str = ''

      for (let i of map.entries()) {
        str += i[0]+':'+i[1]+'<br>'
      }
      wordxport("配送单",str)
    },
    handleDetail(row) {
      if (row!==null) {
        console.log(row)
        this.$router.push({name: 'd_show_deliver_info', params : {data: row}})
      }else {
        this.$message.error("error")
      }
    },
    onSubmit() {
      axios.get('/branch/deliveryTask/conditions', {
        params: {
          receiveTime:this.form.deadline,
          classification: stringToParam(this.form.task_type),
          courierId: this.form.courier
        }
      }).then(res=> {
        this.tableData = res.data.data
        for (let i of this.tableData) {
          i.classification = paramToString(i.classification)
        }
        console.log(this.tableData)
      })
    },
    getAllList() {
      axios({
        method: 'get',
        url: '/branch/deliveryTask/list'
      }).then(res => {
        this.tableData = res.data.data
        for (let i of this.tableData) {
          i.classification = paramToString(i.classification)
        }
        console.log(this.tableData)
      })
    },

  },
  mounted() {
    this.modifyButton()
    this.$refs.children_table.isShow=''
    this.getAllList()
    this.getCouriers()
  }
}
</script>

<style scoped>
.table {
  height: calc(100% - 62px);
}
</style>
