type State = {
  error: string | null
  success: boolean
}

export async function sendMagicLink(prevState: State, formData: FormData): Promise<State> {
  try {
    const email = formData.get("email") as string

    if (!email || !email.includes("@")) {
      return {
        error: "Please enter a valid email address",
        success: false,
      }
    }

    // Check if this is a first-time user
    const isFirstTime = true // This would be a database check in a real app

    if (isFirstTime) {
      const termsAccepted = formData.get("terms") === "on"

      if (!termsAccepted) {
        return {
          error: "You must accept the terms and privacy policy",
          success: false,
        }
      }
    }

    // In a real implementation, you would:
    // 1. Generate a secure token
    // 2. Store the token in your database with the email and expiration
    // 3. Send an email with a link containing the token

    console.log(`Magic link would be sent to: ${email}`)

    // Simulate successful magic link sending
    return {
      error: null,
      success: true,
    }
  } catch (error) {
    console.error("Error sending magic link:", error)
    return {
      error: "Failed to send magic link. Please try again.",
      success: false,
    }
  }
}

//export async function verifyMagicLink(token: string) {
//  try {
//    // In a real implementation, you would:
//    // 1. Verify the token from the database
//    // 2. Check if it's expired
//    // 3. Create a session for the user
//
//    // Set a session cookie
//    cookies().set("session", "authenticated", {
//      httpOnly: true,
//      secure: process.env.NODE_ENV === "production",
//      maxAge: 60 * 60 * 24 * 7, // 1 week
//      path: "/",
//    })
//
//    // Redirect to dashboard or home page
//    redirect("/dashboard")
//  } catch (error) {
//    console.error("Error verifying magic link:", error)
//    redirect("/login?error=invalid-token")
//  }
//}
