<template>
    <div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>购物车</span>
        </div>
        <div>
          <el-table
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column label="全选" type="selection" min-width="55">
            </el-table-column>
            <el-table-column
                prop="name"
                label="商品名称"
                width="200">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                prop="style"
                label="款式"
                width="200">
            </el-table-column>
            <el-table-column
                prop="price"
                label="单价"
                width="200">
            </el-table-column>
            <el-table-column
                prop="num"
                label="数量"
                width="200">
            </el-table-column>
            <el-table-column
                prop="totalmoney"
                label="金额"
                show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top: 20px">
<!--          <el-button @click="toggleSelection()">全选</el-button>-->
          <el-button @click="delfromshoppingcart()">删除</el-button>
          <el-button @click="addallmoney()" margin-left="200px">合计</el-button>
          {{this.allmoney}}
          <el-button @click="goOrder()">订购</el-button>

        </div>
      </el-card>
<!--       <el-table-->
<!--           ref="multipleTable"-->
<!--           :data="tableData"-->
<!--           tooltip-effect="dark"-->
<!--           style="width: 100%"-->
<!--           @selection-change="handleSelectionChange">-->
<!--         <el-table-column-->
<!--             type="selection"-->
<!--             width="55">-->
<!--         </el-table-column>-->
<!--         <el-table-column-->
<!--             prop="name"-->
<!--             label="商品名称"-->
<!--             width="120">-->
<!--           <template slot-scope="scope">{{ scope.row.name }}</template>-->
<!--         </el-table-column>-->
<!--         <el-table-column-->
<!--             prop="price"-->
<!--             label="单价"-->
<!--             width="120">-->
<!--         </el-table-column>-->
<!--         <el-table-column-->
<!--             prop="num"-->
<!--             label="数量"-->
<!--             width="120">-->
<!--         </el-table-column>-->
<!--         <el-table-column-->
<!--             prop="totalmoney"-->
<!--             label="总金额"-->
<!--             show-overflow-tooltip>-->
<!--         </el-table-column>-->
<!--       </el-table>-->
<!--       <div style="margin-top: 20px">-->
<!--&lt;!&ndash;         <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>&ndash;&gt;-->
<!--         <el-button @click="toggleSelection()">取消选择</el-button>-->
<!--         <el-button @click="delfromshoppingcart()">删除</el-button>-->
<!--         <el-button @click="addallmoney()">计算合计</el-button>-->
<!--         {{this.allmoney}}-->
<!--         <el-button @click="goOrder()">订购</el-button>-->

<!--       </div>-->

    </div>

</template>
<script>


export default {

    name: 'ShoppingCart',
  components: {},
    data () {

        return {
          username:'',
          operateForm: {},
          allmoney:0,



          tableData: [],
          multipleSelection: [],



        }
    },
  methods:{
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

    },
    delfromshoppingcart(){
      this.multipleSelection.forEach(item => {
        const name = item.name
        window.alert(name+"被删除。")
        // if (this.multipleSelection.indexOf(name) == -1) {
        //   this.multipleSelection.push(name)
        // }
      })

    },
    addallmoney(){
      this.allmoney=0
      this.multipleSelection.forEach(item => {
        this.allmoney += item.totalmoney

      })

    },
    goOrder() {
    //   let pathInfo = this.$router.resolve({
    //     path:'/InputOrderInfo',
    //   query:{
    //     username: this.username,
    //     goods:this.multipleSelection
    //   }
    // })
    //   window.open(pathInfo.href, '_blank');
      this.allmoney=0
      this.multipleSelection.forEach(item => {
        this.allmoney += item.totalmoney

      })
      console.log(this.multipleSelection)
      this.$router.push({
        path: '/inputorderinfo',
        query: {
          username: this.username,
          goods:this.multipleSelection,
          operateForm:this.operateForm,
          allmoney:this.allmoney,
          tableData:this.tableData,
          pagefrom:'shoppingcart'
        }
      })
    }
  },
    mounted() {
      this.username=this.$route.query.username
      this.operateForm=this.$route.query.operateForm
      if(this.$route.query.tableData){
        this.tableData = this.$route.query.tableData
      }else{
        this.tableData.push({
          name:this.$route.query.name,
          price: this.$route.query.price,
          style:this.$route.query.style,
          num:this.$route.query.quantity,
          totalmoney:  this.$route.query.price*this.$route.query.quantity
        })
      }



    },
  created() {
     //this.getCartList();后端传来的购物车数据
  }
}
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
