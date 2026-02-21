"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, Loader2, TrendingUp, IndianRupee } from "lucide-react"



interface PredictionResult {
  prediction: number
  predictionINR: number
  breakdown: {
    base: number
    tvContribution: number
    radioContribution: number
    newspaperContribution: number
  }
  inputsINR: {
    tv: number
    radio: number
    newspaper: number
    total: number
  }
  metrics: {
    roi: string
  }
}

interface PredictionFormProps {
  onPrediction: (value: number) => void
  prediction: number | null
}

const formatINR = (inrValue: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inrValue)
}

export function PredictionForm({ onPrediction, prediction }: PredictionFormProps) {
  const [tv, setTv] = useState("")
  const [radio, setRadio] = useState("")
  const [newspaper, setNewspaper] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PredictionResult | null>(null)

  const handlePredict = async () => {
    setLoading(true)
    setError(null)

    const tvValueINR = Number.parseFloat(tv) || 0
    const radioValueINR = Number.parseFloat(radio) || 0
    const newspaperValueINR = Number.parseFloat(newspaper) || 0

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api"
      const response = await fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tv: tvValueINR,
          radio: radioValueINR,
          newspaper: newspaperValueINR,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
        onPrediction(data.prediction)
      } else {
        throw new Error(data.error || "Prediction failed")
      }
    } catch (err) {
      setError("Failed to get prediction from backend. Please ensure the server is running.")
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Sales Predictor
        </CardTitle>
        <p className="text-sm text-muted-foreground">Enter advertising spend (₹) to predict sales</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tv" className="text-sm text-muted-foreground">
            TV Advertising (₹)
          </Label>
          <Input
            id="tv"
            type="number"
            placeholder="e.g., 12450"
            value={tv}
            onChange={(e) => setTv(e.target.value)}
            className="bg-secondary border-border text-foreground"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="radio" className="text-sm text-muted-foreground">
            Radio Advertising (₹)
          </Label>
          <Input
            id="radio"
            type="number"
            placeholder="e.g., 2490"
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
            className="bg-secondary border-border text-foreground"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newspaper" className="text-sm text-muted-foreground">
            Newspaper Advertising (₹)
          </Label>
          <Input
            id="newspaper"
            type="number"
            placeholder="e.g., 1660"
            value={newspaper}
            onChange={(e) => setNewspaper(e.target.value)}
            className="bg-secondary border-border text-foreground"
          />
        </div>
        <Button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Predicting...
            </>
          ) : (
            "Predict Sales"
          )}
        </Button>

        {error && <p className="text-xs text-amber-500">{error}</p>}

        {prediction !== null && result && (
          <div className="mt-4 space-y-3">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground">Predicted Sales</p>
              <p className="text-3xl font-bold text-primary">{formatINR(result.predictionINR)}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500">{result.metrics.roi}% ROI</span>
              </div>
            </div>

            {/* Contribution breakdown */}
            <div className="p-3 rounded-lg bg-secondary/50 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Contribution Breakdown
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base (Intercept)</span>
                  <span className="text-foreground">{formatINR(result.breakdown.base)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400">TV Contribution</span>
                  <span className="text-blue-400">+{formatINR(result.breakdown.tvContribution)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-400">Radio Contribution</span>
                  <span className="text-orange-400">+{formatINR(result.breakdown.radioContribution)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Newspaper Contribution</span>
                  <span className={result.breakdown.newspaperContribution >= 0 ? "text-slate-400" : "text-red-400"}>
                    {result.breakdown.newspaperContribution >= 0 ? "+" : "-"}
                    {formatINR(Math.abs(result.breakdown.newspaperContribution))}
                    {result.breakdown.newspaperContribution < 0 ? " (negative)" : ""}
                  </span>
                </div>
                <div className="border-t border-border pt-1 mt-1 flex justify-between font-medium">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    Total Spend
                  </span>
                  <span className="text-foreground">{formatINR(result.inputsINR.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
