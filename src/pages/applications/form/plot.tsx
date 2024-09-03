import Input from "@/components/form-components/input";
import { Select } from "@/components/form-components/select";
import usePlotDetails from "@/hooks/use-plot-details";



export default function PlotDetails() {
  const { localities, sectors, blocks } = usePlotDetails()

  return (
    <>
      <Select
        name="locality_id"
        label="Locality"
        placeholder="Select locality"
        options={localities}
      />

      <Select
        name="sector_id"
        label="Sector"
        placeholder="Select sector"
        options={sectors}
      />

      <Select
        name="block"
        label="Block"
        placeholder="Select block"
        options={blocks}
      />

      <Input name="plot_number" label="Plot no." placeholder="Type in the plot no." />
    </>
  );
}
