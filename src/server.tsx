import { Hono } from 'hono'
import { renderer } from './renderer'

import Auth from '@/pages/Auth'
import $Sandbox from '@/islands/Sandbox'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.redirect('/auth')
})

app.get('/auth', (c) => {
  return c.render(<Auth />)
})

// API エンドポイント (実装予定)
app.post('/api/auth/magic-link', async (c) => {
  const { email } = await c.req.json<{ email: string }>()

  // TODO: メール送信とトークン生成の実装
  // 1. マジックリンクトークンの生成
  // 2. トークンをDBに保存
  // 3. メール送信処理

  return c.json({ success: true })
})

app.post('/api/auth/verify', async (c) => {
  const { email, code } = await c.req.json<{ email: string, code: string }>()

  // TODO: 認証コードの検証の実装
  // 1. トークンの検証
  // 2. ユーザー情報の取得または新規作成
  // 3. JWTの発行

  return c.json({ success: true, token: "dummy_token" })
})

app.get('/sandbox', (c) => {

  return c.render(
    <>
      <h1>Sandbox</h1>
      <$Sandbox />
    </>
  )
})

export default app
