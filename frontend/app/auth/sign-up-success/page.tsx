import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <TrendingUp className="h-8 w-8" />
            <span className="text-2xl font-bold text-white">SalesPredictAI</span>
          </div>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>
              <CardTitle className="text-2xl text-white">Check Your Email</CardTitle>
              <CardDescription className="text-slate-400">We&apos;ve sent you a confirmation link</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-slate-800/50 p-4">
                <Mail className="h-5 w-5 text-emerald-400" />
                <p className="text-sm text-slate-300">
                  Please check your inbox and click the confirmation link to activate your account.
                </p>
              </div>
              <p className="mb-6 text-sm text-slate-500">
                Didn&apos;t receive the email? Check your spam folder or try signing up again.
              </p>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="w-full border-slate-700 bg-slate-800/50 text-white hover:bg-slate-800 hover:text-white"
                >
                  Back to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
