import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

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
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
              <CardTitle className="text-2xl text-white">Authentication Error</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                <p className="text-sm text-red-400">
                  {params?.error ? `Error: ${params.error}` : "An unspecified error occurred during authentication."}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/auth/login">
                  <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">Try Again</Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 bg-slate-800/50 text-white hover:bg-slate-800 hover:text-white"
                  >
                    Go Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
