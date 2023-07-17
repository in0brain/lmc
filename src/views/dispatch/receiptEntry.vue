<template>
  <div class="table">
    <el-form label="80px"
             :inline="true"
             :model="form"
    >
      <el-form-item label="要求完成日期">
        <el-input v-model="form.deadline" placeholder="要求完成日期">
        </el-input>
      </el-form-item>
      <el-form-item label="任务类型">
        <el-input v-model="form.ticket_type" placeholder="任务类型">
        </el-input>
      </el-form-item>
      <el-form-item label="配送员">
        <el-input v-model="form.delivery" placeholder="配送员">
        </el-input>
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
    <el-button @click="onSubmit">录入</el-button>
  </div>
</template>
<script>
import OptionTable from "@/components/OptionTable.vue";
import axios from "axios";

export default {
  name: "receiptEntry",
  components: {OptionTable},
  data() {
    return {
      form: {
        deadline:'',
        ticket_type:'',
        delivery: ''
      },
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
        // {
        //   prop: 'deadline',
        //   label: '要求完成日期',
        //   width:200
        // },
        // {
        //   prop: 'ticket_type',
        //   label: '任务类型',
        //   width:200
        // },
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
      onSubmit(obj) {
        this.$router.push({name: 'd_show_receipt_detail', params : obj})
      },
      goToDetail() {

      },
      getAllList() {
        axios.get('/branch/receipt/list').then(res=> {
          console.log(res.data.data)
          this.tableData = res.data.data
        })
      }
  },
  mounted() {
    this.getAllList()
  }
}
</script>
<style scoped>
.table {
  height: calc(100% - 62px);
}
</style>