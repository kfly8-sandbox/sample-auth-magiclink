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
import { useState } from "react"
import { Link } from "@/components/ui/link"
import { AlertCircle, Loader2 } from "lucide-react"
import { useFormState } from "react-dom"
import { sendMagicLink } from "@/app/actions/auth"

export const AuthForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [state, formAction] = useFormState(sendMagicLink, {
    error: null,
    success: false,
  })

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    await formAction(formData)
    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          We'll send you a magic link to your email to sign in
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" name="terms" required />
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

          {state.error && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <p>{state.error}</p>
            </div>
          )}

          {state.success && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
              <p>Magic link sent! Please check your email.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Magic Link"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default $island(AuthForm)

