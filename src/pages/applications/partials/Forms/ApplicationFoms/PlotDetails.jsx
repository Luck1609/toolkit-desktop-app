import { Input } from "@/components/FormComponents/Input";
import { SelectField } from "@/components/SelectField";


export default function PlotDetails() {
  return (
    <>
      <SelectField
        name="locality_id"
        label="Select locality"
        options={[]}
      />

      <SelectField
        name="sector_id"
        label="Select sector"
        options={[]}
      />

      <SelectField
        name="block"
        label="Select block"
        options={[]}
      />

      <Input name="plot" label="Plot no." placeholder="Type in the plot no." />
    </>
  );
}
