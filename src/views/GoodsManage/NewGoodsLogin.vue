<template>
    <div>


      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品代码">
          <el-input v-model="form.goodscode"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-input v-model="form.sort1"></el-input>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-input v-model="form.sort2"></el-input>
        </el-form-item>
        <el-form-item label="商品型号">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="商品原价">
          <el-input v-model="form.originalprice"></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
          <el-input v-model="form.measureunit"></el-input>
        </el-form-item>
        <el-form-item label="成本价">
          <el-input v-model="form.baseprice"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣">
          <el-input v-model="form.discount"></el-input>
        </el-form-item>
        <el-form-item label="生产厂商">
          <el-input v-model="form.makefactory"></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="form.providefactory"></el-input>
        </el-form-item>
        <el-form-item label="保质期">
          <el-input v-model="form.timeforlong"></el-input>
        </el-form-item>
        <el-form-item label="是否可以退换货">
          <el-input v-model="form.exchange"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.textarea"></el-input>
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
    name: 'NewGoodsLogin',

    data () {
        return {
          form: {
            goodscode:0,
            goodsname: '',
            type:'',
            sort1:'',
            sort2:'',
            originalprice:0,
            measureunit:'',
            baseprice:0,
            discount:0,
            makefactory:'',
            providefactory:'',
            timeforlong:0,
            exchange:'',
            textarea:'',

          }
        }

    },
  methods:{
    onSubmit(){
      window.alert(1)
      axios.post(
       `/center/product/`,
        {
          id: this.form.goodscode,
          price: this.form.originalprice,
          primaryClassification:this.form.sort1,
          productName: this.form.goodsname,
          secondaryClassification:this.form.sort2

      }
      ).then(({ data: res }) => {
         window.alert(res.message)
      })

    }
  }
}
</script>

