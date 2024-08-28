import Input from '@/components/form-components/input'
import PhoneNumberInput from '@/components/form-components/phone-number-input'
import { Select } from '@/components/form-components/select'

export default function FormFields() {

  return (
    <div className="w-full space-y-5">
      <div className="grid lg:grid-cols-2 gap-x-5 gap-y-8">
        <div className="lg:col-span-2 grid lg:grid-cols-7 gap-x-5">

          <Select
            name="title"
            options={[
              {
                label: "Dr.",
                value: "Dr.",
              },
              {
                label: "Eng.",
                value: "Eng.",
              },
              {
                label: "Mr.",
                value: "Mr.",
              },
              {
                label: "Mrs",
                value: "Mrs.",
              },
              {
                label: "Ms",
                value: "Ms.",
              },
            ]}
            label="Role"
            placeholder="Select role"
          />

          <div className="lg:col-span-3">
            <Input name="firstname" label="Firstname" placeholder="Type in the firstname" />
          </div>
          
          <div className="lg:col-span-3">
            <Input name="lastname" label="Lastname" placeholder="Type in the lastname" />
          </div>
        </div>
        
        <Input name="email" label="Email" placeholder="Type in the email address" />
        

        <div className="">
          <PhoneNumberInput name="contact" label="Phone number" placeholder="Type in phone number" />
        </div>

        <div className="lg:col-span-2 grid grid-cols-7 gap-x-5">
          <Select
            name="panel"
            label="Select Member's panel"
            options={[
              {
                label: "SPC",
                value: "SPC",
              },
              {
                label: "TSC",
                value: "TSC",
              },
            ]}
          />

          <div className="lg:col-span-3">
            <Input name="designation" label="Designation" placeholder="Type in the designation" />
          </div>
          
          <div className="lg:col-span-3">
            <Select
              name="role"
              options={[
                {
                  label: 'Chairman',
                  value: 'Chairperson'
                },
                {
                  label: 'Secretary',
                  value: 'Secretary'
                },
                {
                  label: 'Member',
                  value: 'Member'
                },
                {
                  label: 'Other',
                  value: 'Other'
                },
              ]}
              placeholder="Select role"
              label="Role"
            />
          </div>
        </div>
      </div>


    </div>
  )
}
