<template>
  <div>
    <div>
      <el-form  label="80px"
               :inline="true"
                :model="formInline"
      >
        <el-form-item label="要求送货时间段">
          <el-input v-model="formInline.deliver_time" placeholder="要求送货时间段">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <common-table
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
export default {
  name: "modifyState",
  components :{
    CommonTable
  },
  data() {
    return {
      formLabelPosition: 'left',
      tableData: [
        {
          order_id: 123,
          customer_name:123,
          phone_number:123,
          address:123,
          post_code:123,
          order_date:123,
          order_amount:123
        }

      ],
      tableLabel: [
        {
          prop: "order_id",
          label: "订单号",
          width: 200
        },
        {
          prop: "customer_name",
          label: "客户名",
          width: 200
        },{
          prop: "phone_number",
          label: "电话号",
          width: 200
        },{
          prop: "address",
          label: "地址",
          width: 200
        },{
          prop: "post_code",
          label: "邮编",
          width: 200
        },{
          prop: "order_date",
          label: "订购日期",
          width: 200
        },{
          prop: "order_amount",
          label: "订单总款",
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
      console.log(this.formInline.deliver_time)
    },
    modifyState(row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>

</style>