<template>
  <div class="table">
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
import DocxTemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'

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
            const that = this
            // 读取并获得模板文件的二进制内容
            JSZipUtils.getBinaryContent('gy-agree-service.docx', function(error, content) {
              // gy-agree-service.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
              // 抛出异常
              if (error) {
                throw error
              }
              console.log(content)
              // 创建一个PizZip实例，内容为模板的内容
              const zip = new PizZip(content)
              // 创建并加载docxtemplater实例对象
              const doc = new DocxTemplater().loadZip(zip)
              // 设置模板变量的值
              doc.setData({
                name: that.lookDetail.name,
                order_date: that.lookDetail.order_time
              })
              try {
                // 用模板变量的值替换所有模板变量
                doc.render()
              } catch (error) {
                // 抛出异常
                const e = {
                  message: error.message,
                  name: error.name,
                  stack: error.stack,
                  properties: error.properties
                }
                console.log(JSON.stringify({ error: e }))
                throw error
              }

              // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
              const out = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              })
              // 将目标文件对象保存为目标类型的文件，并命名
              saveAs(out, '同意书.docx')
            })



    },
    handleDetail(row) {
      if (row!==null) {
        console.log(row)
        this.$router.push({name: 'd_show_deliver_info', params : {data: row}})
      }else {
        this.$message.error("????")
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
    }
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
