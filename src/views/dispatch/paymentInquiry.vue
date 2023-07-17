<template>
<div>
  <el-form label="80px"
           :inline="true"
           :model="form"
  >
    <el-form-item label="时间段">
      <el-select v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="商品种类">
      <el-input v-model="form.product_kind" placeholder="商品种类">
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <el-table
      :data="tableData"
      style="width: 100%">
    <el-table-column
        prop="product_kind"
        label="商品种类"
        width="180">
    </el-table-column>
    <el-table-column
        prop="product_name"
        label="商品名称"
        width="180">
    </el-table-column>
    <el-table-column
        prop="deliver_num"
        label="送货数量"
        width="180"
    >
    </el-table-column>

    <el-table-column
        prop="pay_amount"
        label="收款额"
        width="180"
    >
    </el-table-column>
    <el-table-column
      prop="refund_num"
      label="退款数量"
      width="180"
    >
  </el-table-column>

    <el-table-column
      prop="refund_amount"
      label="退款额">
  </el-table-column>
  </el-table>
  <el-card>
    <el-row>
      <el-col v-for="i in belowInfo" :span="8" :key="i">
        {{i.key + ":  "+ i.value}}
      </el-col>
    </el-row>
  </el-card>



</div>
</template>
<script>

  import axios from "axios";

  export default {
    name:'paymentInquiry',
    data() {
      return {
        options:[],
        value: '',
        form: {
          product_kind: ''
        },
        tableData:[
          {
            product_kind:123,
            product_name:123,
            deliver_num:123,
            pay_amount:123,
            refund_num:123,
            refund_amount:123
          }
        ],
        belowInfo:[
          {
            key: '实收额',
            value: ''
          },
          {
            key: '退款额',
            value: ''
          },
          {
            key: '应缴额',
            value: ''
          }
        ]
      }
    },
    methods: {
      onSubmit() {

      },
      getAllList() {
        axios({
          method: "get",
          url: '/finance/invoice/get_all'
        }).then(res=>{
          console.log(res.data.data)
        })
      }
    },
    mounted() {
      this.getAllList()
    }
  }
</script>
<style scoped>

</style>