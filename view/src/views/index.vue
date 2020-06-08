<template>
  <div class="index">
    <el-card shadow="never" class="index_body">
      <div class="index_body_in">
        <div class="form_box">
          <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <!-- <el-button type="danger" @click="delBatch()">批量删除</el-button> -->
        </div>
        <el-table
          v-loading="dataListLoading"
          :data="dataList"
          border
          @selection-change="dataListSelectionChangeHandle"
          style="width: 100%;"
        >
          <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
          <el-table-column prop="userName" label="姓名" header-align="center" align="center"></el-table-column>
          <el-table-column prop="nickName" label="昵称" header-align="center" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" header-align="center" align="center" :formatter="function(row){return !row.sex?'男':'女'}"></el-table-column>
          <el-table-column prop="phone" label="电话" header-align="center" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" header-align="center" align="center"></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            header-align="center"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="delOne(scope.row.userId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="limit"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="pageSizeChangeHandle"
          @current-change="pageCurrentChangeHandle"
        ></el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getList"></add-or-update>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList, delOne, delBatch } from '@/api/allApi.js'
import AddOrUpdate from './add-or-update'
export default {
  data () {
    return {
      getDataListURL: '', // 数据列表接口，API地址
      getDataListIsPage: false, // 数据列表接口，是否需要分页？
      deleteURL: '', // 删除接口，API地址
      deleteIsBatch: false, // 删除接口，是否需要批量？
      deleteIsBatchKey: 'id', // 删除接口，批量状态下由那个key进行标记操作？比如：pid，uid...
      dataList: [
        {
          'userId': 1,
          'userName': '张三',
          'nickName': 'demo1',
          'phone': '189808980898',
          'sex': 0,
          'createTime': '2020-05-11 09:03:06'
        }
      ], // 数据列表
      page: 1, // 当前页码
      limit: 10, // 每页数
      total: 0, // 总条数
      dataListLoading: false, // 数据列表，loading状态
      dataListSelections: [], // 数据列表，多选项
      addOrUpdateVisible: false // 新增／更新，弹窗visible状态
    }
  },
  components: {
    AddOrUpdate
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取数据列表
    getList () {
      let _this = this
      this.dataListLoading = true
      getList({
        page: this.page,
        limit: this.limit
      }).then(function (res) {
        let data = res.data
        _this.dataListLoading = false
        if (res.code === 0) {
          _this.dataList = []
          _this.total = 0
          return _this.$message.error(res.msg)
        }
        _this.dataList = data
      }).catch(() => {
        _this.dataListLoading = false
      })
    },
    // 多选
    dataListSelectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 分页, 每页条数
    pageSizeChangeHandle (val) {
      this.page = 1
      this.limit = val
      this.getList()
    },
    // 分页, 当前页
    pageCurrentChangeHandle (val) {
      this.page = val
      this.getList()
    },
    // 新增 / 修改
    addOrUpdateHandle (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row)
      })
    },
    // 删除
    delOne (id) {
      if (!id) {
        return this.$message({
          message: '请选择删除项',
          type: 'warning',
          duration: 500
        })
      }
      let _this = this
      this.$confirm('是否进行删除操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOne({
          userId: id
        }).then((res) => {
          if (res.code === 0) {
            return _this.$message.error(res.msg)
          }
          _this.$message({
            message: res.msg,
            type: 'success',
            duration: 500,
            onClose: () => {
              _this.getList()
            }
          })
        }).catch(() => { })
      }).catch(() => { })
    },
    delBatch () {
      let a = 1
      if (a > 0) {
        return
      }
      if (this.dataListSelections.length === 0) {
        return this.$message({
          message: '请选择删除项',
          type: 'warning',
          duration: 500
        })
      }
      let _this = this
      this.$confirm('是否进行删除操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBatch({
          idArr: this.dataListSelections
        }).then((res) => {
          if (res.code !== 0) {
            return _this.$message.error(res.msg)
          }
          _this.$message({
            message: '操作成功',
            type: 'success',
            duration: 500,
            onClose: () => {
              _this.getList()
            }
          })
        }).catch(() => { })
      }).catch(() => { })
    }
  }
}
</script>

<style lang="less">
.index {
  padding: 20px;
  .form_box {
    padding: 0 0 20px;
  }
  .el-pagination {
    padding: 20px 5px 5px;
  }
}
</style>
