"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, ZAxis } from "recharts"

const scatterData = [
  { tv: 230.1, sales: 22.1 },
  { tv: 44.5, sales: 10.4 },
  { tv: 17.2, sales: 9.3 },
  { tv: 151.5, sales: 18.5 },
  { tv: 180.8, sales: 12.9 },
  { tv: 8.7, sales: 7.2 },
  { tv: 120.2, sales: 13.2 },
  { tv: 199.8, sales: 10.6 },
  { tv: 214.7, sales: 17.4 },
  { tv: 204.1, sales: 19 },
  { tv: 195.4, sales: 22.4 },
  { tv: 281.4, sales: 24.4 },
  { tv: 218.4, sales: 18 },
  { tv: 237.4, sales: 12.5 },
  { tv: 228.3, sales: 15.5 },
  { tv: 262.9, sales: 12 },
  { tv: 240.1, sales: 15.9 },
  { tv: 248.8, sales: 18.9 },
  { tv: 292.9, sales: 21.4 },
  { tv: 265.6, sales: 17.4 },
  { tv: 290.7, sales: 12.8 },
  { tv: 266.9, sales: 25.4 },
  { tv: 228, sales: 21.5 },
  { tv: 202.5, sales: 16.6 },
  { tv: 293.6, sales: 20.7 },
  { tv: 239.9, sales: 23.2 },
  { tv: 216.4, sales: 22.6 },
  { tv: 182.6, sales: 21.2 },
  { tv: 262.7, sales: 20.2 },
  { tv: 198.9, sales: 23.7 },
  { tv: 136.2, sales: 13.2 },
  { tv: 210.8, sales: 23.8 },
  { tv: 210.7, sales: 18.4 },
  { tv: 261.3, sales: 24.2 },
  { tv: 239.3, sales: 15.7 },
  { tv: 131.1, sales: 18 },
  { tv: 237.4, sales: 18.9 },
  { tv: 216.8, sales: 22.3 },
  { tv: 199.1, sales: 18.3 },
]

export function CorrelationChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-foreground">TV Spend vs Sales</CardTitle>
        <p className="text-sm text-muted-foreground">Correlation coefficient: 0.782</p>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <XAxis
                type="number"
                dataKey="tv"
                name="TV Spend"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                label={{ value: "TV Spend ($)", position: "bottom", fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                type="number"
                dataKey="sales"
                name="Sales"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                label={{ value: "Sales", angle: -90, position: "insideLeft", fill: "#9ca3af", fontSize: 12 }}
              />
              <ZAxis range={[60, 60]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number, name: string) => [`$${value.toFixed(1)}`, name]}
              />
              <Scatter name="Data Points" data={scatterData} fill="#60a5fa" opacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
