import { $island } from '@/islands/utils'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useActionState } from "react"
import { Link } from "@/components/ui/link"
import { Loader2 } from "lucide-react"
import { signup, signin, verifyCode } from "@/actions/auth"
import { toast } from "sonner"

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("")
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
  const [verified, formAction, isPending] = useActionState(
    async () => {

      const res = await signup({ email, termsAccepted })
      if (res.success === false) {
        toast.error(res.error.message)
        return false
      }

      return true;
  }, false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up to your account</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          We'll send you a verification code to your email to sign in
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              disabled={isPending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                name="terms"
                value="true"
                required
                disabled={isPending}
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              />
              <Label
                htmlFor="terms"
                className="text-xs leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <div className="inline-flex flex-wrap gap-x-1 gap-y-0.5 leading-relaxed">
                  <span>I agree to the</span>
                  <Link href="/terms" className="text-primary underline">
                    Terms of Service
                  </Link>
                  <span>and</span>
                  <Link href="/privacy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                </div>
              </Label>
            </div>
          </div>

        </CardContent>
        <CardFooter className="pt-4">
          <Button type="submit" className="w-full" disabled={isPending || !(email && termsAccepted)}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Verification Code"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

const SignInForm = () => {
  const [email, setEmail] = useState<string>("")
  const [verified, formAction, isPending] = useActionState(
    async () => {

      const res = await signin({ email })
      if (res.success === false) {
        toast.error(res.error.message)
        return false
      }

      return true;
  }, false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          We'll send you a verification code to your email to sign in
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              disabled={isPending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

        </CardContent>
        <CardFooter className="pt-4">
          <Button type="submit" className="w-full" disabled={isPending || !(email)}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Verification Code"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

const VerifyCodeForm = () => {
  const [verificationCode, setVerificationCode] = useState<string>("")
  const [verified, formAction, isPending] = useActionState(
    async (prevState: boolean, formData: FormData) => {

      if (prevState) return prevState

      const email = formData.get("email") as string
      const code  = formData.get("verificationCode") as string

      const res = await verifyCode({ email, code })
      if (res.success === false) {
        toast.error(res.error.message)
        return false
      }

      return true;
  }, false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              name="verificationCode"
              type="text"
              placeholder="123456"
              maxLength={6}
              pattern="[0-9]{6}"
              inputMode="numeric"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
              className="text-center text-lg tracking-widest"
            />
          </div>

        </CardContent>
        <CardFooter className="pt-4">
          <Button type="submit" className="w-full" disabled={isPending || verificationCode.length !== 6}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

const islandOptions = { basename: 'AuthForm' }
const $SignUpForm = $island(SignUpForm, islandOptions)
const $SignInForm = $island(SignInForm, islandOptions )
const $VerifyCodeForm = $island(VerifyCodeForm, islandOptions)

export {
  SignUpForm, $SignUpForm,
  SignInForm, $SignInForm,
  VerifyCodeForm, $VerifyCodeForm
}

