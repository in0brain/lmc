

<template>
  <div>
    <div class="manage">
      <el-dialog :title="'数量确认'" :visible.sync="isShow">
        请输入实际数量:
        <el-input v-model="this.confirmnum" placeholder="请输入实际数量"></el-input>
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


      </div>
    </div>
    <el-button  @click="seeDispatch">查看出库单</el-button>
  </div>







</template>
<script>





export default {
  name: 'DispatchOut',
  components: {},

  data () {
    return {
      date:'',
      confirmnum:0,
      isShow:false,
      value:'调拨出库',
      options: [{
        value: '选项1',
        label: '购货入库'
      }, {
        value: '选项2',
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
        dispatchnum:0,
        missionnum:'',
        date:'',
      },
      tableData: [{
        transferordernum:'djfadfouhfishfusbsfuishdfu',
        goodscode:'123456',
        goodsname:'阿斯顿马丁',
        measureunit:'辆',
        dispatchnum:25,
        missionnum:'usdfisdgfuig',
        date:'2023-1-1',

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
          prop: "dispatchnum",
          label: "出库数量"
        },
        {
          prop: "missionnum",
          label: "任务号"
        },
        {
          prop: "date",
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


    goSearch(){},
    submit(){},
   dispatchout(row){
      this.isShow=true
      this.operateForm = row
      this.confirmnum = this.operateForm.dispatchnum
    },
    seeDispatch(){
        this.$router.push('/seedispatch')
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

