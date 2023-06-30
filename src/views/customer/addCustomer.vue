<style scoped>

.register-form{
  margin: auto;
  width: 30%;
}
el-button{
  text-align: center;
}

</style>
<template>
    <div class="register-form">
      <common-form :formLabel="formLabel" :form="operateForm" :inline="false" ref="form"></common-form>
      <el-button style="margin:0 auto">添加</el-button><el-button style="float: right">重置</el-button>
    </div>
</template>

<script >
import CommonForm from "@/components/CommonForm.vue";

export default {
  name: 'addCustomer',
  components: {CommonForm},
  data () {
    return {
      formLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'id_card',
          label: '身份证',
          type: 'input'
        },
        // {
        //   model: 'sex',
        //   label: '性别',
        //   type: 'select',
        //   opts: [
        //     {
        //       label: '男',
        //       value: 1
        //     },
        //     {
        //       label: '女',
        //       value: 0
        //     },
        //     {
        //       model: 'birth',
        //       label: '出生日期',
        //       type: 'date'
        //     },
        //     {
        //       model: 'addr',
        //       label: '地址',
        //       type: 'input'
        //     }
        //   ]
        // }
        {
          model: 'work_place',
          label: '工作单位',
          type: 'input'
        },{
          model: 'landline',
          label: '座机',
          type: 'input'
        },{
          model: 'mobile',
          label: '移动电话',
          type: 'input'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'postal',
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
          name: '',
          id_card: '',
          work_place:'',
          landline: '',
          mobile: '',
          addr: '',
          age: '',
          postal: '',
          email: ''
      },
      searchFrom: {
        keyword: ''
      }
    }
  },
  methods : {

  }
}
</script>