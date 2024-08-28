import { useForm } from "react-hook-form";
import PhoneNumberInput from "@/components/custom/phone-number-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Select } from "@/components/form-components/select";
import Input from "@/components/form-components/input";

export default function Register() {
  const method = useForm(),
    { handleSubmit } = method;

  const submit = () => {};

  return (
    <div className="sm:max-w-2xl dark:bg-default shadow-md overflow-hidden sm:rounded-lg w-full mt-6 p-6">
      <h4 className="text-xl font-semibold mb-5 text-center text-slate-300">
        Officer Registration
      </h4>

      <Form {...method}>
        <form
          className="grid lg:grid-cols-2 gap-5 gap-y-4"
          onSubmit={handleSubmit(submit)}
        >
          <Input
            name="firstname"
            className=""
            placeholder="Type in your firstname"
            label="First name"
          />
          <Input
            name="lastname"
            className=""
            placeholder="Type in your lastname"
            label="Last name"
          />

          <Select
            name="title"
            label="Title"
            placeholder="Select title"
            options={[
              {
                label: "Mr.",
                value: "Mr."
              },
            ]}
          />

          <Input
            name="email"
            className=""
            placeholder="Type in your email address"
            label="Email"
          />

          <Input
            name="password"
            type="password"
            className=""
            placeholder="Enter your password"
            label="Enter your password"
          />
          <Input
            name="password_confirmation"
            type="password"
            className=""
            placeholder="Enter your password"
            label="Enter your password"
          />

          <PhoneNumberInput
            name="phone"
            label="Phone No."
            placeholder="Enter your phone number"
            className="w-full rounded p-2 h-14"
          />

          <Button className="text-white w-3/5 mx-auto lg:col-span-2">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
