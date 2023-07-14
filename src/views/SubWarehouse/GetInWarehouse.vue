<template>
    <div>
      <div class="manage">
        <el-dialog :title="'新建&检查入库单'" :visible.sync="isShow">
          <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
          </div>
        </el-dialog>







        <div>
          <el-button type="primary" @click="add">新建&检查</el-button>
          <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
          style="margin: 10px">
          </el-date-picker>

          <el-button type="primary" @click="goSearch(date)">查询</el-button>
        </div>

          <div class="block">


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
    </div>







</template>
<script>



import axios from "axios";
import CommonForm from "@/components/CommonForm.vue";

export default {
    name: 'GetInWarehouse',
  components: {CommonForm},

    data () {
        return {
          date:'',
          isShow:false,

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
          operateForm:{

          },
          operateFormLabel: [
            {
              model: 'company',
              label: '供应商',
              type: 'input'
            },
            {
              model: 'productName',
              label: '商品名',
              type: 'input'
            },
            {
              model: 'productAmount',
              label: '商品数量',
              type: 'input'
            },
            {
              model: 'productPrice',
              label: '商品价格',
              type: 'input'
            },
            {
              model: 'productId',
              label: '商品代码',
              type: 'input'
            },
            {
              model: 'productMeasurement',
              label: '计量单位',
              type: 'input'
            },
            {
              model: 'taskId',
              label: '任务编号',
              type: 'input'
            },
          ],
          tableData: [],
          tableLabel: [
            {
              prop: "taskId",
              label: "任务单号"
            },
            {
              prop: "productId",
              label: "商品代码"
            },
            {
              prop: "productName",
              label: "商品名称"
            },
            {
              prop: "productMeasurement",
              label: "计量单位"
            },
            {
              prop: "productAmount",
              label: "入库数量"
            },
            {
              prop: "id",
              label: "入库单号"
            },

            {
              prop: "inputTime",
              label: "日期"
            },


          ],
          config: {
            page: 1,
            total: 30
          }
        }
    },
  methods:{

    goSearch(date=''){
      if(date === '')
        this.init()
      else {

        axios.get(
            '/branch/inputTask/get_by_infos',
            {
              params: {
                inputTime : date,

              }
            }
        )
            .then(({data: res}) => {
              console.log(res, 'res')

              this.tableData = []
              this.tableData = res.data

            })
      }
    },

    confirm(){
      axios.post(
          `/branch/inputTask/check/`,
          {
            company: this.operateForm.company,
            productAmount: this.operateForm.productAmount,
            productId:this.operateForm.productId,
            productMeasurement: this.operateForm.productMeasurement,
            productName: this.operateForm.productName,
            productPrice: this.operateForm.productPrice,
            taskId: this.operateForm.taskId

          }
      ).then(({ data: res }) => {

        if(res.code===600){
          window.alert("检查通过！")
          this.isShow = false
          this.init()
        }

        else{
          window.alert("检查结果错误！")
        }

      })





    },
    add(){
         this.isShow = true
      this.operateForm = {
        company: "",
        productAmount: 0,
        productId: 0,
        productMeasurement: 0,
        productName: "",
        productPrice: 0,
        taskId: ""
      }
    },

    init(){
      axios({
        method: 'get',
        url: '/branch/inputTask/get_all/',

      })
          .then(({ data: res }) => {
            console.log(res, 'res')
            this.tableData = res.data
            this.config.total = res.data.length
            this.config.loading = false
          })
    }
  },
  created(){
      this.init()
  }
}
</script>

