"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { CheckCircle2 } from "lucide-react"

const modelData = [
  { name: "Gradient Boosting", r2: 0.9831, rmse: 0.77, mae: 0.59, best: true },
  { name: "Random Forest", r2: 0.9786, rmse: 0.87, mae: 0.64, best: false },
  { name: "Linear Regression", r2: 0.9059, rmse: 1.82, mae: 1.35, best: false },
  { name: "Ridge Regression", r2: 0.9053, rmse: 1.83, mae: 1.36, best: false },
  { name: "Lasso Regression", r2: 0.9048, rmse: 1.83, mae: 1.36, best: false },
]

export function ModelPerformance() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-foreground">Model Performance Comparison</CardTitle>
        <p className="text-sm text-muted-foreground">R² Score across different regression models</p>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modelData} layout="vertical" margin={{ left: 30, right: 40 }}>
              <XAxis
                type="number"
                domain={[0.88, 1]}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value.toFixed(2)}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number) => [value.toFixed(4), "R² Score"]}
              />
              <Bar dataKey="r2" radius={[0, 4, 4, 0]}>
                {modelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.best ? "#4ade80" : "#60a5fa"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
          <CheckCircle2 className="w-5 h-5 text-chart-2" />
          <div>
            <p className="text-sm font-medium text-foreground">Best Model: Gradient Boosting</p>
            <p className="text-xs text-muted-foreground">R² = 0.9831, RMSE = $0.77, MAE = $0.59</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
