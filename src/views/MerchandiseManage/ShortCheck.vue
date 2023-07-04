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
            <el-button type="primary" @click="getList(searchFrom.keyword)">商品名查询</el-button>
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

export default {
    name: 'ShortCheck',
  components: {CommonForm},

    data () {
        return {
          date:'',
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

            goodscode:'',
            goodsname:'',
            nownum:'',
            safenum:0,
            shortnum:0,
            date:'2022-2-2',
            buyinnum:1,

          },
          tableData: [{
            goodscode:'1212112',
            goodsname:'aston',
            nownum:3,
            safenum:1,
            shortnum:2,
            date:'2022-2-2',
            buyinnum:1,

          }],
          tableLabel: [

            {
              prop: "goodscode",
              label: "商品代码"
            },
            {
              prop: "goodsname",
              label: "商品名称"
            },
            {
              prop: "nownum",
              label: "现有库存量"
            },
            {
              prop: "safenum",
              label: "安全库存量"
            },
            {
              prop: "shortnum",
              label: "缺货数量"
            },
            {
              prop: "date",
              label: "日期"
            },
            {
              prop: "buyinnum",
              label: "进货量"
            },


          ],
          config: {
            page: 1,
            total: 30
          }
        }
    },
  methods:{

    goSearch(){},
   submit(){alert('生成进货单')},
    buyin(row){
         this.isShow=true
         this.operateForm = row
         this.confirmnum = this.operateForm.buyinnum
    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      this.config.loading = false
      this.config.total =4
    }
  }
}
</script>

