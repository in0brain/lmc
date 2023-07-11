<template>
  <div class="option-table">
      <el-table :data="tableData"
                height="90%"
                @selection-change="handleSelectionChange"
                stripe>
        <el-table-column label="操作" type="selection" min-width="55">

        </el-table-column>
      <el-table-column
          show-overflow-tooltip
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :min-width="item.width ? item.width : 125"

      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column  min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.row)">{{operate}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="pager"
        layout="prev, pager, next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="page_size"
    ></el-pagination>
  </div>
</template>
<script>

export default {
  name: "OptionTable",

  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  data() {
    return {
      page_size: 20,
      operate: "详情"
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },
    handleDetail(row) {
      this.$emit('detail',row)
    },
    handleSelectionChange: function (val){
      console.log(val)
    }
  }
}
</script>
<style lang="less" scoped>
.option-table {
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
