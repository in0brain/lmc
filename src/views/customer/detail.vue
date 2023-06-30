<template>
  <div class="manage">
    <common-table ref="children_table"
                  :tableData="tableData"
                  :tableLabel="tableLabel"
                  :config="config"
    >
    </common-table>
  </div>
</template>
<script>
import CommonTable from '@/components/CommonTable.vue'
export default {
  name: 'detail',
  components: {
    CommonTable
  },
  data() {
    return {
      operateType: 'add',
      tableData: [
        {
          id: 123,
          product_name: 'xxxx',
          product_count: 123,
          product_price: 111,
          product_condition: '未签收'
        }
      ],
      tableLabel: [
        {
          prop: "id",
          label: "订单号",
          width: 200
        },
        {
          prop: "product_name",
          label: "商品名",
          width: 200
        },
        {
          prop: "product_count",
          label: "商品数量",
          width: 200
        },
        {
          prop: "product_price",
          label: "商品价格",
          width: 200
        },
        {
          prop: "product_condition",
          label: "商品状态",
          width: 200
        }
      ], config: {
        page: 1,
        total: 10
      }
    }
  },
  methods: {
  //   getList(name = '') {
  //     this.config.loading = true
  //     name ? (this.config.page = 1) : ''
  //     getOrders()
  //   }
  // },
  // created() {
  //     this.getList()
  }
}

</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>