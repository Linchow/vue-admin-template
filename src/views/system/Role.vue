<template>
  <div class="">
    <el-form :module="searchForm" ref="searchForm" inline>
      <el-form-item label="角色名称：">
        <el-input v-model="searchForm.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="opt-box">
      <el-button type="primary" @click="addEdit({})" plain>添加</el-button>
    </div>
    <div v-loading="loading">
      <el-table 
        :data="tableList.list"
        header-cell-class-name="headerCellName"
        stripe>
          <el-table-column
            prop="roleName"
            align="center"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="desc"
            align="center"
            label="角色描述">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="addEdit(scope.row)" type="primary" icon="el-icon-edit" plain circle></el-button>
              <el-button @click="remove(scope.row.id)" type="danger" icon="el-icon-delete" circle plain></el-button>
            </template>
          </el-table-column>
      </el-table>
      <pagination :page="{getList, pageObj, total: tableList.total}"></pagination>
    </div>
    <el-dialog
      :title="`${formData.id ? '编辑' : '添加'}角色`"
      width="400px"
      :visible.sync="dialogVisible">
      <el-form :inline="false" label-width="100px" :model="formData" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input v-model="formData.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：" prop="desc">
          <el-input v-model="formData.desc" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'role',
  data () {
    return {
      searchForm: {},
      pageObj: {
        pageNo: 1,
        pageSize: 10
      },
      tableList: {},
      dialogVisible: false,
      loading: false,
      formData: {},
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
      },
      roleList: []
    };
  },
  components: {
    Pagination
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      this.pageObj.pageNo = 1;
      this.getList();
    },
    reset() {
      this.searchForm = {}
    },
    getList() {
      this.searchForm = Object.assign(this.searchForm, this.pageObj);
      this.loading = true;
      this.$http.post('/system/role/list', this.searchForm).then(res => {
        if(res.code === 1000) {
          this.tableList = res.data;
        }
      }).finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      })
    },
    addEdit(row) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields();
        this.formData = {...row};
      })
    },
    remove(id) {
      this.$confirm('确定删除该条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/system/role/remove', {id: id}).then((res) => {
          if (res.code === 1000) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
          }
          this.getList();
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let URL = this.formData.id ? '/system/role/edit' : '/system/role/create';
          this.$http.post(URL, this.formData).then((res) => {
            if (res.code === 1000) {
              this.dialogVisible = false;
              this.getList();
            }
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style scoped>
  
</style>