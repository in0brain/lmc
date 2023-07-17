<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="8">
          <ul v-for="i in aboveInfo.slice(0, aboveInfo.length/3)" :key="i" class="ul-style">
                {{i.key + ":  "+ i.value}}
          </ul>
        </el-col>
        <el-col :span="8">
          <ul v-for="i in aboveInfo.slice(aboveInfo.length/3, 2*aboveInfo.length/3)" :key="i" class="ul-style">
            {{i.key + ":  "+ i.value}}
          </ul>
        </el-col>

        <el-col :span="8">
          <ul v-for="i in aboveInfo.slice(2*aboveInfo.length/3, aboveInfo.length)" :key="i" class="ul-style">
            {{i.key + ":  "+ i.value}}
          </ul>
        </el-col>
      </el-row>

    </el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
          show-overflow-tooltip
          v-for = "item in tableLabel"
          :key="item.prop"
          :label="item.label"
          min-width="25%"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-card>
      <el-row>
        <el-col :span="12">
          <ul v-for="i in belowInfo.slice(0,belowInfo.length/2)" :key="i" class="ul-style">
            {{i.key + ":  "+ i.value}}
          </ul>
        </el-col>
        <el-col :span="12">
          <ul v-for="i in belowInfo.slice(belowInfo.length/2,belowInfo.length)" :key="i" class="ul-style">
            {{i.key + ":  "+ i.value}}
          </ul>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>

  import {paramToString} from "@/api/data";

  export default {
    name: "showDeliverInfo",

    data() {
      return {
        originData: {},
        tableLabel:[
          {
            prop: "productName",
            label: "商品名称",
            width: 200
          },
          {
            prop: "productPrice",
            label: "商品单价",
            width: 200
          },
          {
            prop: "productAmount",
            label: "商品数量",
            width: 200
          },
          {
            prop: "capital",
            label: "总计金额",
            width: 200
          }
        ],
        tableData:[],
        config: {
          page: 1,
          total: 30
        },
        aboveInfo: [
          {
            key: "任务号",
            value: ""
          },
          {
            key: "任务类型",
            value: ""
          },
          {
            key: "客户姓名",
            value: ""
          },
          {
            key: "电话",
            value: ""
          },
          {
            key: "地址",
            value: ""
          },
          {
            key: "配送员编号",
            value: ""
          },
          {
            key: "送货日期",
            value: ""
          },
          {
            key: "送货分站编号",
            value: ""
          },
          {
            key: "分站名称",
            value: ""
          }
        ],
        belowInfo:[
          {
            key: '备注',
            value: ''
          },
          {
            key: '送货类型',
            value: ''
          },
          {
            key: '客户反馈',
            value: ''
          },
          {
            key: '客户签名',
            value: ''
          }
        ]
      }
    },
    methods: {
      edit() {
      }
    },
    mounted() {

      this.originData = this.$route.params.data
      this.tableData.push(this.$route.params.data)

      this.aboveInfo[0].value = this.originData.id
      this.aboveInfo[1].value = this.originData.classification
      this.aboveInfo[2].value = this.originData.receiverName
      this.aboveInfo[3].value = this.originData.receiverPhone
      this.aboveInfo[4].value = this.originData.receiverAddress
      this.aboveInfo[5].value = this.originData.courierId
      this.aboveInfo[6].value = this.originData.receiveTime
      this.aboveInfo[7].value = this.originData.branchId
      this.aboveInfo[8].value = paramToString(this.originData.branchId)


      this.belowInfo[0].value = this.originData.notes
      this.belowInfo[1].value = paramToString(this.originData.state)
    }
  }
</script>
<style scoped>
.ul-style {
  margin: 20px;
}
</style>