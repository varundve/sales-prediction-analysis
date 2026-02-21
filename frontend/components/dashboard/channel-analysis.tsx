"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

const USD_TO_INR = 83

const channelData = [
  { name: "TV", spend: Math.round(147.04 * USD_TO_INR), roi: 4.6, correlation: 0.782, color: "#60a5fa" },
  { name: "Radio", spend: Math.round(23.26 * USD_TO_INR), roi: 18.9, correlation: 0.576, color: "#4ade80" },
  { name: "Newspaper", spend: Math.round(30.55 * USD_TO_INR), roi: 0.3, correlation: 0.228, color: "#fbbf24" },
]

export function ChannelAnalysis() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-foreground">Channel Performance</CardTitle>
        <p className="text-sm text-muted-foreground">ROI comparison by advertising channel</p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelData} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number, name: string) => [
                  name === "roi" ? `${value}%` : `₹${value.toLocaleString("en-IN")}`,
                  name === "roi" ? "ROI" : "Avg Spend",
                ]}
              />
              <Bar dataKey="roi" name="roi" radius={[0, 4, 4, 0]}>
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {channelData.map((channel) => (
            <div key={channel.name} className="text-center p-3 rounded-lg bg-secondary">
              <p className="text-xs text-muted-foreground mb-1">Correlation</p>
              <p className="text-lg font-semibold" style={{ color: channel.color }}>
                {channel.correlation}
              </p>
              <p className="text-xs text-muted-foreground">{channel.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
