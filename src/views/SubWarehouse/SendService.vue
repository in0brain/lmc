<template>
  <div>
    <div class="manage">
      <el-dialog :title=" '查看领货信息'" :visible.sync="isShow">
        <common-form :formLabel="operateFormLabel" :form="operateFormforsend" :inline="true" ref="form"></common-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>









      <div>
        <el-select v-model="value" placeholder="出入库类型" style="margin: 10px">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="courierId" placeholder="请输入配送员编号" style="width: 150px"></el-input>
        <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="margin: 10px">
        </el-date-picker>

        <el-button type="primary" @click="goSearch">查询</el-button>
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
          <el-table-column label="操作" min-width="180">
            <template slot-scope="scope">

              <el-button size="mini" @click="getgoods(scope.row)">领货</el-button>

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
  name: 'SendService',
  components: {CommonForm},

  data () {
    return {
      date:'',
      courierId:'',
     isShow:false,

      value:'调拨出库',
      options: [ {
        value: '调拨出库',
        label: '调拨出库'
      }, ],
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
      operateFormforsend:{
        outputTaskId:'',
        productId:'',
        productName:'',
        productPrice:0,
        productAmount:0,
        productMeasurement:0,
        company:'',

      },
      operateFormLabel: [
        {
          model: 'productId',
          label: '商品编号',
          type: 'input'
        },
        {
          model: 'productName',
          label: '商品名称',
          type: 'input'
        },
        {
          model: 'productPrice',
          label: '商品价格',
          type: 'input'
        },
        {
          model: 'productAmount',
          label: '商品数量',
          type: 'input'
        },
        {
          model: 'productMeasurement',
          label: '计量单位',
          type: 'input'
        },
        {
          model: 'company',
          label: '公司',
          type: 'input'
        },

      ],
      tableData: [],
      tableLabel: [
        {
          prop: "courierId",
          label: "配送员编号"
        },
        {
          prop: "receiverName",
          label: "收件人"
        },
        {
          prop: "receiverPhone",
          label: "收件人电话"
        },
        {
          prop: "receiveTime",
          label: "配送时间"
        },
        {
          prop: "receiverAddress",
          label: "收件地址"
        },

        {
          prop: "id",
          label: "任务单号"
        },




      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods:{

    goSearch(){
      if(this.date === ''&&this.courierId===''){
        this.init()
      }

          else if(this.date === ''&&!this.courierId==='')
      {
        axios.get(
            '/branch/deliveryTask/conditions/',
            {
              params: {
                courierId : this.courierId,
                state:211
              }
            }
        )
            .then(({data: res}) => {
              console.log(res, 'res')

              this.tableData = []
              this.tableData = res.data

            })
      }
          else if(!this.date === ''&&this.courierId===''){
        axios.get(
            '/branch/deliveryTask/conditions/',
            {
              params: {
                receiveTime : this.date,
                state:211
              }
            }
        )
            .then(({data: res}) => {
              console.log(res, 'res')

              this.tableData = []
              this.tableData = res.data

            })
      }

      else {
        axios.get(
            '/branch/deliveryTask/conditions/',
            {
              params: {
                receiveTime : this.date,
                courierId:this.courierId,
                state:211
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

      axios.put(
          `/branch/outputTask/confirm/`+this.operateFormforsend.outputTaskId,

      )
          .then(({ data: res }) => {
            console.log(res, 'res')
           window.alert(res.message)
            this.isShow = false
            this.init()


          })



    },
    getgoods(row){
      this.operateForm = row
      this.isShow = true

      axios.get(
          '/branch/outputTask/get_by_infos_accurately/',
          {
            params: {
              taskId :  this.operateForm.id,

            }
          }
      )
          .then(({data: res}) => {
            console.log(res, 'res')

            this.operateFormforsend.company= res.data[0].company
            this.operateFormforsend.productAmount = res.data[0].productAmount
            this.operateFormforsend.productId = res.data[0].productId
            this.operateFormforsend.productPrice = res.data[0].productPrice
            this.operateFormforsend.productMeasurement = res.data[0].productMeasurement
            this.operateFormforsend.productName = res.data[0].productName
            this.operateFormforsend.outputTaskId = res.data[0].id


          })







    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      this.config.loading = false
      this.config.total =4
    },
    init(){
      axios({
        method: 'get',
        url: '/branch/deliveryTask/get_by_infos_accurately/',
        params:{
          state:211
        }

      })
          .then(({ data: res }) => {
            console.log(res, 'res')
            this.tableData = res.data
            this.config.loading = true
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

