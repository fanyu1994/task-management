const koaRouter = require("koa-router")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const router = koaRouter();

router.post("/user/login", async (ctx, next) => {
  const {name, password} = ctx.request.body;
  let user = await models.Info.findOne({
    where:{
      name
    }
  });
  if (user) {
    if (!bcrypt.compareSync( password,user.password)) {
      ctx.body = {
        success: false,
        info:"密码错误！"
      }
    }else{
      const userToken = {
        name:user.name,
        id:user.id,
        time:new Date().getTime(),
        timeout:2*60*60*1000
      }
      const secret = "koa-vue"
      const token = jwt.sign(userToken, secret)
      ctx.body = {
        success:true,
        info:"登陆成功！",
        token:token
      }
    }
  }else{
    ctx.body = {
      success:false,
      info:"用户不存在！"
    }
  }
});

router.post("/user/reg", async (ctx, next) => {
  const {name, password} = ctx.request.body;
  let user = await models.Info.findOne({
    where:{
      name
    }
  });
  if (user) {
    ctx.body = {
      success:false,
      info:"账户已存在，无需注册！"
    }
  }else{
    await models.Info.create({
      name,
      password
    })
    ctx.body = {
      success:true,
      info:"注册成功！"
    }
  }
});

module.exports = router
