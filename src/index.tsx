import { Hono } from 'hono'
import { renderer } from './renderer'

import App from '@/blocks/App'

const app = new Hono()

app.use(renderer)

// ルートへのアクセスを認証ページにリダイレクト
app.get('/', (c) => {
  return c.render(<App/>)
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

export default app
