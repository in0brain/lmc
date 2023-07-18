<template>
  <div class="table">
    <el-form label="80px"
             :inline="true"
             :model="form"
    >
      <el-form-item label="配送日期">
        <el-date-picker
            v-model="form.create_time"
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

    <option-table ref="children"
                  :tableData="tableData"
                  :tableLabel="tableLabel"
                  :config="config"
                  @detail="goToDetail"
    >
    </option-table>

    <br>
    <el-button @click="enter">录入</el-button>
  </div>
</template>
<script>
import OptionTable from "@/components/OptionTable.vue";
import axios from "axios";
import {paramToString} from "@/api/data";

export default {
  name: "receiptEntry",
  components: {OptionTable},
  data() {
    return {
      form: {
        create_time:'',
        ticket_type:20,
        courier: 1
      },
      courierOptions:[],//所有配送员在下拉框的选项
      task_types: [
        /**
         * [20,""],
         *     [21,""],
         *     [22,""],
         *     [32,""],
         */
        {
          value: 20,
          label: '调度(正常订单)'
        },
        {
          value: 21,
          label: '调度(换货订单)'
        },
        {
          value: 22,
          label: '退货'
        },
        {
          value: 32,
          label: '其他'
        }
      ],
      tableLabel:[
        {
          prop: 'id',
          label: '任务单号',
          width:200
        },
        {
          prop: 'customName',
          label: '客户姓名',
          width:200
        },
        {
          prop: 'customPhone',
          label: '电话',
          width:200
        },
        {
          prop: 'address',
          label: '地址',
          width:200
        },
        {
          prop: 'createTime',
          label: '要求完成日期',
          width:200
        },
        {
          prop: 'classification',
          label: '任务类型',
          width:200
        },{
          prop: 'courierName',
          label: '配送员姓名',
          width:200
        },
        {
          prop: 'branchName',
          label: '库房名称',
          width:200
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
      onSubmit() {
        axios.get('/branch/receipt/get_by_infos',{
          params: {
            createTime: this.form.create_time,
            classification: this.form.ticket_type,
            courierId:this.form.courier
          }
        }).then(res=> {
          console.log(res.data.data)
          this.tableData = res.data.data
          for (let i of this.tableData) {
            i.classification = paramToString(i.classification)
          }
        })
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
      goToDetail(obj) {
        this.$router.push({name: 'd_show_receipt_detail', params : obj})

      },
      getAllList() {
        axios.get('/branch/receipt/list').then(res=> {
          console.log(res.data.data)
          this.tableData = res.data.data
          for (let i of this.tableData) {
            i.classification = paramToString(i.classification)
          }
        })
      },
      enter() {
        this.$message('已经自动录入')
      }
  },
  mounted() {
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