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
          <el-select v-model="value" placeholder="出入库类型">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期">
          </el-date-picker>

          <el-button type="primary" @click="goSearch">查询</el-button>
        </div>

          <div class="block">


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



export default {
    name: 'BuyInWarehouse',
  components: {},

    data () {
        return {
          date:'',
          confirmnum:0,
          isShow:false,
         value:'购货入库',
          options: [{
            value: '购货入库',
            label: '购货入库'
          }, {
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
            transferordernum:'',
            goodscode:'',
            goodsname:'',
            measureunit:'',
            buyinnum:0
          },
          tableData: [{
            transferordernum:'djfadfouhfishfusbsfuishdfu',
            goodscode:'123456',
            goodsname:'阿斯顿马丁',
            measureunit:'辆',
            buyinnum:30

          }],
          tableLabel: [
            {
              prop: "transferordernum",
              label: "调拨单号"
            },
            {
              prop: "goodscode",
              label: "商品代码"
            },
            {
              prop: "goodsname",
              label: "商品名称"
            },
            {
              prop: "measureunit",
              label: "计量单位"
            },
            {
              prop: "buyinnum",
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

    goSearch(){},
   submit(){},
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

