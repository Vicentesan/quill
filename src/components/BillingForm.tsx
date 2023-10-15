"use client"

import { trpc } from "@/app/_trpc/client"
import { getUserSubscriptionPlan } from "@/lib/stripe"
import { toast } from "sonner"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const BillingForm = ({ subscriptionPlan }: BillingFormProps) => {

  const { mutate: createStripeSession, isLoading } = trpc.createStripeSession.useMutation({
    onSuccess: (({ url }) => {
      if (url) window.location.href = url
      if (!url) toast.error('There was a problem...', {
        description: 'Please try again in a moment',
        duration: 5000
      })
    })
  })

  return (
    <MaxWidthWrapper className='max-w-5xl'>
      <form className='mt-12' onSubmit={(e) => {
        e.preventDefault()
        createStripeSession()
      }}>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>You are currently on the <strong>{subscriptionPlan.name}</strong> plan.</CardDescription>
          </CardHeader>
        </Card>
      </form>
    </MaxWidthWrapper>
  )

}

export default BillingForm