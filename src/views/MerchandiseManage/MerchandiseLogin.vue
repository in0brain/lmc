<template>
    <div>


      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="商品代码">
          <el-input v-model="form.goodscode"></el-input>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
          <el-input v-model="form.measureunit"></el-input>
        </el-form-item>

        <el-form-item label="供应商">
          <el-input v-model="form.providefactory"></el-input>
        </el-form-item>

        <el-form-item label="进货量">
          <el-input v-model="form.buyinnum"></el-input>
        </el-form-item>


        <el-form-item label="日期">
          <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
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
    name: 'MerchandiseLogin',

    data () {
        return {
          form: {
            goodscode:'',
            goodsname: '',

            sort:'',


            measureunit:'',

            providefactory:'',
            buyinnum:0,
            date:'',


          }
        }

    },
  methods:{
    onSubmit(){
      alert('产生入库调拨单')
    }
  }
}
</script>

