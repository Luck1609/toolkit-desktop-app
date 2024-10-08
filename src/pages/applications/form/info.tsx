
import Input from "@/components/form-components/input";
import PhoneNumberInput from "@/components/form-components/phone-number-input";
import { Select } from "@/components/form-components/select";
import { fetcher } from "@/lib/fetcher";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { Application } from "../resource/types";

export default function ApplicantInfo() {
  const { data } = useSWR('/locality', fetcher<Application>)
  const { watch } = useFormContext(),
    locality = watch("locality_id"),
    sector = watch("sector_id");

    console.log('locality info', data)

  // useEffect(() => {
  //   setValue("sector_id", "");
  //   setValue("block", "");
  // }, [locality, setValue]);

  // useEffect(() => {
  //   setValue("block", "");
  // }, [sector, setValue]);


  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-3">
        <Input
          name="firstname"
          label="Firstname"
          placeholder="Enter your firstname"
        />

        <Input
          name="lastname"
          label="Lastname"
          placeholder="Enter your lastname"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-3">
        <Select
          name="title"
          label="Select title"
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
        />

        <PhoneNumberInput
          name="contact"
          label="Phone no."
          className="w-full"
          placeholder="Enter your phone number"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-3">
        <Select
          name="locality_id"
          label="Select locality"
          options={localities}
        />

        <Select
          name="sector_id"
          label="Select sector"
          options={locality ? Object.values(sectors?.[locality]) : []}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-3">
        <Select
          name="block"
          label="Select block"
          options={
            sector && locality ? sectors?.[locality]?.[sector]?.blocks : []
          }
        />

        <Input
          name="plot"
          label="Plot no."
          placeholder="Type in the plot no."
        />
      </div>
    </div>
  );
}
