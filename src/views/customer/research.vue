<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="operateType = '用户详情'" :visible.sync="showDetail">
      <detail >
      </detail>
    </el-dialog>

    <div class="manage-header">
      <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table ref="children_table" :tableData="tableData" :tableLabel="tableLabel" :config="config"  @changePage="getList()"
                  @detail="detailShowing" @edit="editUser" @del="delUser"></common-table>
  </div>
</template>
<script>
import CommonForm from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import detail from "@/views/customer/detail.vue";
import { getUser } from '@/api/data'
export default {
  name: 'research',
  components: {
    CommonForm,
    CommonTable,
    detail
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      showDetail: false,
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
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
          prop: "name",
          label: "姓名",
          width: 200
        },
        {
          prop: "age",
          label: "年龄",
          width: 200
        },
        {
          prop: "sexLabel",
          label: "性别",
          width: 200
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 300
        },
        {
          prop: "addr",
          label: "地址",
          width: 420
        }
      ], config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {
    addButton() {
      this.$refs.children_table.isShow='';
    },
    detailShowing(){
      this.showDetail = true
    }
    ,
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('/user/edit', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
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
    delUser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const id = row.id
        this.$http.post("/user/del", {
          params: { id }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      })
    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        console.log(res, 'res')
        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex === 0 ? "女" : "男"
          return item
        })
        this.config.total = res.count
        this.config.loading = false
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