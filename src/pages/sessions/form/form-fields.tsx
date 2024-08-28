import Input from '@/components/form-components/input'

export default function FormFields() {

  return (
    <div className="w-full space-y-5">
      <div className="grid lg:grid-cols-2 gap-3">
        <Input
          name="name"
          label="Name"
          placeholder="Enter locality name"
        />

        <Input
          name="initials"
          label="Initials"
          placeholder="Enter locality initials"
        />
      </div>
    </div>
  )
}
