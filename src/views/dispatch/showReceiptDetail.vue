<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card>
            <div v-for="i in commonInfo" :key="i.key">
              {{i.value}}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">

          <el-card v-for="i in 4" :key="i">
            {{i}}
          </el-card>

        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: "showReceiptDetail",
    data() {
      return {
        commonInfo:[
          {
            key: '任务单号',
            value :'123'
          },
          {
            key: '任务类型',
            value :'123'
          },
          {
            key: '客户姓名',
            value :'123'
          },
          {
            key: '电话',
            value :'123'
          },
          {
            key: '送货地址',
            value :'123'
          },
          {
            key: '任务分站',
            value :'123'
          },
          {
            key: '任务状态',
            value :'123'
          },
          {
            key: '客户满意度',
            value :'123'
          },
          {
            key: '备注',
            value :'123'
          }
        ]
      }
    },
    methods: {

    }
  }
</script>
<style scoped>


.bg-purple {
  background: #d3dce6;
}


</style>