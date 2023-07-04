<template>
  <div>
    <el-card>
      <span v-for="i in aboveInfo" :key="i" class="text item">
        {{i.key + ":  "+ i.value}}
      </span>
    </el-card>
    <common-table
        ref="children_table"
        :table-label="tableLabel"
        :table-data="tableData"
        :config="config"
        @edit="edit"
    >

    </common-table>
    <el-card>
      <span v-for="i in belowInfo" :key="i" class="text item">
        {{i.key + ":  "+ i.value}}
      </span>
    </el-card>
  </div>
</template>
<script>
  import CommonTable from "@/components/CommonTable.vue";

  export default {
    name: "showDeliverInfo",
    components: {
      CommonTable

    },
    data() {
      return {

        tableLabel:[
          {
            prop: "product_name",
            label: "商品名称",
            width: 200
          },
          {
            prop: "product_price",
            label: "商品单价",
            width: 200
          },
          {
            prop: "product_amount",
            label: "商品数量",
            width: 200
          },
          {
            prop: "product_sum",
            label: "总计金额",
            width: 200
          }
        ],
        tableData:[
          {
            product_name :123,
            product_price :123,
            product_amount :123,
            product_sum :123
          }
        ],
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
            key: "邮编",
            value: ""
          },
          {
            key: "送货日期",
            value: ""
          },
          {
            key: "送货分站",
            value: ""
          },
          {
            key: "分站地址",
            value: ""
          },
          {
            key: "分站电话",
            value: ""
          }
        ],
        belowInfo:[
          {
            key: '备注',
            value: ''
          },
          {
            key: '送货要求',
            value: ''
          },
          {
            key: '客户反馈',
            value: ''
          },
          {
            key: '总价',
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
    }
  }
</script>
<style scoped lang="less">

</style>