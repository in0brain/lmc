<template>
    <div>


      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="仓库名称">
          <el-input v-model="form.storeroomName"></el-input>
        </el-form-item>

        <el-form-item label="仓库地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="仓库管理员">
          <el-input v-model="form.administrator"></el-input>
        </el-form-item>
        <el-form-item label="仓库最大存量">
          <el-input v-model="form.maximum"></el-input>
        </el-form-item>
        <el-form-item label="仓库最小存量">
          <el-input v-model="form.minimum"></el-input>
        </el-form-item>
        <el-form-item label="仓库级别">
          <el-input v-model="form.storeroomLevel"></el-input>
        </el-form-item>







        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
<!--          <el-button>取消</el-button>-->
        </el-form-item>
      </el-form>
    </div>







</template>
<script>

import axios from "axios";

export default {
    name: 'NewWareHouse',

    data () {
        return {
          form: {
            address: "",
            administrator: "",
            id: 0,
            maximum: 0,
            minimum: 0,
            storeroomLevel: 0,
            storeroomName: ""
          }
        }

    },
  methods:{
    onSubmit(){
      alert('添加新仓库')
      axios.post(
          `/center/branchStoreroom/`,
          {
            address: this.form.address,
            administrator: this.form.administrator,
            id: this.form.id,
            maximum: this.form.maximum,
            minimum: this.form.minimum,
            storeroomLevel: this.form.storeroomLevel,
            storeroomName: this.form.storeroomName

          }
      ).then(({ data: res }) => {
        window.alert(res.message)
      })
    }
  }
}
</script>

