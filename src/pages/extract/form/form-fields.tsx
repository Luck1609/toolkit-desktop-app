import Checkbox from '@/components/form-components/checkbox'
import Datepicker from '@/components/form-components/datepicker'
import Input from '@/components/form-components/input'
import PhoneNumberInput from '@/components/form-components/phone-number-input'
import PlotDetails from '@/pages/applications/form/plot'
import { useFormContext } from 'react-hook-form'

export default function FormFields() {
  const { watch, formState: { errors } } = useFormContext()
  
  console.log('Form values', watch(),)
  console.log('Form errors =>', errors,)

  return (
    <div className="w-full space-y-5">
      <div className="grid lg:grid-cols-3 gap-3">
        <Input
          name="firstname"
          label="Firstname"
          placeholder="Enter firstname"
        />

        <Input
          name="lastname"
          label="Lastname"
          placeholder="Enter lastname"
        />

        <div className="">
          <PhoneNumberInput
            name="phone_number"
            label="Phone no."
            placeholder="Phone number"
            className="w-full"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-4 lg:col-span-2">
        <PlotDetails />
      </div>

      <div className="grid lg:grid-cols-10 gap-4 items-center">
        <div className="lg:col-span-2">
          <Datepicker
            name="registration_date"
            label="Land registration date"
          />
        </div>

        <div className="lg:col-span-2">
          <Datepicker
            name="allocation_date"
            label="Land allocation date"
          />
        </div>
        
        <div className="w-full lg:col-span-6">
          <Checkbox
            name="landuse"
            className="flex items-center space-x-4"
            label="Check all land uses"
            options={[
              {
                label: "Residential",
                value: "residential",
              },
              {
                label: "Commercial",
                value: "commercial",
              },
              {
                label: "Civic & Culture",
                value: "civic_&_culture",
              },
              {
                label: "Education",
                value: "education",
              },
              {
                label: "Industrial",
                value: "industrial",
              },
              {
                label: "Open space",
                value: "open_space",
              },
            ]}
          />
        </div>
      </div>
        


    </div>
  )
}
