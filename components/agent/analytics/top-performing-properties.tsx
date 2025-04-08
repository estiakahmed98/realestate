"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

// Sample property data
const properties = [
  {
    id: "1",
    title: "Luxury Condo in Downtown",
    type: "Condo",
    status: "For Sale",
    price: 450000,
    views: 120,
    leads: 24,
    conversionRate: 20,
  },
  {
    id: "2",
    title: "Family Home with Garden",
    type: "House",
    status: "For Sale",
    price: 650000,
    views: 98,
    leads: 13,
    conversionRate: 13.3,
  },
  {
    id: "3",
    title: "Beach Villa with Ocean View",
    type: "Villa",
    status: "For Sale",
    price: 1200000,
    views: 86,
    leads: 18,
    conversionRate: 20.9,
  },
  {
    id: "4",
    title: "Modern City Apartment",
    type: "Apartment",
    status: "For Rent",
    price: 2500,
    views: 99,
    leads: 15,
    conversionRate: 15.2,
  },
  {
    id: "5",
    title: "Suburban House with Pool",
    type: "House",
    status: "For Sale",
    price: 750000,
    views: 85,
    leads: 11,
    conversionRate: 12.9,
  },
]

export function TopPerformingProperties() {
  const [sortBy, setSortBy] = useState<"views" | "leads" | "conversionRate">("views")

  const sortedProperties = [...properties].sort((a, b) => b[sortBy] - a[sortBy])

  const formatPrice = (price: number, status: string) => {
    return status === "For Rent" ? `$${price.toLocaleString()}/mo` : `$${price.toLocaleString()}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Properties</CardTitle>
        <CardDescription>Properties with the highest engagement metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="cursor-pointer hover:text-primary" onClick={() => setSortBy("views")}>
                  Views {sortBy === "views" && "↓"}
                </TableHead>
                <TableHead className="cursor-pointer hover:text-primary" onClick={() => setSortBy("leads")}>
                  Leads {sortBy === "leads" && "↓"}
                </TableHead>
                <TableHead className="cursor-pointer hover:text-primary" onClick={() => setSortBy("conversionRate")}>
                  Conversion Rate {sortBy === "conversionRate" && "↓"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="font-medium">{property.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>
                    <Badge variant={property.status === "For Sale" ? "default" : "secondary"}>{property.status}</Badge>
                  </TableCell>
                  <TableCell>{formatPrice(property.price, property.status)}</TableCell>
                  <TableCell>{property.views}</TableCell>
                  <TableCell>{property.leads}</TableCell>
                  <TableCell>{property.conversionRate.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

