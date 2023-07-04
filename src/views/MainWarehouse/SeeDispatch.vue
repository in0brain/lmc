

<template>
<div>
  <el-row>
    <el-col :span="6"><div> <el-select v-model="value" placeholder="分站库房">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select></div></el-col>
    <el-col :span="6"><div> <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期">
    </el-date-picker></div></el-col>
    <el-col :span="6"><div> <el-input
        placeholder="全部商品"
        v-model="goodsname"
        :disabled="true">
    </el-input></div></el-col>
    <el-col :span="6"><div > <el-button type="primary" @click="goSearch">查询</el-button></div></el-col>
  </el-row>

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
  <el-form ref="form" :model="form" label-width="100px">
    <div slot="header" class="clearfix">
      <span>出库单信息填写</span>

    </div>
    <el-form-item label="分站仓库名称">
      {{this.value}}
    </el-form-item>
    <el-form-item label="数量总计">
      <el-input
          placeholder="请输入数量"
          v-model="form.allnum"

          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="金额总计">
      <el-input
          placeholder="金额总计"
          v-model="form.allmoney"

          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="操作员">
      <el-input
          placeholder="请输入名字"
          v-model="form.operatername"
          maxlength="6"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="分发员">
      <el-input
          placeholder="请输入名字"
          v-model="form.distributername"
          maxlength="6"
          clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="签收员">
      <el-input
          placeholder="请输入名字"
          v-model="form.receivername"
          maxlength="6"
          clearable>
      </el-input>
    </el-form-item>


    <el-form-item label="日期">
      <el-date-picker

          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="form.date"
      ></el-date-picker>

    </el-form-item>
    <el-input
        type="textarea"
        placeholder="请输入备注"
        v-model="form.textarea"
        maxlength="30"
        show-word-limit
    >
    </el-input>








    <el-form-item>
      <el-button type="primary" @click="onSubmit">打印出库单</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-form-item>
  </el-form>








</div>




</template>
<script>





export default {
  name: 'SeeDispatch',
  components: {},

  data () {
    return {
      form: {
        operatername:'',
        date:'',
        distributername:'',
        receivername:'',
        textarea:'',
        allnum:0,
        allmoney:0,

      },
      date:'',
      goodsname:'',
      value:'分站1',
      options: [{
        value: '分站1',
        label: '分站1'
      }, {
        value: '分站2',
        label: '分站2'
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
        goodscode:'',
        goodsname:'',
        price:0,
        num:0
      },
      tableData: [{

        goodscode:'123456',
        goodsname:'阿斯顿马丁',
        price:3000000,
        num:30

      }],
      tableLabel: [

        {
          prop: "goodscode",
          label: "商品编号"
        },
        {
          prop: "goodsname",
          label: "商品名称"
        },
        {
          prop: "price",
          label: "售价"
        },
        {
          prop: "num",
          label: "数量"
        },

      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods:{
   onSubmit(){
        window.alert('打印成功！')
   }


  }
}
</script>

