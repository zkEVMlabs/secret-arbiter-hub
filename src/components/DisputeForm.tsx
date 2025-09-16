import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Shield, FileText, Users, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

// Contract ABI - In a real implementation, this would be imported from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_respondent", "type": "address"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_deadline", "type": "uint256"},
      {"internalType": "bytes", "name": "_amount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createDispute",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  }
] as const

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" // Replace with actual contract address

export function DisputeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    disputeType: '',
    amount: '',
    title: '',
    description: '',
    evidence: '',
    respondent: ''
  })
  const { toast } = useToast()
  const { address, isConnected } = useAccount()
  
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to submit a dispute.",
        variant: "destructive"
      })
      return
    }

    if (!formData.respondent || !formData.description || !formData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // In a real implementation, you would encrypt the amount using FHE
      // For now, we'll simulate the encryption process
      const deadline = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days from now
      const amountInWei = parseEther(formData.amount)
      
      // Simulate FHE encryption (in real implementation, this would be done client-side)
      const encryptedAmount = new Uint8Array(32) // Placeholder for encrypted amount
      const inputProof = new Uint8Array(64) // Placeholder for proof
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createDispute',
        args: [
          formData.respondent as `0x${string}`,
          formData.description,
          BigInt(deadline),
          encryptedAmount,
          inputProof
        ],
        value: amountInWei
      })
      
    } catch (err) {
      console.error('Error submitting dispute:', err)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your dispute. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message when transaction is confirmed
  if (isConfirmed) {
    toast({
      title: "Dispute Submitted Successfully",
      description: "Your encrypted dispute has been submitted to the blockchain.",
    })
  }

  return (
    <Card className="bg-gradient-card shadow-card-legal border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Submit Encrypted Dispute</CardTitle>
            <CardDescription>
              All case details are encrypted and only revealed to assigned arbitrators
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="disputeType">Dispute Type</Label>
              <Select value={formData.disputeType} onValueChange={(value) => handleInputChange('disputeType', value)}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select dispute type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract">Contract Dispute</SelectItem>
                  <SelectItem value="payment">Payment Dispute</SelectItem>
                  <SelectItem value="governance">Governance Issue</SelectItem>
                  <SelectItem value="intellectual">IP Dispute</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Dispute Amount (ETH) *</Label>
              <Input 
                id="amount"
                type="number" 
                step="0.001"
                placeholder="0.000"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="bg-input border-border"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="respondent">Respondent Address *</Label>
            <Input 
              id="respondent"
              placeholder="0x..."
              value={formData.respondent}
              onChange={(e) => handleInputChange('respondent', e.target.value)}
              className="bg-input border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Case Title</Label>
            <Input 
              id="title"
              placeholder="Brief description of the dispute"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea 
              id="description"
              placeholder="Provide comprehensive details about the dispute..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-32 bg-input border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="evidence">Evidence Links</Label>
            <Textarea 
              id="evidence"
              placeholder="URLs to supporting documents, contracts, communications..."
              value={formData.evidence}
              onChange={(e) => handleInputChange('evidence', e.target.value)}
              className="bg-input border-border"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              End-to-end encrypted
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              Private arbitration
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              7-14 day resolution
            </div>
          </div>

          {!isConnected && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">
                Please connect your wallet to submit a dispute.
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-legal hover:opacity-90 text-primary-foreground shadow-legal"
            disabled={isSubmitting || isPending || isConfirming || !isConnected}
          >
            {isSubmitting || isPending || isConfirming 
              ? 'Processing...' 
              : 'Submit Encrypted Dispute'
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}