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

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table :data = "tableData">
        <el-table-column
            prop="product_id"
            label="商品代号"
            min-width="50%"
        >

        </el-table-column>
        <el-table-column
            prop="product_name"
            label="商品名称"
            min-width="50%"
        >

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "productAllocation",
  data() {
    return {
      form: {
        product_id: '',
        product_name : ''
      },
      tableData: []
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style scoped lang="less">

</style>