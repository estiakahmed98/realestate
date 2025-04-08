"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

export function PropertyViewsChart() {
  const data = [
    {
      name: "Jan",
      views: 420,
    },
    {
      name: "Feb",
      views: 380,
    },
    {
      name: "Mar",
      views: 450,
    },
    {
      name: "Apr",
      views: 520,
    },
    {
      name: "May",
      views: 480,
    },
    {
      name: "Jun",
      views: 595,
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Property Views</CardTitle>
        <CardDescription>Total property views by month</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#adfa1d" name="Views" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

