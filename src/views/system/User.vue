<template>
  <div class="">
    <el-form :module="searchForm" ref="searchForm" inline>
      <el-form-item label="姓名：">
        <el-input v-model="searchForm.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="searchForm.phone" placeholder="请输入手机号"></el-input>
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
            prop="loginName"
            align="center"
            label="账号">
          </el-table-column>
          <el-table-column
            align="center"
            label="角色">
            <template slot-scope="scope">
              <el-tag type="success" size="small">{{scope.row.roleName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            align="center"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            align="center"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="email"
            align="center"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="createBy"
            align="center"
            label="添加人">
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
      :title="`${formData.id ? '编辑' : '添加'}用户`"
      width="400px"
      :visible.sync="dialogVisible">
      <el-form :inline="false" label-width="100px" :model="formData" :rules="rules" ref="ruleForm">
        <el-form-item label="账号：" prop="loginName">
          <el-input :disabled="!!formData.id" v-model="formData.loginName" placeholder="请输入账号"></el-input>
          <div class="tips">提示：建议使用邮箱，一旦创建不可修改。</div>
        </el-form-item>
        <el-form-item label="姓名：" prop="userName">
          <el-input v-model="formData.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="formData.phone" placeholder="电话号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="formData.email" placeholder="请输入正确的邮箱格式"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="roleName">
          <el-select v-model="formData.roleName" placeholder="角色">
            <el-option v-for="item in roleList" :key="item.roleId" :value="item.roleId" :label="item.roleName"></el-option>
          </el-select>
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
  name: 'user',
  data () {
    let validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!/^[1](([3][0-9])|([4][5-9])|([5][012356789])|([6][56])|([7][0-8])|([8][0-9])|([9][189]))[0-9]{8}$/.test(value)) {
        callback(new Error('请输入正确的手机号格式'))
      } else {
        callback()
      }
    }
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
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        loginName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
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
      this.$http.post('/system/user/list', this.searchForm).then(res => {
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
        this.$http.post('/system/user/remove', {id: id}).then((res) => {
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
          let URL = this.formData.id ? '/system/user/edit' : '/system/user/create';
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