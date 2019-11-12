<template>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page.pageObj.pageNo"
    :page-sizes="[10, 20, 50]"
    :page-size="page.pageObj.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="page.total">
  </el-pagination>
</template>

<script>
export default {
  name: 'pagination',
  data () {
    return {
      
    };
  },
  props: ['page'],
  methods: {
    handleSizeChange(val) {
      this.page.pageObj.pageSize = val;
      this.page.pageObj.pageNo = 1;
      this.page.getList();
    },
    handleCurrentChange(val) {
      this.page.pageObj.pageNo = val;
      this.page.getList();
    }
  }
}
</script>

<style scoped>
.el-pagination {
    margin: 20px 0;
}
</style>