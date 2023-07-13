<template>
  <div>
    <el-dialog :visible.sync="showDialog">
      <el-form>
        <el-radio-group v-model="radio" >
          <div v-for="i in radioLabels" :key="i.name" margin="20px 20px">
            <el-radio :label="i.label">{{i.name}} </el-radio>
          </div>
        </el-radio-group>
      </el-form>
    </el-dialog>
    <option-table ref="children"
                  :tableData="tableData"
                  :tableLabel="tableLabel"
                  :config="config"
                  @detail="goToAllocation"

    >

    </option-table>
  </div>
</template>
<script>
import OptionTable from "@/components/OptionTable.vue";

export default {
  name : "ticketAllocation",
  components: {OptionTable},
  data() {
      return {
        radio: 0,
        showDialog : false,
        radioLabels:[
          {
            name:"name0",
            label: 0
          },
          {
            name:"name1",
            label: 1
          }
        ],
        tableData:[],
        tableLabel: [
          {
            prop: "ticket_id",
            label: "任务号",
            width: 200
          },
          {
            prop: "customer",
            label: "客户",
            width: 200
          },
          {
            prop: "address",
            label: "地址",
            width: 200
          },
          {
            prop: "product_name",
            label: "商品名称",
            width: 200
          },
          {
            prop: "product_amount",
            label: "商品数量",
            width: 200
          },
          {
            prop: "deadline",
            label: "要求完成日期",
            width: 200
          },
          {
            prop: "ticket_type",
            label: "任务类型",
            width: 200
          }
        ],
        config: {

        }
      }
  },
  methods: {
    goToAllocation() {
      this.showDialog=true
    }
  },
  mounted() {
    this.$refs.children.operate = "分配"
  }
}
</script>
<style scoped>

</style>