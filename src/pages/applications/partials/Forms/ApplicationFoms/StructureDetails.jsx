import { CheckboxItems } from '@/components/FormComponents/Checkbox';
import { Input } from '@/components/FormComponents/Input'
import { SwitchComponent } from '@/components/FormComponents/Switch';
import { SelectField } from '@/components/SelectField';
import { useFormContext } from 'react-hook-form';

export default function StructureDetails() {
  const {watch} = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-3">
        <SelectField
          name="type"
          label="Select building type"
          options={[
            {
              label: "Single storey",
              value: "single",
            },
            {
              label: "Multi storey.",
              value: "multi",
            },
          ]}
        />

        {watch("type") === "multi" && (
          <Input
            name="height"
            type="number"
            label="Height"
            placeholder="Enter building height"
          />
        )}
      </div>

      <div className="">
        <label className="text-xs font-medium text-slate-400 mb-2 inline-block">
          Check all land uses
        </label>
        <div className="grid grid-cols-3 gap-3">
          <CheckboxItems
            name="use"
            options={[
              {
                label: "Residential",
                value: "residential",
              },
              {
                label: "Commercial",
                value: "commercial",
              },
              {
                label: "Civic & Culture",
                value: "civic_&_culture",
              },
              {
                label: "Education",
                value: "education",
              },
              {
                label: "Industrial",
                value: "industrial",
              },
              {
                label: "Open space",
                value: "open_space",
              },
            ]}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-3">
        <Input
          name="shelf"
          label="Shelf no."
          placeholder="Enter shelf number"
        />

        <div className="">
          <label className="text-xs font-medium text-slate-400 mb-3 inline-block">
            Property state
          </label>
          <SwitchComponent
            name="existing"
            label="Does property already exist?"
          />
        </div>
      </div>
    </div>
  );
}
