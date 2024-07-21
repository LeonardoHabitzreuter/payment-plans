import { FormInputs } from "../models"

type Props = {
  fields: FormInputs
}

export default function ResultContainer ({ fields }: Props) {
  const neverEnds = fields.duration === "Never Ends"
  const hasTrial = fields.trialPeriod && fields.trialPeriod !== "None"
  const initialPrice = Number(fields.initialPrice || 0)
  const paymentAmount = Number(fields.payment || 0)
  const cycles = Number(fields.billingCycles || 0)

  return (
    <div className="sm:col-span-3 bg-[#EBEBEB] p-4 rounded flex gap-2 items-start">
      <img width={15} height={21} src='/subscription.svg' />
      <p>
        Your customer will be charged ${initialPrice} immediately&nbsp;
        {hasTrial && `for their ${fields.trialPeriodNumber || 0} ${fields.trialPeriod} trial, `}
        and then ${paymentAmount} every {fields.billingFrequencyNumber || 0} {fields.billingFrequencyPeriod || 'TBD'}
        {neverEnds ? ' until they cancel.' : (
          `, ${cycles} times. The total amount paid will be $${initialPrice + (paymentAmount * cycles)}.`
        )}
      </p>
    </div>
  )
}