import { CheckboxItems } from '@/components/form-components/checkbox-items'
import Input from '@/components/form-components/input'
import Helper from '@/helper'


const { generateAlphabets } = Helper

export default function FormFields() {

  console.log('')

  return (
    <div className="w-full space-y-5">
      <div className="grid lg:grid-cols-2 gap-3">
        <Input name="name" label="Name" placeholder="Enter sector name" />

        <Input
          name="initials"
          label="Initials"
          placeholder="Enter sector initials"
        />

      </div>

      <div className="w-full grid lg:grid-cols-4 gap-3 gap-y-5">
        <CheckboxItems name="blocks" options={generateAlphabets} label="Select blocks" />
      </div>
    </div>
  )
}
