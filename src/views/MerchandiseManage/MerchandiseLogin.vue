<template>
    <div style="width: 500px">



      <el-form ref="form" :model="form" label-width="100px">

        <el-form-item label="商品代码">
          <div style="float: left">
             <el-input v-model="form.goodscode"></el-input>


              <el-button @click="setinfo">点击填入商品信息</el-button>



          </div>

        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>



        <el-form-item label="商品一级分类">
          <el-input v-model="form.sort1"></el-input>
        </el-form-item>
        <el-form-item label="商品二级分类">
          <el-input v-model="form.sort2"></el-input>
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

import axios from "axios";

export default {
    name: 'MerchandiseLogin',

    data () {
        return {
          form: {
            goodscode:0,
            goodsname: '',
            sort1:'',
            sort2:'',
            measureunit:'',
            providefactory:'',
            buyinnum:0,
            date:'',


          }
        }

    },
  methods:{
    setinfo(){

      axios.get(
          `/delivery/center/get_products_in_center_id/`,
          {
            params:{
              productId:this.form.goodscode
            }
          }
      )
          .then(({ data: res }) => {
            console.log(res, 'res')
            if(res.data===null){
              window.alert('未查询到该代码对应商品！')
            }
            else{
              this.form.goodsname=res.data.productName
              this.form.sort1 = res.data.primaryClassification
              this.form.sort2 = res.data.secondaryClassification
              this.form.measureunit = res.data.measurement
              window.alert('填入成功！')
            }




          })

    },
    onSubmit(){
      // alert('产生进货单')
      axios(
          {
            method:'post',
            url:' /delivery/center/add_lack/',
            params:{
              productId:this.form.goodscode ,
              lackNumber:this.form.buyinnum
            }
          }
      )
          .then(({ data: res }) => {
            console.log(res, 'res')
            window.alert('已经生成入库单！')


          })
    }
  }
}
</script>

