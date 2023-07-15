<template>
  <div class="table">
    <el-dialog :visible.sync="showDialog">
      <el-form inline>
        <el-form-item label="分站库房">
          <el-select v-model="branch" placeholder="请选择" style="margin: auto">
            <el-option
                v-for="item in branchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配送员">
          <el-select v-model="courier" placeholder="请选择" style="margin: auto">
            <el-option
                v-for="item in courierOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">开始分配</el-button>
        </el-form-item>
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
import axios from "axios";
import {paramToString} from "@/api/data";

export default {
  name : "ticketAllocation",
  components: {OptionTable},
  data() {
      return {
        radio: 0,
        value:'',
        showDialog : false,
        branch: '',
        branchOptions:[],
        courier: '',
        courierOptions:[],
        tableData:[],
        tableLabel: [
          {
            prop: "id",
            label: "任务号",
            width: 200
          },
          {
            prop: "receiverName",
            label: "接收人",
            width: 200
          },
          {
            prop: "receiverAddress",
            label: "地址",
            width: 200
          },
          {
            prop: "productName",
            label: "商品名称",
            width: 200
          },
          {
            prop: "productAmount",
            label: "商品数量",
            width: 200
          },
          {
            prop: "receiveTime",
            label: "要求完成日期",
            width: 200
          },
          {
            prop: "classification",
            label: "任务类型",
            width: 200
          }
        ],
        config: {
          page: 30,
          total:1
        }
      }
  },
  methods: {
    goToAllocation() {
      this.showDialog=true
    },
    getAllList() {
      axios.get(
          '/branch/deliveryTask/conditions',
          {
            params: {
            }
          }
      ).then(res=> {
        for (let i of res.data.data) {
          i.classification = paramToString(i.classification)
          this.tableData.push(i)
        }
        console.log(this.tableData)
      })
    },
    getAllOptions() {
      let endpoints=[
        '/branch/courier/list',
        '/center/branchStoreroom/get_all'
      ]
      Promise.all(
          endpoints.map((endpoint) =>
              axios.get(
                  endpoint
              )
          )
      ).then(
          axios.spread((...allData) => {
            console.log(allData[0].data.data)
            console.log(allData[1].data.data)

            for(let courier of allData[0].data.data) {
              let obj = {}
              obj.value = courier.id
              obj.label = courier.id+':'+courier.courierName
              this.courierOptions.push(obj)
            }

            for (let branch of allData[1].data.data) {
              let obj={}
              obj.value = branch.id
              obj.label = branch.storeroomName
              this.branchOptions.push(obj)
            }
            console.log(this.courierOptions)
            console.log(this.branchOptions)
          })
      )
    },
    submit() {
      console.log(this.branch)
      console.log(this.courier)
      this.showDialog = false
    }
  },
  mounted() {
    this.$refs.children.operate = "分配"
    this.getAllList()
    this.getAllOptions()
  }
}
</script>
<style scoped>
.table {
  height: 100%;
  background-color: #fff;
  position: relative;

}
</style>