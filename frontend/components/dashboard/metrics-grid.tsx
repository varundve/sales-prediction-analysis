import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, IndianRupee, Target, Zap } from "lucide-react"

const USD_TO_INR = 83

const metrics = [
  {
    label: "Best Model R² Score",
    value: "0.9831",
    change: "+98.3%",
    icon: Target,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    label: "Average Sales",
    value: `₹${(14.02 * USD_TO_INR).toFixed(0)}`,
    change: "per unit",
    icon: IndianRupee,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    label: "TV ROI",
    value: "4.6%",
    change: "per ₹1 spent",
    icon: TrendingUp,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    label: "Radio ROI",
    value: "18.9%",
    change: "highest return",
    icon: Zap,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
]

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className={`text-xs ${metric.color}`}>{metric.change}</p>
              </div>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
