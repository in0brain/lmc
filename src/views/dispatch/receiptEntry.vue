<template>
  <div>
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
          prop: 'ticket_id',
          label: '任务单号',
          width:200
        },
        {
          prop: 'customer_name',
          label: '客户姓名',
          width:200
        },
        {
          prop: 'phone_num',
          label: '电话',
          width:200
        },
        {
          prop: 'address',
          label: '地址',
          width:200
        },
        {
          prop: 'deadline',
          label: '要求完成日期',
          width:200
        },
        {
          prop: 'ticket_type',
          label: '任务类型',
          width:200
        }
      ],
      tableData:[
        {
          ticket_id:123,
          customer_name:123,
          phone_num:123,
          address:123,
          deadline:123,
          ticket_type:123
        }
      ],
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

      }
  }
}
</script>
<style scoped lang="less">

</style>