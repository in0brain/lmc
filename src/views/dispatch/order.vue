<template>
  <div>
    <h1>{{order_name}}</h1>

    <div>
    </div>
    <div class="table-style">
      <option-table ref="children"
                    :tableData="tableData"
                    :tableLabel="tableLabel"
                    :config="config"
                    @detail="goToDetail"
      >
      </option-table>
    </div>

  </div>
</template>

<script>
import OptionTable from "@/components/OptionTable.vue";
import axios from "axios";
import {paramToString} from "@/api/data";

export default {
  name: 'order_dispatch',
  components: {
    OptionTable
  },
  data() {
    return {
      order_name: "全部订单",
      originData: [],
      tableData :[],
        // 选择项、订单号、订单状态、订单类型显示，商品代号、商品名称、商品数量在详情里面显示
        tableLabel :[
          {
            prop: "id",
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
            prop: "state",
            label: "订单状态",
            width: 200
          },{
            prop: "classification",
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
        this.$router.push({name: 'd_detail',
              params : {
                row: row,
            }
          }
        )
      }else {
        this.$message.error("error")
      }
    },
    getAllOrders() {
      axios.get("/dispatch/order/conditions",
          {
            params: {}
          }
      ).then(res=> {
        this.originData =res.data.data;
        console.log(this.originData)
        let item={};
        for (item of this.originData) {
          item.state = paramToString(item.state)
          item.classification = paramToString(item.classification)
          this.tableData.push(item)
        }
        console.log(this.tableData)
      })
    }
  },
  mounted() {
    this.getAllOrders()
  }

}
</script>
<style scoped>
  h1{
    margin: 20px;
    font-size: 40px;
  }
  .table-style {
    height: 700px;
  }

</style>