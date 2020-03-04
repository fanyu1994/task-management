const Koa = require("koa");
const router = require("koa-router")();
const koaBodyparser = require("koa-bodyparser");
const cors = require("koa-cors");
const serve = require("koa-static");
const path = require("path");
const models = require("./db/models");
const jwt = require("koa-jwt")

const app = new Koa();

app.use(koaBodyparser());
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', "PUT"],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(async (ctx, next) => {
  console.log("路径："+ctx.request.path)
  await next()
})

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
router.post("/create", async (ctx, next) => {
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
router.put("/update", async (ctx, next) => {
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
router.delete("/remove/:id/:status/:b", async (ctx, next) => {
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

//登录
router.post("/", async (ctx, next) => {
  if (ctx.request.path != "/") {
    await next()
  } else {
    let {username, password} = ctx.request.body;
    if (username == "" || password == "") {
      ctx.body = {
        success: 1,
        info: "账号密码不能为空！"
      }
      return
    } 
    if (username == "fanyu" && password == 123) {
      ctx.body = {
        success: 2,
        info: username
      }
    } else {
      ctx.body = {
        success: 3,
        info: "账户密码错误！"
      }
    }
  }
  
});


app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(path.resolve("dist")));
app.listen("3000", () => {
  console.log("服务启动成功！")
})
