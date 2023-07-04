<template>
    <div class="manage">
        <el-dialog :title="operateType === 'add' ? '新增供应商' : '更新供应商'" :visible.sync="isShow">
            <common-form :formLabel="opertateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+ 新增</el-button>
            <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">
                <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
            </common-form>
        </div>
      <div class="common-table">
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

              <el-button size="mini" @click="editUser(scope.row)">修改</el-button>
              <el-button size="mini" @click="delUser(scope.row)">删除</el-button>

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

// import { getUser } from '@/api/data'
export default {
    name: 'SupplierManage',
    components: {
        CommonForm,

    },
    data() {
        return {
            operateType: 'add',
            isShow: false,
            opertateFormLabel: [
                {
                    model: 'name',
                    label: '供应商名称',
                    type: 'input'
                },
                {
                    model: 'contactor',
                    label: '联系人',
                    type: 'input'
                },
                {
                    model: 'tel',
                    label: '联系电话',
                    type: 'input'
                },
                {
                    model: 'addr',
                    label: '地址',
                    type: 'input'
                },
              {
                model: 'postcode',
                label: '邮编',
                type: 'input'
              },
              {
                model: 'personinlaw',
                label: '法人',
                type: 'input'
              },
              {
                model: 'bank',
                label: '开户行',
                type: 'input'
              },
              {
                model: 'account',
                label: '银行账号',
                type: 'input'
              },
              {
                model: 'textarea',
                label: '备注',
                type: 'input'
              },
            ],
            operateForm: {
                name: '',
                contactor: '',
                tel: '',
                addr: '',
                postcode: '',
                personinlaw:'',
                bank:'',
                account:'',
                textarea:''
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
            tableData: [{
              name: '1',
              contactor: '1',
              tel: '11111',
              addr: '11111',

            },],
            tableLabel: [
                {
                    prop: "name",
                    label: "名称"
                },
                {
                    prop: "contactor",
                    label: "联系人"
                },
                {
                    prop: "tel",
                    label: "联系电话"
                },

                {
                    prop: "addr",
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
            // if (this.operateType === 'edit') {
            //     this.$http.post('/user/edit', this.operateForm).then(res => {
            //         console.log(res)
            //         this.isShow = false
            //         this.getList()
            //     })
            // } else {
            //     this.$http.post('/user/add', this.operateForm).then(res => {
            //         console.log(res)
            //         this.isShow = false
            //         this.getList()
            //     })
            // }
        },
        addUser() {
            this.isShow = true
            this.operateType = 'add'
            this.operateForm = {
              name: '',
              contactor: '',
              tel: '',
              addr: '',
              postcode: '',
              personinlaw:'',
              bank:'',
              account:'',
              textarea:''
            }
        },
        editUser(row) {
            this.operateType = 'edit'
            this.isShow = true
            this.operateForm = row
        },
        delUser() {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                // const id = row.id
                // this.$http.post("/user/del", {
                //     params: { id }
                // }).then(() => {
                //     this.$message({
                //         type: 'success',
                //         message: '删除成功'
                //     })
                //     this.getList()
                // })
            })
        },
        getList() {
            // this.config.loading = true
            // name ? (this.config.page = 1) : ''
            // getUser({
            //     page: this.config.page,
            //     name
            // }).then(({ data: res }) => {
            //     console.log(res, 'res')
            //     this.tableData = res.list.map(item => {
            //         item.sexLabel = item.sex === 0 ? "女" : "男"
            //         return item
            //     })
            //   if(this.tableData.length===0){
            //     this.addUser()
            //   }
            //   if(this.tableData.length>1){
            //     window.alert("您查询到了多个用户，请正确输入完整用户名确保唯一！！")
            //   }
            //     this.config.total = res.count
            //     this.config.loading = false
            // })
        }
    },
    created() {
        // this.getList()
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
