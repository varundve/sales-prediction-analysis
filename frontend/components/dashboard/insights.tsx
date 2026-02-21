import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertCircle, Lightbulb, Target } from "lucide-react"

const insights = [
  {
    icon: TrendingUp,
    title: "Prioritize TV Advertising",
    description:
      "TV shows the strongest correlation (0.782) with sales. Each $1 spent generates $0.046 additional sales.",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    icon: Target,
    title: "Radio Delivers Best ROI",
    description: "Despite lower correlation, Radio provides 18.9% return per dollar - the highest among all channels.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: AlertCircle,
    title: "Reduce Newspaper Spend",
    description:
      "Newspaper advertising shows minimal impact (0.3% ROI). Consider reallocating this budget to TV or Radio.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: Lightbulb,
    title: "Optimal Budget Split",
    description: "Recommended allocation: 65-70% TV, 25-30% Radio, 5-10% Newspaper for maximum sales impact.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
]

export function Insights() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-foreground">Actionable Insights</CardTitle>
        <p className="text-sm text-muted-foreground">Key recommendations for marketing strategy</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <div key={insight.title} className="flex gap-4 p-4 rounded-lg bg-secondary">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${insight.bgColor} flex items-center justify-center`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{insight.title}</h3>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
