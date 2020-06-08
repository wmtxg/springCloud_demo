<template>
  <el-dialog
    :visible.sync="visible"
    :title="isAdd?'新增':'修改'"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :model="dataForm"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmitHandle()"
      label-width="100px"
    >
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="dataForm.userName" placeholder="姓名" :disabled="!isAdd"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="dataForm.nickName" placeholder="年龄"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="dataForm.sex" :label="0">男</el-radio>
        <el-radio v-model="dataForm.sex" :label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="电话" :disabled="!isAdd"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { addUser, updateUser, getOne } from '@/api/allApi.js'
export default {
  data () {
    return {
      isAdd: true,
      visible: false,
      dataForm: {
        userId: '',
        userName: '',
        nickName: '',
        sex: '',
        phone: ''
      }

    }
  },
  methods: {
    init (row) {
      this.visible = true
      if (row) {
        this.isAdd = false
        this.dataForm.userId = row.userId
        this.getOne()
      } else {
        this.isAdd = true
      }
    },
    getOne () {
      let _this = this
      getOne({
        userId: this.dataForm.userId
      }).then(function (res) {
        if (res.code === 0) {
          return this.$message.error(res.msg)
        }
        _this.dataForm = {...res.data}
        console.log(_this.dataForm)
      }).catch(() => {
      })
    },
    dataFormSubmitHandle () {
      let _this = this
      let fun = this.isAdd ? addUser : updateUser
      console.log(this.dataForm)
      fun(this.dataForm).then((res) => {
        if (res.code === 0) {
          return _this.$message.error(res.msg)
        }
        _this.$message({
          message: res.msg,
          type: 'success',
          duration: 500,
          onClose: () => {
            _this.visible = false
            _this.$emit('refreshDataList')
          }
        })
      }).catch(() => { })
    }

  }
}
</script>
