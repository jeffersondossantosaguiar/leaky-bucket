import Koa from "koa"

const app = new Koa()

app.use(async (ctx) => {
  ctx.body = "API Koa.js com TypeScript está funcionando! 2"
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
