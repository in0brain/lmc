<template>
    <div>
      <div class="manage">
        <el-dialog :title="'数量确认'" :visible.sync="isShow">
          请输入实际数量:
          <el-input v-model="confirmnum"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">返回</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </el-dialog>









        <div>
          <el-select v-model="value" placeholder="出入库类型">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click="seeState" style="margin: 10px">查看状态</el-button>

        </div>

          <div class="block">


          </div>


        <div class="common-table" style="height: 700px" >
          <el-table :data="tableData" height="90%" stripe  ref="multipleTable"  >

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

                <el-button size="mini" @click="buyin(scope.row)">入库</el-button>

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

export default {
    name: 'BuyInWarehouse',
  components: {},

    data () {
        return {
          date:'',
          confirmnum:0,
          isShow:false,
         value:'所有',
          options: [{
            value: '未确认',
            label: '未确认'
          }, {
            value: '已确认',
            label: '已确认'
          }, {
            value: '所有',
            label: '所有'
          },],
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
          tableData: [],
          tableLabel: [
            {
              prop: "id",
              label: "调拨单号"
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
              prop: "productPrice",
              label: "商品价格"
            },
            {
              prop: "productMeasurement",
              label: "计量单位"
            },
            {
              prop: "lackNumber",
              label: "购入数量"
            },

          ],
          config: {
            page: 1,
            total: 30
          }
        }
    },
  methods:{
   seeState(){
     if(this.value==='未确认'){
       axios.get(
           '/center/lackTask/get_by_infos/',
           {
             params: {
               state:30,

             }
           }
       )
           .then(({data: res}) => {
             console.log(res, 'res')

             this.tableData = []
             this.tableData = res.data

           })
     }else if(this.value==='已确认'){
       axios.get(
           '/center/lackTask/get_by_infos/',
           {
             params: {
              state:31,

             }
           }
       )
           .then(({data: res}) => {
             console.log(res, 'res')

             this.tableData = []
             this.tableData = res.data

           })
     }
     else{
       this.init()
     }


   },
    // goSearch(date=''){
    //   if(date === '')
    //     this.init()
    //   else {
    //     axios.get(
    //         '/center/product/get_by_infos/',
    //         {
    //           params: {
    //             receiveTime : date,
    //
    //           }
    //         }
    //     )
    //         .then(({data: res}) => {
    //           console.log(res, 'res')
    //
    //           this.tableData = []
    //           this.tableData = res.data
    //
    //         })
    //   }
    // },
   submit(){
     if(this.confirmnum<this.operateForm.lackNumber){
        //不让提交
      window.alert('实际入库数量小于缺货单需求的数量！')
       this.isShow = false
     } else {
       //确认
       axios.post(
           `/delivery/center/confirm/`,
           {
             company: this.operateForm.company,
             id: this.operateForm.id,
             lackNumber: this.operateForm.lackNumber,
             notes:this.operateForm.notes ,
             orderId:this.operateForm.orderId ,
             productId: this.operateForm.productId,
             productMeasurement:this.operateForm.productMeasurement ,
             productName: this.operateForm.productName,
             productNumber: this.operateForm.productNumber,
             productPrice: this.operateForm.productPrice,
             state: this.operateForm.state,
             taskId:this.operateForm.taskId


           }
       )
           .then(({ data: res }) => {
             console.log(res, 'res')




           })
       //将多的更新到库存

       if(this.confirmnum>this.operateForm.lackNumber){


           axios(

         {
           method:'put',
           url:' /center/storeroom/amount_add/',
           params:{
             amount: this.confirmnum-this.operateForm.lackNumber,
             productId:this.operateForm.productId
           }

         }
           ).then(({ data: res }) => {
             console.log(res, 'res')




           })




       }
       this.isShow = false
     }






   },
    buyin(row){

         this.operateForm = row
      if(this.operateForm.state===30){
        this.isShow=true
      }
      else{
         window.alert("该缺货单已确认，不能入库！")
      }


    },
    init(){
      axios({
        method: 'get',
        url: '/center/lackTask/get_all/',

      })
          .then(({ data: res }) => {
            console.log(res, 'res')
            // window.alert(res.data)
            this.tableData = res.data

          })
    },

  } ,
  created(){

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

