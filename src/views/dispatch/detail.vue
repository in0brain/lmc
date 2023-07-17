<template>
  <div>
    <div>
      <h1>{{kind==='order'?'订单详情':''}}</h1>
    </div>
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="showDialog">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
    <el-card class="box-card">
<!--      <div slot="header" class="clearfix">-->
<!--        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
<!--      </div>-->
      <el-row>
        <el-col :span="8">
          <div>
            <ul v-for="i of info.slice(0,info.length/3)" :key="i" class="text item">
              {{i.key + ": "+ i.value}}
          </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <ul v-for="i of info.slice(info.length/3,2*info.length/3)" :key="i" class="text item">
              {{i.key + ": "+ i.value}}
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <ul v-for="i of info.slice(2*info.length/3,info.length)" :key="i" class="text item">
              {{i.key + ": "+ i.value}}
            </ul>
          </div>
        </el-col>
      </el-row>

    </el-card>
    <common-table ref="children_table"
                  :table-label="tableLabel"
                  :table-data="tableData"
                  :config="config"
                  @edit="edit"
    >
    </common-table>
    <div :style="{display: kind==='order' ? '':'none'}">
      <div style="margin: 20px 20px">
        <el-radio v-model="radio" label="0" @click.native="showMenu($event)">自动选择</el-radio>
        <el-radio v-model="radio" label="1" @click.native="showMenu($event)">人工选择</el-radio>
      </div>

      <el-select v-model="value" placeholder="请选择" :style="{display: show_menu}">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="modifyBranchId">提交</el-button>
    </div>
  </div>
</template>
<script>
    import CommonTable from "@/components/CommonTable.vue";
    import CommonForm from "@/components/CommonForm.vue";
    import axios from "axios";
    import {paramToString} from "@/api/data";

    export default {
      name: "d_order_detail",

      components: {
        CommonForm,
        CommonTable
      },
      data() {
        return {
          order_id: '',
          kind: 'order',
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
              key: "订单状态",
              value:""
            },
            {
              key: "用户名",
              value:""
            },
            {
              key: "收货人",
              value:""
            },
            {
              key: "分站",
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
            },
            {
              key: "订单类型",
              value: ""
            }
          ],

          tableLabel: [
            {
              prop: "productId",
              label: "商品代码",
              width: 200
            },
            {
              prop: "productName",
              label: "商品名称",
              width: 200
            },
            {
              prop: "productAmount",
              label: "商品数量",
              width: 200
            },
            {
              prop: "sum",
              label: "总计金额",
              width: 200
            }
          ],
          tableData:[],
          operateFormLabel: [
            {
              model: 'receiverName',
              label: '姓名',
              type: 'input'
            },
            {
              model: 'receiverAddress',
              label: '收件人地址',
              type: 'input'
            },
            {
              model: 'receiverPhone',
              label: '收件人电话',
              type: 'input'
            },
            {
              /**
               *    [310,"购买订单(直接付款型)"],
               *     [311,"购买订单(货到付款型)"],
               *     [320,"退货订单"],
               *     [330,"换货订单"],
               *     [340,"其他订单"],
               */
              model: 'classification',
              label: '订单类型',
              type: 'select',
              opts : [
                {
                  label: "购买订单(直接付款型)",
                  value: 310
                },
                {
                  label: "购买订单(货到付款型)",
                  value: 311
                },
                {
                  label: "退货订单",
                  value: 320
                },
                {
                  label: "换货订单",
                  value: 330
                },
                {
                  label: "其他订单",
                  value: 340
                }
              ]
            },
            {
              /**
               * [100, "已提交,等待调度"],
               *     [110,"已调度,缺货中"],
               *     [111,"中心库房采购中"],
               *     [112, "中心库房有货物,正在送往分站库房"],
               *     [120,"已调度,订单进行中"],
               *     [121,"商品已经就绪,等待发出"],
               *     [122,"退货商品取回中"],
               *     [130,"投递员已领货,任务配送中"],
               *     [140,"已完成"],
               *     [141,"已退订"],
               *     [150,"失败"],
               * */
              model: 'state',
              label: '订单状态',
              type: 'select',
              opts: [
                {
                  label: '已提交,等待调度',
                  value: 100
                },
                {
                  label: '已调度,缺货中',
                  value: 110
                },
                {
                  label: '中心库房采购中',
                  value: 111
                },
                {
                  label: '中心库房有货物,正在送往分站库房',
                  value: 112
                },
                {
                  label: '已调度,订单进行中',
                  value: 120
                },
                {
                  label: '商品已经就绪,等待发出',
                  value: 121
                },
                {
                  label: '退货商品取回中',
                  value: 122
                },
                {
                  label: '投递员已领货,任务配送中',
                  value: 130
                },
                {
                  label: '已完成',
                  value: 140
                },
                {
                  label: '已退订',
                  value: 141
                },
                {
                  label: '失败',
                  value: 150
                }
              ]
            }
          ],
          operateForm: {
            receiverName: '',
            receiverAddress: '',
            receiverPhone: '',
            receiverZipCode: '',
            classification: 0
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
          options:[
            {
              value: 0,
              label: "中心库房"
            },
            {
              value: 1,
              label: "分站库房"
            }
          ],
          // 选择框中的值
          value: 0
        }
      },
      methods: {
        getInfo(id) {//赋给基础值
          axios.get(
              "/dispatch/order/conditions",{
                params: {
                  id: id
                }
              }
          ).then(row=> {
            console.log(row.data.data)

            this.info[0].value = row.data.data[0].id
            this.info[1].value = paramToString(row.data.data[0].state)
            this.info[2].value = row.data.data[0].customName
            this.info[3].value = row.data.data[0].receiverName
            this.info[4].value = row.data.data[0].branchId===0?'中心库房':'分站库房'
            this.info[5].value = row.data.data[0].receiverPhone
            this.info[6].value = row.data.data[0].receiverAddress
            this.info[7].value = row.data.data[0].receiverZipCode
            this.info[8].value = paramToString(row.data.data[0].classification)

          })

        },
        changeTableSize(num) {
          this.$refs.children_table.page_size=num;
        }
        ,
        // 获取row中订单的信息，询问后端订单中的元素
        getList(id) {
          axios.get(
              "/dispatch/order/conditions",{
                params: {
                  id: id
                }
              }
          ).then(res=> {
            this.tableData=res.data.data
          })
        },
        showMenu() {
          if (this.radio==='1') {
            this.show_menu = ''
          }else {
            this.show_menu = 'none'
          }
        },
        edit(row) {
          this.operateType = 'edit'
          this.showDialog = true
          this.operateForm = row
        },
        submit() {
          this.showDialog = false
          console.log(this.operateForm)
          axios({
            method:'put',
            url:'/dispatch/order/',
            data: this.operateForm
          }).then(res=> {
            console.log(res)
            this.$message({
              message: ' 修改成功',
              type: 'success'
            });
            this.getList(this.order_id)
            this.getInfo(this.order_id)
          }).catch(e=>{
            console.log(e)
          })
        },
        modifyBranchId(){
          console.log(this.value)
          axios({
            method:'put',
            url:'/dispatch/order/',
            data: {
              id: this.order_id,
              branchId: this.value
            }
          }).then(res=> {
            console.log(res)
            this.$message({
              message: ' 修改成功',
              type: 'success'
            });
            this.getList(this.order_id)
            this.getInfo(this.order_id)
          }).catch(e=>{
            console.log(e)
          })
        }
      },
      mounted() {
        console.log(this.$route.params)
        this.changeTableSize(6)
        this.order_id=this.$route.params.row.id
        this.getInfo(this.order_id)
        this.getList(this.order_id)
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
h1 {
  margin: 20px 20px;
  font-size: 50px;
}
</style>