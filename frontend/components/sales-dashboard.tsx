"use client"

import { useState, useEffect } from "react"
import { Header } from "./dashboard/header"
import { MetricsGrid } from "./dashboard/metrics-grid"
import { ChannelAnalysis } from "./dashboard/channel-analysis"
import { ModelPerformance } from "./dashboard/model-performance"
import { PredictionForm } from "./dashboard/prediction-form"
import { Insights } from "./dashboard/insights"
import { CorrelationChart } from "./dashboard/correlation-chart"

interface User {
  email: string;
  name?: string;
}

interface SalesDashboardProps {
  user?: User | any
}

export function SalesDashboard({ user: initialUser }: SalesDashboardProps) {
  const [prediction, setPrediction] = useState<number | null>(null)
  const [user, setUser] = useState<User | null>(initialUser || null)

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <MetricsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChannelAnalysis />
          <CorrelationChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ModelPerformance />
          </div>
          <PredictionForm onPrediction={setPrediction} prediction={prediction} />
        </div>
        <Insights />
      </main>
    </div>
  )
}
