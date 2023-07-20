<template>
    <div>
      <div class="manage">
        <el-dialog :title="'数量确认'" :visible.sync="isShow">
          请输入实际数量:
          <el-input v-model="confirmnum" placeholder="请输入实际数量"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">返回</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </el-dialog>









        <div>

          <common-form :formLabel="formLabel" :form="searchFrom" :inline="true" ref="form">
            <el-button type="primary" @click="goSearch(searchFrom.keyword)">商品名查询</el-button>
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

                <el-button size="mini" @click="buyin(scope.row)">进货</el-button>

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



import CommonForm from "@/components/CommonForm.vue";
import axios from "axios";

export default {
    name: 'ShortCheck',
  components: {CommonForm},

    data () {
        return {
          tableDatafornow:[],
          confirmnum:0,
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
          tableData: [],
          tableLabel: [

            {
              prop: "id",
              label: "商品代码"
            },
            {
              prop: "productName",
              label: "商品名称"
            },
            {
              prop: "price",
              label: "商品价格"
            },
            {
              prop: "primaryClassification",
              label: "一级分类"
            },
            {
              prop: "secondaryClassification",
              label: "二级分类"
            },
            {
              prop: "amount",
              label: "现有库存量"
            },

            {
              prop: "lackAmount",
              label: "缺货数量"
            },




          ],
          config: {
            page: 1,
            total: 30
          }
        }
    },
  methods:{

    goSearch(name=''){

      if(name!==''){

        for (var item of this.tableData){

          if(item.productName===name){
          this.tableDatafornow.push(item)
          }
        }
        this.tableData = this.tableDatafornow
        this.tableDatafornow=[]
      }
      else {
        this.init()
      }


    },
   submit(){
     axios(
         {
           method:'post',
           url:' /delivery/center/add_lack/',
           params:{
             productId:this.operateForm.id ,
             lackNumber:this.confirmnum
           }
         }
     ).then(({ data: res }) => {
       console.log(res, 'res')
       window.alert('已经生成入库单！')
       this.isShow = false
       this.init()
     })


   },
    buyin(row){
         this.isShow=true
         this.operateForm = row
         this.confirmnum = this.operateForm.lackAmount
    },
    init(){
      axios({
        method: 'get',
        url: '/delivery/center/get_lack_product/',

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

