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
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <div class="opt-box">
      <el-button type="primary" plain>添加</el-button>
    </div>
    <el-table 
      :data="tableList"
      header-cell-class-name="headerCellName"
      stripe>
        <el-table-column
          type="index"
          align="center"
          label="序号">
        </el-table-column>
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
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      searchForm: {},
      tableList: [],
    };
  },
}
</script>

<style scoped>
  
</style>