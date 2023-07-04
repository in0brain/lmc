<template>
    <div>
      <div>
        <el-form  label="80px"
                  :inline="true"
                  :model="form"
        >
          <el-form-item label="要求完成日期">
            <el-input v-model="form.deadline" placeholder="要求完成日期">
            </el-input>
          </el-form-item>

          <el-form-item label="任务类型">
            <el-select v-model="value1" placeholder="请选择">
              <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="任务状态" >
            <el-select v-model="value2" placeholder="任务状态">
              <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分站">
            <el-select v-model="value3" placeholder="分站">
              <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <el-table :data="ticketData">
          <el-table-column prop="order_id" label="订单号">
            <template slot-scope="scope"  >
              <a @click="goToDetail(scope.row)"
              >  {{scope.row.order_id}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="ticket_id" label="任务单号">
            <template slot-scope="scope"  >
              <a @click="goToDetail(scope.row)"
              > {{scope.row.ticket_id}}</a>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              v-for = "item in ticketLabel"
              :key="item.prop"
              :label="item.label"
              :width="item.width ? item.width : 125"

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
            @current-change="changePage"
            :page-size="page_size"
        ></el-pagination>
      </div>

    </div>
</template>
<script>

export default {
  name: 'researchTicket',
  components : {

  },
  data() {
    return {
      options1: [
        {
          value: '1',
          label: '类型1'
        },
        {
          value: '2',
          label: '类型2'
        },
        {
          value: '2',
          label: '类型2'
        },
        {
          value: '3',
          label: '类型3'
        }
      ],
      options2: [
        {
          value: '1',
          label: '已分配'
        },
        {
          value: '2',
          label: '未分配'
        }
      ],
      options3: [
        {
          value: '1',
          label: '中心'
        },
        {
          value: '2',
          label: '分站'
        }
      ],
      ticketLabel:[
        {
          prop: "customer_name",
          label: "客户姓名",
          width:200
        },
        {
          prop: "deadline",
          label: "要求完成日期",
          width:200
        },{
          prop: "ticket_type",
          label: "任务类型",
          width:200
        },
        {
          prop: "complete_state",
          label: "要求完成状态",
          width:200
        },
      ],
      value1:'',
      value2:'',
      value3:'',
      ticketData:[
        {
          order_id: 123,
          ticket_id:132,
          customer_name:123,
          deadline:123,
          ticket_type:123,
          complete_state:123
        }
      ],
      page_size:20,
      config:{
        page:1,
        total:30
      },
      form: {
        deadline : '',
      }
    }
  },
  methods: {
    goToDetail(row) {
      console.log(row)
    },
    changePage() {

    },
    onSubmit() {
    }
  }
}
</script>

<style scoped>

</style>