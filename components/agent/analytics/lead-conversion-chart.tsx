"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/charts";

export function LeadConversionChart() {
  const data = [
    {
      name: "Jan",
      leads: 45,
      conversions: 12,
    },
    {
      name: "Feb",
      leads: 52,
      conversions: 15,
    },
    {
      name: "Mar",
      leads: 48,
      conversions: 14,
    },
    {
      name: "Apr",
      leads: 61,
      conversions: 18,
    },
    {
      name: "May",
      leads: 55,
      conversions: 16,
    },
    {
      name: "Jun",
      leads: 67,
      conversions: 22,
    },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Lead Conversion</CardTitle>
        <CardDescription>
          Number of leads vs conversions over time
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#adfa1d"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Leads"
            />
            <Line
              type="monotone"
              dataKey="conversions"
              stroke="#f97316"
              strokeWidth={2}
              name="Conversions"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
