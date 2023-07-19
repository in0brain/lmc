<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'用户详情'" :visible.sync="showDetail">
      <detail >
      </detail>
    </el-dialog>

    <div class="manage-header">
      <el-form  label="80px"
                :inline="true"
                :model="form"
      >
        <el-form-item label="客户电话">
          <el-input v-model="form.phone" placeholder="客户电话">
          </el-input>
        </el-form-item>

       <el-form-item label="客户身份证">
         <el-input v-model="form.identity" placeholder="客户身份证">
         </el-input>
       </el-form-item>
        <el-form-item label="客户名字">
          <el-input v-model="form.customName" placeholder="客户名字">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="research(form)">查询</el-button>
        </el-form-item>
      </el-form>

    </div>
    <common-table ref="children_table"
                  :tableData="tableData"
                  :tableLabel="tableLabel"
                  :config="config"
                  @changePage="getList()"
                  @detail="detailShowing"
                  @edit="editUser"
    ></common-table>
  </div>
</template>
<script>
import CommonForm from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import detail from "@/views/customer/detail.vue";
import axios from "axios";
export default {
  name: 'research',
  components: {
    CommonForm,
    CommonTable,
    detail
  },
  data() {
    return {
      originData: [],
      rowId: '',
      form: {
        identity: '',
        phone: '',
        customName: ''
      },
      operateType: 'add',
      isShow: false,
      showDetail: false,
      operateFormLabel: [
        {
          model: 'customName',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'email',
          label: '电子邮件',
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
        //     }
        //   ]
        // },
        {
          model: 'phone',
          label: '电话',
          type: 'input'
        },
        {
          model: 'company',
          label: '工作单位',
          type: 'input'
        },
        {
          model: 'address',
          label: '地址',
          type: 'input'
        },
        {
          model: 'zipCode',
          label: '邮政编码',
          type: 'input'
        }
      ],
      operateForm: {
        id: '',
        customName: '',
        address: '',
        email: '',
        phone: '',
        company: '',
        zipCode: ''
      },
      searchFrom: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop:"id",
          label:"编号",
          width: 200
        },
        {
          prop: "customName",
          label: "姓名",
          width: 200
        },
        {
          prop: "company",
          label: "工作单位",
          width: 200
        },
        {
          prop: "landline",
          label: "座机",
          width: 200
        },
        {
          prop: "phone",
          label: "电话",
          width: 200
        },
        {
          prop: "zipCode",
          label: "邮政编码",
          width: 200
        },
        {
          prop: "identity",
          label: "身份证号",
          width: 300
        }
      ], config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {
    research(form) {
      if (form.identity===''&&form.phone===''&&form.customName==='') {
        this.getList()
      }else {
        axios.get('/customer_service/custom/get_by_infos',
            {
              params: {
                identity: form.identity,
                phone: form.phone,
                customName: form.customName
              }
            }
        ).then(res=>{
          console.log(res)
          if(res.data.code === 600) {
            console.log(res.data.data)
            this.tableData=res.data.data
          }else {
            console.log("查询失败")
          }
        }).catch(e=>{
          console.log(e)
        })
      }

    },

    addButton() {
      this.$refs.children_table.isShow=''
      this.$refs.children_table.needDel=''
    },
    detailShowing(){
      this.showDetail = true
    }
    ,
    confirm() {
      console.log(this.operateType)
      if (this.operateType === 'edit') {
        axios(
            {
              method: "put",
              url: "/customer_service/custom/",
              data: {
                id: this.operateForm.id,
                customName: this.operateForm.customName,
                address: this.operateForm.address,
                email: this.operateForm.email,
                phone: this.operateForm.phone,
                company: this.operateForm.company,
                zipCode: this.operateForm.zipCode
              }
            }
        ).then(res=> {
          console.log(res)
          this.isShow = false
          this.getList()
          this.$message('修改成功')
        }).catch(e=>{
          console.log(e)
        })

      } else {
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    // delUser(row) {
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确认",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     const id = row.id
    //     this.$http.post("/user/del", {
    //       params: { id }
    //     }).then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功'
    //       })
    //       this.getList()
    //     })
    //   })
    // },
    getList() {
      axios({
        method: 'get',
        url: '/customer_service/custom/get_all',
        data: {}
      }).then(res=>{
        console.log(res.data.data)
        this.originData = res.data.data
        this.tableData = res.data.data

      }).catch(e=> {
        console.log(e)
      })
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.addButton()
  }
}

</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>