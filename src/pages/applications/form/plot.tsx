import Input from "@/components/form-components/input";
import { Select } from "@/components/form-components/select";



export default function PlotDetails() {
  return (
    <>
      <Select
        name="locality_id"
        label="Select locality"
        options={[]}
      />

      <Select
        name="sector_id"
        label="Select sector"
        options={[]}
      />

      <Select
        name="block"
        label="Select block"
        options={[]}
      />

      <Input name="plot" label="Plot no." placeholder="Type in the plot no." />
    </>
  );
}
