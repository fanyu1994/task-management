
const  koaRouter = require('koa-router')
const models = require("../models");
const jwt = require("jsonwebtoken")
const router = koaRouter()


//查找
router.get("/list/:status/:page", async (ctx, next) => {
  let { status, page } = ctx.params;
  // let limit = 10;
  // let offset = (page - 1) * limit;
   //状态为-1时，需要查询全部数据
  let where = {};
  if (status != -1) {
    where.status = status;//1代办 2完成 3删除
  }
  let list = await models.User.findAndCountAll({
    where,
    // offset,
    // limit
  });
  ctx.body = list
})

//增添
router.post("/list/create", async (ctx, next) => {
  let {name, deadline, content, a} = ctx.request.body;
  let User = await models.User.create({
    name,
    deadline,
    content,
    a
  });
  /**
   * 后台分页
   *  let limit = 10;
   *  let offset = 0;
   *  let where = {};
   */
  let list = await models.User.findAndCountAll({
    // where,
    // offset,
    // limit
  });
  ctx.body = list
})

//修改
router.put("/list/update", async (ctx, next) => {
  let {name, deadline, content, id, a, status, b} = ctx.request.body;
  let user = await models.User.findOne({
    where:{
      id
    }
  });
  if (user) {
    user = await user.update({
      name,
      deadline,
      content,
      status,
      a,
      b
    })
  };
  let list = await models.User.findAndCountAll()
  ctx.body = list
})

//删除
router.delete("/list/remove/:id/:status/:b", async (ctx, next) => {
  let { id, status, b} = ctx.params;
  let user = await models.User.findOne({
    where: {
      id
    }
  });
  if (user) {
    user = await user.update({
      status,
      b
    })
  }
  let list = await models.User.findAndCountAll()
  ctx.body = list
})

module.exports =  router