<template>
  <div class="manage">
    <el-dialog title="修改仓库信息" :visible.sync="isShow1">
      <el-form :model="modifyForm" label-width="100px" style="height: 400px">
        <el-form-item label="库房ID">
          <el-input v-model="modifyForm.id" ></el-input>
        </el-form-item>
        <el-form-item label="库房名称">
          <el-input v-model="modifyForm.storeroomName"></el-input>
        </el-form-item>
        <el-form-item label="库房地址">
          <el-input v-model="modifyForm.address"></el-input>
        </el-form-item>
        <el-form-item label="库房等级">
          <el-input v-model="modifyForm.storeroomLevel"></el-input>
        </el-form-item>
        <el-form-item label="库管员">
          <el-input v-model="modifyForm.administrator"></el-input>
        </el-form-item>
        <el-form-item label="库存最值">
          <div>
            <el-input v-model="modifyForm.minimum" maxlength="200" placeholder="最小值" style="float:left;width:100px"></el-input>
            <el-input v-model="modifyForm.maximum" maxlength="200" placeholder="最大值" style="margin-left: 50px;width:100px"></el-input>
          </div>
          </el-form-item>
          <el-button @click="submit1(modifyForm)" style="margin-left: 150px">提交</el-button>
          <el-button @click="isShow1=false" style="margin-left: 250px">取消</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="添加仓库信息" :visible.sync="isShow2">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" style="height: 400px">
        <el-form-item label="库房ID" prop="sid">
          <el-input v-model="addForm.id" ></el-input>
        </el-form-item>
        <el-form-item label="库房名称" prop="sname">
          <el-input v-model="addForm.storeroomName"></el-input>
        </el-form-item>
        <el-form-item label="库房地址">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="库房等级">
          <el-input v-model="addForm.storeroomLevel"></el-input>
        </el-form-item>
        <el-form-item label="库管员">
          <el-input v-model="addForm.administrator"></el-input>
        </el-form-item>
        <el-form-item label="库存最值">
          <div>
            <el-input v-model="addForm.minimum" maxlength="200" placeholder="最小值" style="float:left;width:100px"></el-input>
            <el-input v-model="addForm.maximum" maxlength="200" placeholder="最大值" style="margin-left: 50px;width:100px"></el-input>
          </div>
        </el-form-item>
        <el-button @click="submit2(addForm)" style="margin-left: 150px">添加</el-button>
        <el-button @click="isShow2=false" style="margin-left: 250px">取消</el-button>
      </el-form>
    </el-dialog>

    <div class="manage-header" style="margin-bottom: 20px">
      <div>
        <el-input
        placeholder="请输入库房名称"
        v-model="name"
        clearable
        style="width: 200px">
        </el-input>
        <el-button type="primary" @click="getByName(name)" style="margin-left: 20px">查询</el-button>
        <el-button type="primary" @click="add" style="float:right">库房添加</el-button>
      </div>
    </div>


    <el-table :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)" height="80%" stripe ref="multipleTable">
      <el-table-column show-overflow-tooltip
                       v-for="item in tableLabel"
                       :key="item.prop"
                       :label="item.label">
        <template slot-scope="scope">
          <span>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button @click="modify(scope.row)">修改</el-button>
          <el-button @click="idelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="pageNum"
        :page-sizes="[5,10,15,20]"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
</div>
</template>

<script>
import axios from "axios";
export default {
  name:'newWareHouse',
  data(){
    return{
      isShow1:false,
      isShow2:false,
      rules:{
        sid: [
          { required: true, message: '请输入仓库ID', trigger: 'blur' }
            ],
        sname: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' }
        ]
      },
      name:'',
      tableData:[],
      tableLabel:[
        {
          prop:"storeroomName",
          label:"库房名称"
        },
        {
          prop:"address",
          label:"库房地址"
        },
        {
          prop:"administrator",
          label:"库房管理员"
        },
        {
          prop:"storeroomLevel",
          label:"库房等级"
        },
      ],
      modifyForm:{
      },
      addForm:{
      },
      total:0,     //一共多少条
      pageNum:1,   //当前页
      pageSize:10   //每页多少条
    }
  },
  methods: {
    handleCurrentChange(val){
      this.pageNum=val
    },
    handleSizeChange(val){
      this.pageSize=val
      //this.getAllList()
      console.log(`每页${val}条`)
    },
    getAllList() {
      axios({
        method: 'get',
        url: '/center/branchStoreroom/get_all',
        data: {}
      }).then((res) => {
        console.log(res.data.data)
        this.tableData = res.data.data
        this.total=this.tableData.length
      })
    },
    getByName(name) {  //名字查找
      axios({
        method: 'get',
        url: '/center/branchStoreroom/get_by_infos?storeroomName=' + name,
        data: {}
      }).then((res) => {
        console.log(res.data.data)
        this.tableData = res.data.data
        this.total=this.tableData.length
      })
    },
    modify(row) {   //修改
      this.modifyForm = row
      this.isShow1 = true
      console.log(this.modifyForm)
    },
    submit1(form) {
      console.log(form)
      axios({
        method: 'put',
        url: '/center/branchStoreroom/',
        data: {
          id:form.id,
          address:form.address,
          administrator:form.administrator,
          maximum:form.maximum,
          minimum:form.minimum,
          storeroomLevel:form.storeroomLevel,
          storeroomName:form.storeroomName
        }
      }).then(function (res){
        console.log(res)
        this.isShow1=false
        this.created()
      })
    },
    add(){    //添加
      this.isShow2=true
    },
    submit2(){
      console.log(this.addForm)
      axios({
        method: 'post',
        url: '/center/branchStoreroom/',
        data: {
          id:this.addForm.id,
          address:this.addForm.address,
          administrator:this.addForm.administrator,
          maximum:this.addForm.maximum,
          minimum:this.addForm.minimum,
          storeroomLevel:this.addForm.storeroomLevel,
          storeroomName:this.addForm.storeroomName
        }
      }).then(function (res){
        console.log(res)
        this.created()
      })
    },
    idelete(row) {
      this.modifyForm = row
      this.$confirm('确认删除'+row.storeroomName+'？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then((action) => {
        if (action == "confirm") {
          console.log(row.id)
          axios({
            method:'delete',
            url:'/center/branchStoreroom/?branchStoreroomId='+row.id,
          }).then(function (res){
            console.log(res)
            this.isShow2=false
            this.created()
          });
        }
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消删除'
        })
      })
    },

    getList(name = ''){
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      this.config.loading = false
      this.config.total =4
    }
  },
  created() {
    this.getAllList()
  }
}

</script>

<style scoped lang="less">

</style>