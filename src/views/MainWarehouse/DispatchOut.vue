

<template>
  <div>
    <div class="manage">
      <el-dialog :title="'数量确认'" :visible.sync="isShow">
        <div>
          请输入实际数量:
        </div>
       <div>
         <el-input v-model="confirmnum" ></el-input>
       </div>

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
        <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
        </el-date-picker>

        <el-button type="primary" @click="goSearch(date)" style="margin: 10px">查询</el-button>
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

              <el-button size="mini" @click="dispatchout(scope.row)">出库</el-button>

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
        <el-button  @click="seeDispatch">查看出库单</el-button>

      </div>
    </div>

  </div>







</template>
<script>





import axios from "axios";

export default {
  name: 'DispatchOut',
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
          prop: "productAmount",
          label: "出库数量"
        },
        {
          prop: "taskId",
          label: "任务号"
        },
        {
          prop: "receiveTime",
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
   seeState(){
     if(this.value==='未确认'){
       axios.get(
           '/center/outputTask/get_by_infos/',
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
           '/center/outputTask/get_by_infos/',
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

    goSearch(date=''){
      if(date === '')
        this.init()
      else {

        axios.get(
            '/center/outputTask/get_by_infos/',
            {
              params: {
                receiveTime : date,

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
    submit(){

       if(this.confirmnum-this.operateForm.productAmount===0) {

         axios( {
               method:'post',
               url:'/center/outputTask/confirm/',
               params:{
                 orderId:this.operateForm.orderId,
                 outputTaskId:this.operateForm.id



               }
             }
         ).then(({ data: res }) => {
           window.alert("出库单"+res.message)
           this.isShow = false
         })
       }
       else{

         window.alert("实际出库数量与出库单不匹配！")
         this.isShow = false
       }



    },
   dispatchout(row){
     this.operateForm = row
     if(this.operateForm.state===30){
       this.isShow=true
     }
     else{
       window.alert('该出库单已确认，不能出库！')
     }



    },
    seeDispatch(){

        this.$router.push('/seedispatch')
    },

    init(){
      axios({
        method: 'get',
        url: '/center/outputTask/get_all/',

      })
          .then(({ data: res }) => {
            console.log(res, 'res')
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

