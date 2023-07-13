<template>
  <div>
    <div class="manage">










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





export default {
  name: 'SendService',
  components: {},

  data () {
    return {
      date:'',


      value:'调拨出库',
      options: [{
        value: '调拨入库',
        label: '调拨入库'
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
        missionnum:'',
        getinnum:0,
        date:''
      },
      tableData: [{
        transferordernum:'djfadfouhfishfusbsfuishdfu',
        goodscode:'123456',
        goodsname:'阿斯顿马丁',
        measureunit:'辆',
        missionnum:'dfahfaouhdfaiuhf',
        getinnum:30,
        date:'2023-1-1'

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
          prop: "getinnum",
          label: "入库数量"
        },
        {
          prop: "missionnum",
          label: "任务单号"
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
    getgoods(row){
      this.isShow=true
      this.operateForm = row
      this.confirmnum = this.operateForm.getinnum
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

