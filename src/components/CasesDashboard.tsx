import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Clock, CheckCircle, AlertCircle, Scale } from 'lucide-react'

const mockCases = [
  {
    id: "CASE-001",
    title: "Smart Contract Payment Dispute",
    amount: "2.5 ETH",
    status: "In Review",
    priority: "High",
    submittedAt: "2024-01-15",
    arbitrator: "0x1234...5678"
  },
  {
    id: "CASE-002", 
    title: "DAO Governance Vote Challenge",
    amount: "0.8 ETH",
    status: "Awaiting Evidence",
    priority: "Medium",
    submittedAt: "2024-01-12",
    arbitrator: "Pending Assignment"
  },
  {
    id: "CASE-003",
    title: "NFT Ownership Dispute",
    amount: "5.2 ETH", 
    status: "Resolved",
    priority: "High",
    submittedAt: "2024-01-08",
    arbitrator: "0x9876...3210"
  }
]

export function CasesDashboard() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Review':
        return <Clock className="w-4 h-4" />
      case 'Resolved':
        return <CheckCircle className="w-4 h-4" />
      case 'Awaiting Evidence':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Scale className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Review':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'Resolved':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'Awaiting Evidence':
        return 'bg-accent/10 text-accent border-accent/20'
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'Medium':
        return 'bg-accent/10 text-accent border-accent/20'
      case 'Low':
        return 'bg-muted/10 text-muted-foreground border-muted/20'
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Active Cases</h2>
          <p className="text-muted-foreground">Monitor your dispute resolution cases</p>
        </div>
        <Badge variant="outline" className="border-accent/20 text-accent">
          {mockCases.length} Total Cases
        </Badge>
      </div>

      <div className="grid gap-4">
        {mockCases.map((case_) => (
          <Card key={case_.id} className="bg-gradient-card shadow-card-legal border-border hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{case_.title}</CardTitle>
                    <Badge variant="outline" className={getPriorityColor(case_.priority)}>
                      {case_.priority}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    Case ID: {case_.id} • Submitted {case_.submittedAt}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-accent">{case_.amount}</div>
                  <Badge variant="outline" className={getStatusColor(case_.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(case_.status)}
                      {case_.status}
                    </div>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Arbitrator:</span> {case_.arbitrator}
                </div>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}