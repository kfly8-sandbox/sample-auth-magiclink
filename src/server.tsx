import { Hono } from 'hono'
import { renderer } from './renderer'

import * as Auth from '@/pages/Auth'
import $Sandbox from '@/islands/Sandbox'
import { Link } from '@/components/ui/link'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <>
      <h1>Welcome to the sample project</h1>
      <ul>
        <li><Link href="/signup" className="text-primary underline">signup</Link></li>
        <li><Link href="/signin" className="text-primary underline">signin</Link></li>
      </ul>
    </>
  )
})

app.get('/signup', (c) => {
  return c.render(<Auth.SignUpPage />)
})

app.get('/signin', (c) => {
  return c.render(<Auth.SignInPage />)
})

app.get('/verify-code', (c) => {
  return c.render(<Auth.VerifyCodePage />)
})

app.post('/api/auth/signup', async (c) => {
  const { email } = await c.req.json<{ email: string }>()

  // TODO: メール送信とトークン生成の実装
  // 1. マジックリンクトークンの生成
  // 2. トークンをDBに保存
  // 3. メール送信処理

  return c.json({ success: true })
})

app.post('/api/auth/signin', async (c) => {
  const { email } = await c.req.json<{ email: string }>()

  return c.json({ success: true })
})

app.post('/api/auth/verify-code', async (c) => {
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
