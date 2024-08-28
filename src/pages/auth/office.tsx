import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import PhoneNumberInput from "@/components/custom/phone-number-input";
import { Button } from "@/components/ui/button";
import Input from "@/components/form-components/input";
import { Form } from "@/components/ui/form";
import { Select } from "@/components/form-components/select";

const validation = yup.object().shape({});

export default function Office() {
  const method = useForm({ mode: "all", resolver: yupResolver(validation) }),
    { handleSubmit } = method;

  const submit = () => {};

  return (
    <div className="sm:max-w-2xl dark:bg-default shadow-md overflow-hidden sm:rounded-lg w-full mt-6 p-6">
      <h4 className="text-xl font-semibold mb-5 text-center text-slate-300">
        Office Registration
      </h4>
      <Form {...method}>
        <form
          className="grid lg:grid-cols-2 gap-5 gap-y-4"
          onSubmit={handleSubmit(submit)}
        >
          <Input
            name="district"
            className=""
            placeholder="Type in your district name"
            label="District name"
          />

          <Select
            name="region"
            label="Title"
            options={[
              {
                label: "Mr.",
                value: "Mr.",
              },
            ]}
          />

          <Input
            name="initials"
            className=""
            placeholder="Type in your district initials"
            label="Email"
          />

          <Input
            name="shelves"
            type="number"
            className=""
            placeholder="Number of shelves in the office"
            label="No. of shelves"
          />

          <Button className="text-white w-3/5 mx-auto lg:col-span-2">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
