import type { Result, ResultError } from '@/lib/utils'

type SignUpProps = {
  email: string
  termsAccepted: boolean
}

type SignUpResult = Result<null, ResultError<"TERMS_NOT_ACCEPTED" | "FAILED_TO_SEND_EMAIL">>

export async function signup({ email, termsAccepted }: SignUpProps) : Promise<SignUpResult> {
  // 1. Generate a secure token
  // 2. Store the token in your database with the email and expiration
  // 3. Send an email with a link containing the token
  if (!termsAccepted) {
    return {
      success: false,
      error: {
        code: "TERMS_NOT_ACCEPTED",
        message: "Please accept the terms and conditions",
      }
    }
  }

  // FIXME
  return {
    success: true,
    value: null,
  }

  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email }),
  })

  if (res.status !== 200) {
    return {
      success: false,
      error: {
        code: "FAILED_TO_SEND_EMAIL",
        message: "Failed to send email. Please try again.",
      }
    }
  }

  return {
    success: true,
    value: null,
  }
}

type SignInProps = {
  email: string
}

type SignInResult = Result<null, ResultError<"FAILED_TO_SEND_EMAIL">>

export async function signin({ email }: SignInProps) : Promise<SignInResult> {
  // FIXME
  return {
    success: true,
    value: null,
  }

  const res = await fetch("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email }),
  })

  if (res.status !== 200) {
    return {
      success: false,
      error: {
        code: "FAILED_TO_SEND_EMAIL",
        message: "Failed to send email. Please try again.",
      }
    }
  }

  return {
    success: true,
    value: null,
  }
}


type VerifyCodeProps = {
  email: string
  code: string
}

type VerifyCodeResult = Result<null, ResultError<"FAILED_TO_VERIFY_CODE">>

export async function verifyCode({ email, code }: VerifyCodeProps): Promise<VerifyCodeResult> {
  // 1. Verify the code from the database for this email
  // 2. Check if it's expired
  // 3. Create a session for the user
  const res = await fetch("/api/auth/verify-code", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  })
  if (res.status !== 200) {
    return {
      success: false,
      error: {
        code: "FAILED_TO_VERIFY_CODE",
        message: "Failed to verify code. Please try again.",
      }
    }
  }
  return {
    success: true,
    value: null,
  }
}
