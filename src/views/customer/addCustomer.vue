<style scoped>
.register-form{
  //background: whitesmoke;
  margin-left: 20px;
  margin-right: 200px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 50px;
}
el-button{
  text-align: center;
}

</style>
<template>
<!--    <div class="register-form">-->
      <el-card>
        <common-form :formLabel="formLabel" :form="operateForm" :inline="false" ref="form">
        </common-form>
        <el-button style="margin-left:150px" @click="addCustomer">添加</el-button>
        <el-button style="margin-left:250px">重置</el-button>
      </el-card>
<!--    </div>-->
</template>

<script >
import CommonForm from "@/components/CommonForm.vue";
import axios from "axios";

export default {
  name: 'addCustomer',
  components: {CommonForm},
  data () {
    return {
      formLabel: [
        {
          model: 'customName',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'identity',
          label: '身份证',
          type: 'input'
        },
        {
          model: 'company',
          label: '工作单位',
          type: 'input'
        },
        {
          model: 'landline',
          label: '座机',
          type: 'input'
        },{
          model: 'phone',
          label: '移动电话',
          type: 'input'
        },
        {
          model: 'address',
          label: '地址',
          type: 'input'
        },
        {
          model: 'zipCode',
          label: '邮编',
          type: 'input'
        },
        {
          model: 'email',
          label: '电子邮件',
          type: 'input'
        },
      ],
      operateForm: {
          customName: '',
          identity: '',
          address:'',
          company:'',
          landline: '',
          phone: '',
          zipCode: '',
          email: ''
      },
      searchFrom: {
        keyword: ''
      }
    }
  },
  methods : {
    addCustomer() {
      console.log(this.operateForm)
      axios(
          {
            method: "post",
            url: "/customer_service/custom/",
            data: this.operateForm
          }
      ).then((res)=> {
        console.log(res)
      })
    }
  }
}
</script>