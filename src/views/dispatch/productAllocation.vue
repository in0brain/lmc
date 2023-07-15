<template>
  <div>
    <div>
      <el-form  label="80px"
                :inline="true"
                :model="form"
      >
        <el-form-item label="商品代号">
          <el-input v-model="form.product_id" placeholder="商品代号">
          </el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.product_name" placeholder="商品名称">
          </el-input>
        </el-form-item>
        <el-form-item label="库房分站">
          <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in branch_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin: auto">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data = "tableData"
                stripe
      >
        <el-table-column
            prop="id"
            label="商品代号"
            min-width="25%"
        >

        </el-table-column>
        <el-table-column
            prop="productName"
            label="商品名称"
            min-width="25%"
        >
        </el-table-column>
        <el-table-column
            prop="amount"
            label="商品数量"
            min-width="25%"
        >
        </el-table-column>
        <el-table-column
            prop="branchId"
            label="分站"
            min-width="25%"
        >
        </el-table-column>
      </el-table>
      <el-pagination
          class="pager"
          layout="prev, pager, next"
          :total="config.total"
          :current-page.sync="config.page"
          @current-change="changePage"
          @size-change="handleSizeChange"
          :page-size="page_size"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {paramToString} from "@/api/data";

export default {
  name: "productAllocation",
  data() {
    return {
      page_size: 10,
      stores:[],
      value: '',
      branch_options: [
        {
          value: 0,
          label: "中心库房"
        },
        {
          value: 1,
          label: '第一分站'
        },
        {
          value: 2,
          label: '第二分站'
        }
      ],
      form: {
        product_id: '',
        product_name : ''
      },
      tableData: [],
      config: {
        total: 10,
        page: 1
      }
    }
  },
  methods: {
    onSubmit() {

    },
    getAllProducts() {
      axios(
          {
            method: "get",
            url: '/center/branchStoreroom/get_all'
          }
      ).then(res=>{
        this.stores = res.data.data
        console.log(this.stores)
        let endpoints = [
        ]
        for (let i of this.stores) {
          endpoints.push('/delivery/branch/get_products_in_center?id='+i.id)
        }
        Promise.all(
            endpoints.map((endpoint) =>
              axios.get(
                  endpoint
              )
            )
        ).then(
            axios.spread((...allData) => {
              console.log(allData)
              let tmpTable=[]
              for (let data of allData) {
                tmpTable.push(data.data.data)
              }
              for (let i = 0;i<tmpTable.length;i++) {
                if (tmpTable[i]!==null) {
                  console.log(tmpTable[i])
                  for (let j = 0;j<tmpTable[i].length;j++) {
                    let obj= {
                      id: 0,
                      productName: '',
                      amount:0 ,
                      branchId: 0
                    }
                    obj.id=tmpTable[i][j].id
                    obj.productName=tmpTable[i][j].productName
                    obj.amount=tmpTable[i][j].amount
                    obj.branchId=paramToString(i)
                    this.tableData.push(obj)
                  }

                }
              }



              console.log(this.tableData)
            })
        )
      })



    },
    changePage(page) {
      this.$emit('changePage', page)
    },
    handleSizeChange(val){
      this.page_size=val
    }
  },
  mounted() {
    this.getAllProducts()
  }
}
</script>

<style scoped>
.table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;

  .pager {
    position: absolute;
    bottom: 0;
    right: 20px
  }
}
</style>