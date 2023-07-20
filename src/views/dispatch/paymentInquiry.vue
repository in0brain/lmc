<template>
<div>
  <el-form label="80px"
           :inline="true"
           :model="form"
  >
    <el-form-item label=" 开始时间">
      <el-date-picker
          v-model="form.beginTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item label=" 结束时间">
      <el-date-picker
          v-model="form.endTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item label="商品种类">
      <el-cascader
          expand-trigger="hover"
          :options="product_kinds"
          v-model="form.product_kind"
          @change="handleChange">
      </el-cascader>
    </el-form-item>

    <el-form-item label="分站名称">
      <el-select v-model="form.branchId" placeholder="请选择">
        <el-option
            v-for="item in allBranch"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <el-table
      :data="tableData"
      style="width: 100%">
    <el-table-column
        prop="primaryClassification"
        label="商品大类"
        width="180">
    </el-table-column>
    <el-table-column
        prop="secondaryClassification"
        label="商品小类"
        width="180">
    </el-table-column>
    <el-table-column
        prop="productName"
        label="商品名称"
        width="180">
    </el-table-column>
    <el-table-column
        prop="productAmount"
        label="送货数量"
        width="180"
    >
    </el-table-column>

    <el-table-column
        prop="payAmount"
        label="收款额"
        width="180"
    >
    </el-table-column>
    <el-table-column
      prop="refundNum"
      label="退款数量"
      width="180"
    >
  </el-table-column>

    <el-table-column
      prop="refundAmount"
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
        allBranch:[],
        product_kinds: [],
        form:{
          branchId: 0,
          beginTime: '',
          endTime: '',
          product_kind:[]
        },
        tableData:[],
        belowInfo:[
          {
            key: '收款额',
            value: 0
          },
          {
            key: '退款额',
            value: 0
          },
          {
            key: '应缴额',
            value: 0
          }
        ]
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form)
        axios.get('/finance/branch/payment_query/'+this.form.branchId,{
          params: {
            startCreateTime: this.form.beginTime,
            endCreateTime: this.form.endTime,
            primaryClassification:this.form.product_kind[0],
            secondaryClassification:this.form.product_kind[1]
          }
        }).then(res=>{
          console.log(res.data.data)
          if (res.data.data === null) {
            this.tableData = []
            this.belowInfo[0].value = 0
            this.belowInfo[1].value = 0
            this.belowInfo[2].value = 0
          }else {
            this.calcMoney(res.data.data)
          }
        })
      },
      handleChange() {

      },
      getAllList() {
        axios.get('/center/branchStoreroom/get_all').then(res=>{
          let branchList = res.data.data
          let endpoints = []
          for(let item of branchList) {
            endpoints.push('/finance/branch/payment_query/'+item.id)
          }
          Promise.all(
              endpoints.map((endpoint) =>
                  axios.get(
                      endpoint,{
                        params:{}
                      }
                  )
              )
          ).then(
              axios.spread((...allData) => {
                console.log(allData)
                let productList=[]
                for (let data of allData) {
                  if (data.data.code!==500) {
                    for(let item of data.data.data) {
                      productList.push(item)
                    }
                  }
                }
                this.calcMoney(productList)
              })
          )
          }
        )
      },
      getAllBranch() {
        axios.get("/center/branchStoreroom/get_all").then(res=> {
          for (let item of res.data.data) {
            let obj={}
            obj.label = item.storeroomName
            obj.value = item.id
            this.allBranch.push(obj)
          }
        })
      },
      getProductKinds() {
        axios.get('/center/product/get_primary_classification').then(res=> {
          let primaryList=res.data.data
          for (let item of res.data.data) {
            let obj = {
              label:'',
              value:'',
              children: []
            }
            obj.label = item
            obj.value = item
            this.product_kinds.push(obj)
          }
          let endpoints = []

          for (let i of primaryList) {
            endpoints.push('/center/product/get_secondary_classification?primaryClassification='+i)
          }

          Promise.all(
              endpoints.map((endpoint) =>
                  axios.get(
                      endpoint
                  )
              )
          ).then(
              axios.spread((...allData) => {
                let index= 0
                for (let i of allData) {
                  for (let j of i.data.data) {
                    let o = {}
                    o.label = j
                    o.value = j
                    this.product_kinds[index].children.push(o)
                  }
                  ++index
                }
              })
          )
        })
      },
      calcMoney(list) {
        const set = new Set()
        for (let i of list) {
          set.add(i.productName)
        }

        console.log(set)
        for (let i of set) {
          let obj = {
            primaryClassification: '',
            secondaryClassification:'',
            productName:i,
            productAmount: 0,
            payAmount: 0,
            refundNum: 0,
            refundAmount: 0
          }
          for (let j of list) {
            if (j.productName===i) {
              obj.primaryClassification = j.primaryClassification
              obj.secondaryClassification=j.secondaryClassification
              if(j.satisfaction<0) {
                obj.refundAmount+=j.amount
                obj.refundNum+=j.productAmount
              }else{
                obj.productAmount+=j.productAmount
                obj.payAmount+=j.amount
              }
            }
          }
          this.tableData.push(obj)
        }

        for (let i of this.tableData) {
          this.belowInfo[0].value+=i.payAmount
          this.belowInfo[1].value+=i.refundAmount
          this.belowInfo[2].value+=i.payAmount-i.refundAmount
        }
      }
    },

    mounted() {
      this.getAllList()
      this.getAllBranch()
      this.getProductKinds()
    }
  }
</script>
<style scoped>
</style>