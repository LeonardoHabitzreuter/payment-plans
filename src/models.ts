export type BillingFrequency = 'Days' | 'Weeks' | 'Months'
export type TrialPeriod = 'None' | 'Days' | 'Weeks' | 'Months'
export type Duration = 'Never Ends' | 'Customize'

export type FormInputs = {
  initialPrice?: number
  billingFrequencyNumber: number
  billingFrequencyPeriod: BillingFrequency
  trialPeriodNumber?: number
  trialPeriod: TrialPeriod
  duration: Duration
  payment: number
  billingCycles?: number
}