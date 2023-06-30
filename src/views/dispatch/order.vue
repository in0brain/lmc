<template>
  <div>
    <h1>{{order_name}}</h1>

    <div>
    </div>
    <option-table ref="children"
                  :tableData="tableData"
                  :tableLabel="tableLabel"
                  :config="config"
                  @detail="goToDetail"
    >
    </option-table>
  </div>
</template>

<script>
import OptionTable from "@/components/OptionTable.vue";
export default {
  name: 'order_dispatch',
  components: {
    OptionTable
  },
  data() {
    return {
      order_name: "xxxxxxx",
      tableData :[
          {
            order_id: 123123,
            order_state: '已签收',
            order_type: '水果',
            product_id: 15951,
            product_name:'apple',
            product_num : 100
          },
          {
            order_id: 123123,
            order_state: '已签收',
            order_type: '不知道',
            product_id: 15951,
            product_name:'nigger',
            product_num : 100
          }
        ],
        // 选择项、订单号、订单状态、订单类型显示，商品代号、商品名称、商品数量在详情里面显示
        tableLabel :[
          {
            prop: "order_id",
            label: "订单号",
            width: 200
          },
          // {
          //   prop: "product_id",
          //   label: "商品代号",
          //   width: 200
          // },
          // {
          //   prop: "product_name",
          //   label: "商品名称",
          //   width: 200
          // },
          // {
          //   prop: "product_num",
          //   label: "商品数量",
          //   width: 200
          // },
          {
            prop: "order_state",
            label: "订单状态",
            width: 200
          },{
            prop: "order_type",
            label: "订单类型",
            width: 200
          }
        ],
        config: {
          page: 1,
          total: 30
        }
    }
  },
  methods: {
    goToDetail(row) {
      if (row!==null) {
        console.log(row)
        this.$router.push({name: 'd_detail', params : {row: row}})
      }else {
        this.$message.error("????")
      }
    }
  }

}
</script>
<style scoped>
  h1{
    margin: 20px;
    font-size: 40px;
  }
</style>