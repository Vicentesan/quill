"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { trpc } from "@/app/_trpc/client"
import { getUserSubscriptionPlan } from "@/lib/stripe"

const UpgradeButton = ({ plan }: { plan?: string }) => {

  const { mutate: createStripeSession} = trpc.createStripeSession.useMutation({
    onSuccess: ({url}) => {
      window.location.href = url ?? '/dashboard/billing'
    }
  })

  return (
    <Button onClick={() => createStripeSession()} className='w-full'>
      {plan ===  'Pro' ? 'Manage subscription' : 'Upgrade now'} <ArrowRight className='h-5 w-5 ml-1.5'/>
    </Button>
  )

}

export default UpgradeButton