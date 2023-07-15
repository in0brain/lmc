<template>
    <div class="manage">
        <el-dialog :title="operateType === 'add' ? '新增供应商' : '修改供应商'" :visible.sync="isShow">
            <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addSupplier">+ 新增</el-button>
            <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">
                <el-button type="primary" @click="goSearch(searchFrom.keyword)">编号搜索</el-button>
            </common-form>
        </div>
      <div class="common-table" style="height: 700px">
        <el-table :data="tableData" height="90%" stripe  ref="multipleTable" >

          <el-table-column
              show-overflow-tooltip
              v-for="item in tableLabel"
              :key="item.prop"
              :label="item.label"
              style="width: 200px"

          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
            </template>

          </el-table-column>
          <el-table-column label="操作" min-width="180">
            <template slot-scope="scope">

              <el-button size="mini" @click="editSupplier(scope.row)">修改</el-button>
              <el-button size="mini" @click="delSupplier(scope.row)">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            class="pager"
            layout="prev, pager, next"
            :total="config.total"
            :current-page.sync="config.page"
            @current-change="getList"
            :page-size="20"
        ></el-pagination>

      </div>
    </div>
</template>
<script>
import CommonForm from '@/components/CommonForm.vue'
import axios from "axios";


export default {
    name: 'SupplierManage',
    components: {
        CommonForm,

    },
    data() {
        return {

            operateType: 'add',
            isShow: false,
            operateFormLabel: [
              {
                model: 'id',
                label: '供应商编号',
                type: 'input'
              },
                {
                    model: 'supplierName',
                    label: '供应商名称',
                    type: 'input'
                },
                {
                    model: 'contacts',
                    label: '联系人',
                    type: 'input'
                },
                {
                    model: 'phone',
                    label: '联系电话',
                    type: 'input'
                },
              {
                model: 'fax',
                label: '传真',
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
                model: 'corporation',
                label: '法人',
                type: 'input'
              },
              {
                model: 'bankName',
                label: '开户行',
                type: 'input'
              },
              {
                model: 'bankAccount',
                label: '银行账号',
                type: 'input'
              },
              {
                model: 'notes',
                label: '备注',
                type: 'input'
              },
            ],
            operateForm: {

            },
            formLabel: [
                {
                    model: "keyword",
                    label: '',
                    type: 'input'
                }
            ],
            searchFrom: {
                keyword: ''
            },
            tableData: [],
            tableLabel: [
              {
                prop: "id",
                label: "供应商编号"
              },
                {
                    prop: "supplierName",
                    label: "供应商名称"
                },
                {
                    prop: "contacts",
                    label: "联系人"
                },
                {
                    prop: "phone",
                    label: "联系电话"
                },

                {
                    prop: "address",
                    label: "地址",
                    width: 320
                }
            ],
            config: {
                page: 1,
                total: 30
            }
        }
    },
    methods: {
        confirm() {
          if(this.operateType==='add')
          {


              axios.post(
                  '/delivery/supplier/',
                  {
                    address:this.operateForm.address,
                    bankAccount: this.operateForm.bankAccount,
                    bankName: this.operateForm.bankName,
                    contacts: this.operateForm.contacts,
                    corporation:this.operateForm.corporation,
                    fax: this.operateForm.fax,
                    id: this.operateForm.id,
                    notes:this.operateForm.notes,
                    phone: this.operateForm.phone,
                    supplierName: this.operateForm.supplierName,
                    zipCode: this.operateForm.zipCode
                  },
              ).then(({ data: res }) => {

                if(res.code===500)
                  window.alert("添加了重复的供应商编号！")
                else {
                  window.alert(res.message)
                  this.isShow = false
                  this.init()
                }

              })


          }

          else{
            axios.put(
                '/delivery/supplier/',
                {
                  address:this.operateForm.address,
                  bankAccount: this.operateForm.bankAccount,
                  bankName: this.operateForm.bankName,
                  contacts: this.operateForm.contacts,
                  corporation:this.operateForm.corporation,
                  fax: this.operateForm.fax,
                  id: this.operateForm.id,
                  notes:this.operateForm.notes,
                  phone: this.operateForm.phone,
                  supplierName: this.operateForm.supplierName,
                  zipCode: this.operateForm.zipCode
                },
            ).then(({ data: res }) => {
              window.alert(res.message)

              this.isShow = false
            })
          }

        },
        addSupplier() {
            this.isShow = true
            this.operateType = 'add'
            this.operateForm = {
              address: "",
              bankAccount: "",
              bankName: "",
              contacts: "",
              corporation: "",
              fax: "",
              id: 0,
              notes: "",
              phone: "",
              supplierName: "",
              zipCode: ""
            }
            this.init()
        },
        editSupplier(row) {
            this.operateType = 'edit'
            this.isShow = true
            this.operateForm = row
        },
        delSupplier(row) {
            this.operateForm = row
          axios({
            method: 'delete',
            url: '/delivery/supplier/id/'+this.operateForm.id,

          })
              .then(({ data: res }) => {
                   window.alert("删除完毕！")
               this.init()
                this.config.total = res.data.length
                this.config.loading = false
              })

        },
      goSearch(id=''){
          if(id===''){
            this.init()
          }else{
            this.tableData=[]
            axios({
              method: 'get',
              url: '/delivery/supplier/id/'+id,

            })
                .then(({ data: res }) => {


                  this.tableData.push(res.data)
                  this.config.total = res.data.length
                  this.config.loading = false
                })
          }
      },
       init(){

         axios({
           method: 'get',
           url: '/delivery/supplier/all/',

         })
             .then(({ data: res }) => {

               this.tableData = res.data

               this.config.total = res.data.length
               this.config.loading = false
             })
       }
    },
    created() {
        this.init()


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
