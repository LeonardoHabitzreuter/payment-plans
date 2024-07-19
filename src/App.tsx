import Button from "./components/Button"
import Input from "./components/Input"
import Label from "./components/Label"
import Select from "./components/Select"
import { FormProvider, useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./components/Form";
import { testFloatPrecision } from "./utils";
import ErrorMessage from "./components/ErrorMessage";
import ResultContainer from "./components/ResultContainer";
import { BillingFrequency, Duration, FormInputs, TrialPeriod } from "./models";

const BILLING_FREQUENCIES: (BillingFrequency | undefined)[] = [undefined, 'Days', 'Weeks', 'Months']
const DURATION_OPTIONS: Duration[] = ['Never Ends', 'Customize']
const TRIAL_PERIODS: (TrialPeriod | undefined)[] = [undefined, 'None', 'Days', 'Weeks', 'Months']

const BILLING_FREQUENCY_ERROR = 'Please, provide a number and a period'
const TRIAL_PERIOD_ERROR = 'Please, provide a trial period'
const DECIMAL_ERROR = 'Max precision is 2 decimal places'
const NAN_ERROR = 'Please, provide a valid number'

const billingPeriodToPayment: Record<BillingFrequency, string> = {
  'Days': 'Daily',
  'Weeks': 'Weekly',
  'Months': 'Monthly'
}

export const formSchema = z.object({
  initialPrice: z.coerce.number().finite().positive().refine(testFloatPrecision(2), { message: DECIMAL_ERROR } ).optional(),
  billingFrequencyNumber: z.coerce.number({ invalid_type_error: NAN_ERROR }).int().finite().positive(),
  billingFrequencyPeriod: z.string({ required_error: BILLING_FREQUENCY_ERROR }).refine(x => !!x, { message: BILLING_FREQUENCY_ERROR } ),
  trialPeriodNumber: z.coerce.number().int().finite().positive().optional(),
  trialPeriod: z.string({ required_error: TRIAL_PERIOD_ERROR }).refine(x => !!x, { message: TRIAL_PERIOD_ERROR } ),
  payment: z.coerce.number({ invalid_type_error: NAN_ERROR }).finite().positive().refine(testFloatPrecision(2), { message: DECIMAL_ERROR } ),
  duration: z.string(),
  billingCycles: z.coerce.number({ invalid_type_error: NAN_ERROR }).int().finite().positive().optional(),
})

function App() {
  const form = useForm<FormInputs>({
    defaultValues: { duration: 'Never Ends' },
    resolver: zodResolver(formSchema),
    shouldUseNativeValidation: false
  })

  const { errors } = form.formState

  return (
    <div className='p-8 min-h-screen max-w-[1200px] bg-white mx-auto'>
      <h2 className="text-2xl font-semibold text-gray-900 text-center">Set up your subscription</h2>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="grid sm:grid-cols-3 gap-4 sm:gap-10 mt-8" >
          <FormField
            control={form.control}
            name="initialPrice"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Initial Price</FormLabel>
                <FormControl>
                  <Input type="number" inputMode="decimal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 space-y-2">
            <Label hasError={!!(errors.billingFrequencyNumber || errors.billingFrequencyPeriod)}>
              Billing Frequency
            </Label>
            <div className="grid grid-cols-4 gap-2">
              <FormField
                control={form.control}
                name="billingFrequencyNumber"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingFrequencyPeriod"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Select options={BILLING_FREQUENCIES} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <ErrorMessage className="col-span-4">
                {errors.billingFrequencyNumber?.message || errors.billingFrequencyPeriod?.message}
              </ErrorMessage>
            </div>
          </div>

          <FormField
            control={form.control}
            name="payment"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>{billingPeriodToPayment[form.watch('billingFrequencyPeriod')]} Payment</FormLabel>
                <FormControl>
                  <Input type="number" inputMode="decimal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 space-y-2">
            <Label hasError={!!(errors.trialPeriodNumber || errors.trialPeriod)}>
              Trial Period
            </Label>
            <div className="grid grid-cols-4 gap-2">
              <FormField
                disabled={form.watch('trialPeriod') === 'None'}
                control={form.control}
                name="trialPeriodNumber"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trialPeriod"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Select options={TRIAL_PERIODS} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <ErrorMessage className="col-span-4">
                {errors.trialPeriodNumber?.message || errors.trialPeriod?.message}
              </ErrorMessage>
            </div>
          </div>

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Select options={DURATION_OPTIONS} {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1">
            {form.watch('duration') === 'Customize' && (
              <FormField
                control={form.control}
                name="billingCycles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Cycles</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <ResultContainer fields={form.watch()} />

          <Button type="submit" className='w-full sm:w-52 justify-self-end'>Submit</Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default App
