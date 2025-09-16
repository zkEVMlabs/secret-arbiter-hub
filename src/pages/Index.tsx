import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WalletConnect } from '@/components/WalletConnect'
import { DisputeForm } from '@/components/DisputeForm'
import { CasesDashboard } from '@/components/CasesDashboard'
import { Scale, Shield, Users, FileText, Gavel, Lock } from 'lucide-react'
import { useAccount } from 'wagmi'

const Index = () => {
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-legal">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg shadow-glow">
                <Scale className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Resolve Disputes Confidentially</h1>
                <p className="text-muted-foreground">Encrypted DAO arbitration platform</p>
              </div>
            </div>
            <div className="max-w-xs">
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center space-y-6 mb-12">
              <div className="inline-flex p-4 bg-primary/10 rounded-full shadow-legal mb-4">
                <Gavel className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                Professional Dispute Resolution
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Submit arbitration cases privately with end-to-end encryption. 
                Only assigned arbitrators can access case details.
              </p>
              <div className="pt-4">
                <p className="text-sm text-accent font-medium">Connect your wallet to get started</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-card shadow-card-legal border-border">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-primary/10 rounded-lg w-fit">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Encrypted Submissions</CardTitle>
                  <CardDescription>
                    All case details are encrypted and only revealed to assigned arbitrators
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-card shadow-card-legal border-border">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-accent/10 rounded-lg w-fit">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Expert Arbitrators</CardTitle>
                  <CardDescription>
                    Qualified legal professionals with DAO and blockchain expertise
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-card shadow-card-legal border-border">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-legal-gold/10 rounded-lg w-fit">
                    <Shield className="w-6 h-6 text-legal-gold" />
                  </div>
                  <CardTitle>Binding Decisions</CardTitle>
                  <CardDescription>
                    Enforceable arbitration awards with smart contract integration
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
                <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileText className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="submit" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Shield className="w-4 h-4 mr-2" />
                  Submit Dispute
                </TabsTrigger>
                <TabsTrigger value="cases" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Scale className="w-4 h-4 mr-2" />
                  My Cases
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="bg-gradient-card shadow-card-legal border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Active Cases
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">2</div>
                      <p className="text-sm text-muted-foreground">In arbitration</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card-legal border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        Resolved Cases
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-accent">1</div>
                      <p className="text-sm text-muted-foreground">Successfully closed</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card-legal border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-legal-gold rounded-full"></div>
                        Total Value
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-legal-gold">8.5 ETH</div>
                      <p className="text-sm text-muted-foreground">Under arbitration</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-card shadow-card-legal border-border">
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                    <CardDescription>Professional dispute resolution in 4 simple steps</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center space-y-3">
                      <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">1. Submit Case</h3>
                      <p className="text-sm text-muted-foreground">Encrypted submission with all evidence</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto p-4 bg-accent/10 rounded-full w-fit">
                        <Users className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-semibold">2. Arbitrator Assignment</h3>
                      <p className="text-sm text-muted-foreground">Expert review and case assignment</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto p-4 bg-legal-gold/10 rounded-full w-fit">
                        <Scale className="w-6 h-6 text-legal-gold" />
                      </div>
                      <h3 className="font-semibold">3. Review Process</h3>
                      <p className="text-sm text-muted-foreground">Confidential arbitration proceedings</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="mx-auto p-4 bg-green-500/10 rounded-full w-fit">
                        <Gavel className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="font-semibold">4. Binding Decision</h3>
                      <p className="text-sm text-muted-foreground">Enforceable award issued</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submit">
                <DisputeForm />
              </TabsContent>

              <TabsContent value="cases">
                <CasesDashboard />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  )
}

export default Index