<template>
  <div class="manage">
    <el-dialog :title="'查看订单'" :visible.sync="isShow">
      <common-form :formLabel="seeFormLabel" :form="seemoretable" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">退出</el-button>

      </div>
    </el-dialog>
    <div class="manage-header">

      <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">
        <el-button type="primary" @click="getList(searchFrom.keyword)">客户名搜索</el-button>
      </common-form>
    </div>
    <div class="common-table">
      <el-table :data="tableDataforshow" height="90%" stripe>
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
            <el-button size="mini" @click="seeMore(scope.row)">查看</el-button>
            <el-button size="mini" @click="handleReturn(scope.row)">退货</el-button>
            <el-button size="mini"  @click="handleExchange(scope.row)">换货</el-button>
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
import{paramToString} from "@/api/data";

export default {
  name: 'OrderSearch',
  components: {
    CommonForm,

  },
  data() {
    return {
    seemoretable:{},
    isShow:false,
      seeFormLabel: [
        {
          model: 'customName',
          label: '客户名',
          type: 'input'
        },
        {
          model: 'customPhone',
          label: '客户电话',
          type: 'input'
        },
        {
          model: 'customAddress',
          label: '客户地址',
          type: 'input'
        },
        {
          model: 'customZipCode',
          label: '客户邮编',
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
          model: 'productPrimaryClassification',
          label: '商品一级分类',
          type: 'input'
        },
        {
          model: 'productSecondaryClassification',
          label: '商品二级分类',
          type: 'input'
        },
        {
          model: 'receiverName',
          label: '收货人姓名',
          type: 'input'
        },
        {
          model: 'receiverPhone',
          label: '收货人电话',
          type: 'input'
        },
        {
          model: 'receiverAddress',
          label: '收货人地址',
          type: 'input'
        },
        {
          model: 'receiverZipCode',
          label: '收货人邮编',
          type: 'input'
        },
        {
          model: 'receiveTime',
          label: '配送时间',
          type: 'input'
        },
        {
          model: 'request',
          label: '备注需求',
          type: 'input'
        },
        {
          model: 'sum',
          label: '总金额',
          type: 'input'
        },

      ],

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
        id:'',
        classification:'',
        state:''
      },
      tableData: [],
      tableDataforshow: [],
      tableLabel: [
        {
          prop: "id",
          label: "订单号"
        },
        {
          prop: "classification",
          label: "订单类型"
        },
        {
          prop: "state",
          label: "订单状态"
        },

      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {


    handleReturn(row){
      this.operateForm = row
      axios.post(
          '/customer_service/order/returnProduct/'+this.operateForm.id,


      ).then(({ data: res }) => {
        window.alert(res.message)
        this.tableDataforshow=[]
        this.init()
      })
    },
    handleExchange(row){
      this.operateForm = row
      axios.post(
          '/customer_service/order/exchangeProduct/'+this.operateForm.id,


      ).then(({ data: res }) => {
        window.alert(res.message)
        this.tableDataforshow=[]
        this.init()
      })

    },
    seeMore(row){
      this.operateForm = row

      axios.get(

          '/customer_service/order/conditions',
          {
            params:{
              id:this.operateForm.id,


            }
          }

      )
          .then(({ data: res }) => {
            this.seemoretable = res.data[0]

            this.isShow=true
          })
    },
    getList(name='') {
      if(name==='')
        this.init()
      else{
        axios.get(

            '/customer_service/order/conditions',
            {
              params:{
                customName:name,


              }
            }

        )
            .then(({ data: res }) => {
              console.log(res, 'res')

              this.tableDataforshow = res.data
              for(var item of this.tableDataforshow){
                item.classification = paramToString(item.classification)
                item.state = paramToString(item.state)

              }

            })
      }

    },
    init(){
      axios({
        method: 'get',
        url: '/customer_service/order/conditions',

      })
          .then(({ data: res }) => {
            console.log(res, 'res')
               this.tableData = res.data
               this.tableDataforshow = res.data
               for(var item of this.tableDataforshow){
                 item.classification = paramToString(item.classification)
                 item.state = paramToString(item.state)

               }

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
<style lang="less" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px
  }
}
</style>
