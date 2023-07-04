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

    <common-table ref="children_table"
                  :table-label="tableLabel"
                  :table-data="tableData"
                  :config = "config"
                  @edit="printInfo"
                  @detail="handleDetail"
    >

    </common-table>
  </div>
</template>
<script>
import CommonTable from "@/components/CommonTable.vue";

export default {
  name :"researchTicket",
  components: {
    CommonTable
  },
  data() {
    return {
      form:{
        deadline: '',
        ticket_type: '',
        delivery: ''
      },
      tableLabel:[
        {
          prop: 'mission_id',
          label: '任务号',
          width :200
        },
        {
          prop: 'customer_name',
          label: '客户姓名',
          width :200
        },
        {
          prop: 'deliver_address',
          label: '投递地址',
          width :200
        },
        {
          prop: 'generation_date',
          label: '任务生成日期',
          width :200
        },
        {
          prop: 'completion_date',
          label: '要求完成日期',
          width :200
        },
        {
          prop: 'mission_type',
          label: '任务类型',
          width :200
        }
      ],
      tableData:[
        {
          mission_id:123,
          customer_name:123,
          deliver_address:123,
          generation_date:123,
          completion_date:123,
          mission_type:123
        }
      ],
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
    printInfo() {

    },
    handleDetail(row) {
      if (row!==null) {
        console.log(row)
        this.$router.push({name: 'd_show_deliver_info', params : {row: row}})
      }else {
        this.$message.error("????")
      }
    },
    onSubmit() {

    }
  },
  mounted() {
    this.modifyButton()
    this.$refs.children_table.isShow=''

  }
}
</script>

<style scoped lang="less">

</style>