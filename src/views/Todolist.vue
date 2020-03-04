<template>
  <el-row class="todoList">
    <el-row>
      <el-col>
        <div class="tl_top">
          任务汇总表
        </div>
        <span class="tl_top_two" @click="showData = !showData">
          任务列表页面
        </span>
        <span class="tl_top_three">
          <div ></div>
          <div ></div>
          <div @click.self="showRadio = !showRadio">{{currentRadio}}</div>
          <el-collapse-transition>
            <el-radio-group 
              v-if="showRadio"
              v-model="radio"
              class="radio"
              >
              <el-radio :label="1">全部</el-radio>
              <el-radio :label="2">代办</el-radio>
              <el-radio :label="3">完成</el-radio>
              <el-radio :label="4">删除</el-radio>
              <button 
                class="success"
                @click.self="success">确定</button>
              <button 
                class="res"
                @click.self="reset">重置</button>
            </el-radio-group>
          </el-collapse-transition>
        </span>
      </el-col>
    </el-row>
    <transition name="el-zoom-in-center">
      <el-row v-if="showData">
        <el-row type="flex" justify="space-between">
        <el-col :span="9">
          <div class="tl_top_xian"></div>
        </el-col>
        <el-col :span="4">
          <div class="tl_top_middle">任务列表</div>
        </el-col>
        <el-col :span="9">
          <div class="tl_top_xian"></div>
        </el-col>
        </el-row>
      <el-button type="primary" @click="add = !add">新增</el-button>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        text-align="center"
       >
        <el-table-column
          prop="id"
          label="ID"
          min-width="10%"
          align="center">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="name"
          label="标题"
          min-width="20%"
          align="center">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="content"
          label="内容"
          min-width="50%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deadline"
          label="截止日期"
          min-width="30%"
          :formatter="deadlineFormatter"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="12%"
          :formatter="statusFormatter"
          align="center">
        </el-table-column>
        <el-table-column 
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updataItem(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-if="!scope.row.b"
              size="mini"
              type="success"
              @click="finishItem(scope.$index, scope.row)">
              <div v-show="scope.row.a" >完成</div>
              <div v-show="!scope.row.a">代办</div>
            </el-button>
            <el-button
              v-if="!scope.row.b"
              size="mini"
              type="danger"
              @click="deleteItem(scope.$index, scope.row)">删除</el-button>    
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"></el-pagination>
    </el-row>
    </transition>
    <el-drawer
      title="我是标题"
      :visible.sync="add"
      :with-header="false"
      size="45%">
      <el-row class="add_top">
        添加任务
      </el-row>
      <el-row class="add_middle_one">
        <i class="el-icon-star-on" style="color:red"></i>
        任务名称：
      </el-row>
      <el-input
        v-model="value2"
        @input="inputChange"
        @blur="changeValue"
        @keyup.enter.native="changeValue"
        ref="renwu"
        placeholder="请输入任务名称"
        class="add_middle_two"></el-input>
      <el-row class="add_middle_three">
          <div v-show="isContent">
            请输入任务名称
          </div>
      </el-row>
      <el-row class="add_middle_one">
        <i class="el-icon-star-on" style="color:red"></i>
        任务截止日期：
      </el-row>
      <el-date-picker
        class="add_middle_two"
        placeholder="选择截止日期"
        :picker-options="date"
        v-model="value1"
        value-format="yyyy-MM-dd"
        type="date"></el-date-picker>
      <el-row
        class="add_middle_one">任务内容</el-row> 
      <el-input
        class="add_middle_two"
        type="textarea"
        :rows="2"
        placeholder="请输入任务内容"
        v-model="textarea"></el-input>
      <el-row
        class="add_middle_four"
        type="flex"
        justify="space-around">
        <el-button type="primary" @click="hold">保存</el-button>
        <el-button @click="res">重置</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-row>
    </el-drawer>
  </el-row>
</template>
<script>

export default {
  data() {
    return {
      isFinish:true,
      //等下要改成 false
      showData:true,
      add:false,
      updata:false,
      updataObj1:{},
      updataObj2:{},
      value1:"",
      value2:"",
      textarea:"",
      isContent:false,
      date:{
        disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
      },
      tableData:[],
      total:0,
      currentPage1:1,
      isRemove:false,
      showRadio:false,
      radio:1,
    }
  },
  created() {},
  mounted() {
    this.allList()
  },
  components: {},
  computed:{
    //筛选状态
    currentRadio() {
      switch (this.radio) {
        case 1:
          return "全部"
          break;
        case 2:
          return "代办"
          break;
        case 3:
          return "完成"
          break;
        case 4:
          return "删除"
          break;      
        default:
          break;
      }
    }
  },
  methods: {
    //条件筛选
    success() {
      this.showRadio = false
      this.add = false
      switch (this.radio) {
        case 1:
          this.allList()
          break;
        case 2:
          this.$http.get("http://localhost:3000/list/1/1").then(res => {
            this.tableData = res.data.rows
            .slice((this.currentPage1-1)*10, 10*this.currentPage1)
            this.total = res.data.rows.length
          })
          break; 
        case 3:
          this.$http.get("http://localhost:3000/list/2/1").then(res => {
            this.tableData = res.data.rows
            .slice((this.currentPage1-1)*10, 10*this.currentPage1)
            this.total = res.data.rows.length
          })
          break;
        case 4:
          this.$http.get("http://localhost:3000/list/3/1").then(res => {
            this.tableData = res.data.rows
            .slice((this.currentPage1-1)*10, 10*this.currentPage1)
            this.total = res.data.rows.length
          })
          break;    
        default:
          break;
      }
    },
    //重置条件
    reset() {
      this.showRadio = false
      this.radio = 1
      this.allList()
    },
    //编辑后
    updataItem(index, row) {
      //删除之后的编辑状态
      if (row.b==1) {
        this.isRemove = true
        this.updataObj2 = {
          id:row.id,
          status: 1,
          a:1,
          b:0
        }
      }
      //正常的编辑状态
      this.add = !this.add;
      this.updata = true
      this.value2 = row.name;
      this.value1 = row.deadline;
      this.textarea = row.content;
      this.updataObj1 = {
        id:row.id,
        status: row.status,
        a:row.a
      }
    },
    //完成代办后
    finishItem(index, row) {
      if (row.a == 1) {
        this.$http.put("http://localhost:3000/update",{
          id:row.id,
          a:0,
          name:row.name,
          deadline:row.deadline,
          content:row.content,
          status:2
        }).then(() => {
            this.success()
          }
        ).catch(err => {
          console.log("err")
        })
      } else {
         this.$http.put("http://localhost:3000/update",{
          id:row.id,
          a:1,
          name:row.name,
          deadline:row.deadline,
          content:row.content,
          status:1
        }).then(() => {
            this.success()
          }
        ).catch(err => {
          console.log("err")
        })
      }
    },
    //删除后
    deleteItem(index, row) {
      this.$http.delete("http://localhost:3000/remove/"+row.id+"/"+3+"/"+1)
      .then(() => {
            this.success()
          }
      )
      .catch(err => 
      console.log(err))
    },
    // 日期格式的处理
    deadlineFormatter(row, column) {
      let date = row.deadline;
      return date.substring(0, 10)
    } ,
    //状态的处理
    statusFormatter(row, column) {
      let status = row.status;
      switch (status) {
        case 1:
          return "代办"
          break;
        case 2:
          return "完成"
          break;
        case 3:
          return "删除"
          break;
        default:
          break;
      }
    },
    //页面前进和后退
    handleCurrentChange() {
      this.$http.get("http://localhost:3000/list/-1/1",).then(res => {
        this.tableData = res.data.rows.slice(( this.currentPage1 - 1 ) * 10, this.currentPage1 * 10)
      }).catch(err => {
        console.log("前进后退出错了")
      })
      
    },
    //首页数据
    allList() {
      this.$http.get("http://localhost:3000/list/-1/1",).then(res => {
      this.tableData = res.data.rows.slice((this.currentPage1-1)*10, 10*this.currentPage1)
      this.total = res.data.rows.length
      }).catch(err => {
        console.log(err)
      })
    },
    //输入框空值警告
    inputChange() {
      if (this.value2 !== "") {
        this.isContent = false
        this.$refs.renwu.$refs.input.style.boxShadow = "none"
      }
    },
    //输入框样式改变
    changeValue() {
      if (this.value2 == "") {
        this.$refs.renwu.$refs.input.style.boxShadow = "0 0 0 2px red"
        this.isContent = true
      } else {
        this.isContent = false
        this.$refs.renwu.$refs.input.style.boxShadow = "none"
      }
    },
    //增添数据
    hold() {
      if (!(this.value2 && this.textarea && this.value1)) {
        this.$message({
          type: "warning",
          message: "警告！请填写完整的信息！"
        })
        return
      }
      //新增选项
      if (!this.updata) {
        let obj = {
          name: this.value2,
          content: this.textarea,
          deadline: this.value1,
          a:1
        }
        this.res()
        this.$http.post("http://localhost:3000/create", obj)
        .then(() => {
            this.success()
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        this.updata = false
        //是否是删除之后的编辑保存
        //1、不是  2、是
        if (!this.isRemove) {
          let obj = {
            name: this.value2,
            content: this.textarea,
            deadline: this.value1,
          };
          this.res()
          this.$http.put("http://localhost:3000/update", 
            Object.assign(obj, this.updataObj1))
          .then(() => {
            this.success()
          })
          .catch(err => {
            console.log(err)
          })
        } else {
          let obj = {
            name: this.value2,
            content: this.textarea,
            deadline: this.value1
          };
          this.res()
          this.$http.put("http://localhost:3000/update", 
            Object.assign(obj, this.updataObj2))
          .then(() => {
            this.success()
          })
          .catch(err => {
            console.log(err)
          })
        }
      }
    },
    //重置输入内容
    res() {
      this.textarea = "",
      this.value2 = "",
      this.value1 = ""
    },
    //关闭新增页面
    cancel() {
      this.add = false
    }
  }
}
</script>
<style scoped lang="stylus">
@import "./list.styl"
  .newSty
    height 90px
</style>