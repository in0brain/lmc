<template>
    <div>


      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="仓库名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="仓库地址">
          <el-input v-model="form.addr"></el-input>
        </el-form-item>
        <el-form-item label="仓库管理员">
          <el-input v-model="form.manager"></el-input>
        </el-form-item>

        <el-form-item label="仓库级别">
          <el-input v-model="form.type"></el-input>
        </el-form-item>







        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
<!--          <el-button>取消</el-button>-->
        </el-form-item>
      </el-form>
    </div>







</template>
<script>

export default {
    name: 'NewWareHouse',

    data () {
        return {
          form: {
            name:'',
            addr: '',

            manager:'',


            type:'',


          }
        }

    },
  methods:{
    onSubmit(){
      alert('添加新仓库')
    }
  }
}
</script>

