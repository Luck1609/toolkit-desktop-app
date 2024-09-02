import Input from "@/components/form-components/input";
import PhoneNumberInput from "@/components/form-components/phone-number-input";
import { Select } from "@/components/form-components/select";



export function UserForm() {

  return (
    <div className="space-y-5">
      <div className="lg:col-span-2 grid lg:grid-cols-7 gap-5">
        <Select
          name="title"
          options={[
            { label: "Dr.", value: "Dr." },
            { label: "Eng.", value: "Eng." },
            { label: "Mr.", value: "Mr." },
            { label: "Mrs.", value: "Mrs." },
            { label: "Ms", value: "Ms" },
          ]}
          label="Title"
          placeholder="Select title"
        />

        <div className="lg:col-span-3">
          <Input
            name="firstname"
            label="Firstname"
            placeholder="Enter your firstname"
          />
        </div>

        <div className="lg:col-span-3">
          <Input
            name="lastname"
            label="Lastname"
            placeholder="Enter your lastname"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-8 gap-5">
        <div className="lg:col-span-2">
          <Select
            name="role"
            label="Role"
            placeholder="Select role"
            options={[
              {
                label: "Assistant Planning Officer",
                value: "Assistant Planning Officer",
              },
              {
                label: "Technical Officer",
                value: "Technical Officer",
              },
              {
                label: "Secretary",
                value: "Secretary",
              },
            ]}
          />
        </div>

        <div className="lg:col-span-3">
          <Input name="email" label="Email" placeholder="Enter your email" />
        </div>

        <div className="lg:col-span-3">
          <PhoneNumberInput
            name="contact"
            label="Phone no."
            className="w-full"
            placeholder="Enter your phone number"
          />
        </div>


      </div>
    </div>
  );
}
