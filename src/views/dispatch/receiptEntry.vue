<template>
  <div class="table">

    <div>
      <el-dialog :title="'确认签收'" :visible.sync="showDialog">
        <el-form :model="dialog_form" inline>
          <el-form-item label="客户反馈" >
            <el-input
                v-model="dialog_form.feedback">
            </el-input>
          </el-form-item>
          <el-form-item label="客户满意度">
            <el-input
                v-model="dialog_form.satisfaction"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-dialog>
    </div>
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

  </div>
</template>
<script>
import OptionTable from "@/components/OptionTable.vue";
import axios from "axios";
import {paramToString, stringToParam} from "@/api/data";

export default {
  name: "receiptEntry",
  components: {OptionTable},
  data() {
    return {
      dialog_form: {
        feedback: '',
        satisfaction: ''
      },
      showDialog: false,
      row_val: {},
      form: {
        create_time:'',
        ticket_type:410,
        courier: 1
      },
      courierOptions:[],//所有配送员在下拉框的选项
      task_types: [
        /**
         * [410,"配送任务(直接付款型)"],
         *     [411,"配送任务(货到付款型)"],
         *     [420,"配送任务(退货取货)"],
         *     [430,"配送任务(换货型)"],
         *     [440,"其他任务"],
         */
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
          label: '任务单号',
          width:200
        },
        {
          prop: 'receiverName',
          label: '客户姓名',
          width:200
        },
        {
          prop: 'receiverPhone',
          label: '电话',
          width:200
        },
        {
          prop: 'receiverAddress',
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
          prop: 'courierId',
          label: '配送员编号',
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
        console.log(this.form)
        axios.get('/branch/deliveryTask/get_by_infos_accurately',{
          params: {
            createTime: this.form.create_time,
            classification: this.form.ticket_type,
            courierId:this.form.courier
          }
        }).then(res=> {
          console.log(res)
           this.tableData = []
          if (res.data.data!==null) {
            for (let item of res.data.data) {
              if (item.state===221||item.state===222) {
                this.tableData.push(item)
              }
            }
            for (let i of this.tableData) {
              i.classification = paramToString(i.classification)
            }
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
        // this.$router.push({name: 'd_show_receipt_detail', params : obj})
        console.log(obj)
        this.row_val = obj
        this.showDialog = true
      },
      getAllList() {
        let endpoints = [
          '/branch/deliveryTask/get_by_infos_accurately?state=221',
          '/branch/deliveryTask/get_by_infos_accurately?state=222'
        ]

        Promise.all(
            endpoints.map((endpoint) =>
                axios.get(endpoint)
            )
        ).then(
            axios.spread((...allData) => {
              this.tableData=allData[0].data.data
              for (let obj of allData[1].data.data) {
                this.tableData.push(obj)
              }

              for (let item of this.tableData) {
                item.classification = paramToString(item.classification)
              }
            })
        )
      },
      submit() {
        this.row_val.feedback = this.dialog_form.feedback
        this.row_val.satisfaction = this.dialog_form.satisfaction
        this.row_val.classification = stringToParam(this.row_val.classification)
        console.log(this.row_val)
        axios(
              {
                method: "put",
                url: "/branch/deliveryTask/confirm/"+this.row_val.id,
                params: this.row_val
              }
          ).then(res=> {
          console.log(res)
          if(res.data.code===600) {
            this.$message('成功')
          }else {
            this.$message.error('失败')
          }
          this.row_val.classification = paramToString(this.row_val.classification)
          this.showDialog = false
        })
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