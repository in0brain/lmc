<template>
  <div>
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="showDialog">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <span v-for="i in info" :key="i" class="text item">
        {{i.key + ":  "+ i.value}}
      </span>
    </el-card>
    <common-table ref="children_table"
                  :table-label="tableLabel"
                  :table-data="tableData"
                  :config="config"
                  @edit="editOrder"
    >
    </common-table>
    <div style="margin: 20px">
      <el-radio v-model="radio" label="0" @click.native="showMenu($event)">自动选择</el-radio>
      <el-radio v-model="radio" label="1" @click.native="showMenu($event)">人工选择</el-radio>
    </div>

    <br>
    <el-select v-model="value" placeholder="请选择" :style="{display: show_menu}">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-button>提交</el-button>
  </div>
</template>
<script>
    import CommonTable from "@/components/CommonTable.vue";
    import CommonForm from "@/components/CommonForm.vue";

    export default {
      name: "d_order_detail",

      components: {
        CommonForm,
        CommonTable
      },
      data() {
        return {
          operateType: 'add',
          showDialog: false,
          radio:"0",
          show_menu: "none",
          info:[
            {
              key: "订单号",
              value:""
            },
            {
              key: "订单类型",
              value:""
            },
            {
              key: "订单状态",
              value:""
            },
            {
              key: "用户名",
              value:""
            },
            {
              key: "订单录入员",
              value:""
            },
            {
              key: "收货人",
              value:""
            },
            {
              key: "发票",
              value:""
            },
            {
              key: "电话",
              value:""
            },
            {
              key: "地址",
              value:""
            },
            {
              key: "邮编",
              value:""
            }
          ],
          tableLabel: [
            {
              prop: "product_id",
              label: "商品代码",
              width: 200
            },
            {
              prop: "product_name",
              label: "商品名称",
              width: 200
            },
            {
              prop: "product_num",
              label: "商品数量",
              width: 200
            },
            {
              prop: "sum",
              label: "总计金额",
              width: 200
            }
          ],
          tableData:[
            {
              product_id:1,
              product_name:"app",
              product_num:123,
              sum:123
            },
            {
              product_id:2,
              product_name:"app",
              product_num:123,
              sum:123
            },
            {
              product_id:1,
              product_name:"app",
              product_num:123,
              sum:123
            },
            {
              product_id:1,
              product_name:"app",
              product_num:123,
              sum:123
            },
            {
              product_id:5,
              product_name:"app",
              product_num:123,
              sum:123
            }
          ],
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
          config: {
            page: 1,
            total: 30
          },
          options:[],
          // 选择框中的值
          value:""
        }
      },
      methods: {
        getInfo() {
          for(let i = 0; i<this.info.length;i++) {
            this.info[i].value = i+'';
          }
        },
        changeTableSize(num) {
          this.$refs.children_table.page_size=num;
        }
        ,
        getList() {

        },
        showMenu() {
          if (this.radio==='1') {
            this.show_menu = ''
          }else {
            this.show_menu = 'none'
          }
        },
        editOrder(row) {
          this.operateType = 'edit'
          this.showDialog = true
          this.operateForm = row
        },
        submit() {
          this.showDialog = false

          this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          });

        }
      },
      mounted() {
        this.changeTableSize(6)
        this.getInfo()
      }
    }
</script>
<style scoped>
.text {
  font-size: 20px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}
common-table {
  height: 50%;
}
</style>