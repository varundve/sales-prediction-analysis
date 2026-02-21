"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mail, Lock } from "lucide-react"
import { UserAvatarIcon } from "@/components/ui/user-avatar-icon"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api"
      const response = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Store token in localStorage and cookie
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("user", JSON.stringify(data.data.user))
        document.cookie = `token=${data.data.token}; path=/; max-age=86400`

        router.push("/dashboard")
        router.refresh() // Force refresh to update navigation state
      } else {
        throw new Error(data.error || "Login failed")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <UserAvatarIcon className="w-24 h-24" />
            <span className="text-2xl font-bold text-white">SalesPredictAI</span>
          </div>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
              <CardDescription className="text-slate-400">
                Sign in to access your sales prediction dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-slate-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-slate-700 bg-slate-800/50 pl-10 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-slate-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-slate-700 bg-slate-800/50 pl-10 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
                <div className="mt-6 text-center text-sm text-slate-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/sign-up"
                    className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
