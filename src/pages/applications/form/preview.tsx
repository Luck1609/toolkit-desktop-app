import { useFormContext } from "react-hook-form";
import { CircleCheckBig, CircleX } from "lucide-react";
import { Fragment, ReactNode } from "react";

export const landUse = {
  residential: { color: "border-[brown] bg-[brown]", value: "Residential" },
  commercial: { color: "border-blue-600 bg-blue-600", value: "Commercial" },
  "civic_&_culture": {
    color: "border-red-500 bg-red-500",
    value: "Civic & Culture",
  },
  industrial: { color: "border-violet-500 bg-violet-500", value: "Industrial" },
  open_space: { color: "border-lime-500 bg-lime-500", value: "Open space" },
  education: {
    color: "bg-yellow-200 border-2 border-red-500",
    value: "Education",
  },
};

export default function Preview() {
  // console.log("locality info => ", localities, "sector info =>", sectors);

  const { watch } = useFormContext(),
    locality = localities.filter(
      ({ value }) => value === watch("locality_id")
    )[0].label,
    sector = sectors[watch("locality_id")][watch("sector_id")],
    block = sector.blocks.filter(({ label }) => label === watch("block"))[0]
      .label,
    uses = watch("use");

  console.log("sector infor preview", watch());

  const landUses = uses.reduce(
    (uses: string[], use) => [
      ...uses,
      {
        label: (
          <div className="flex items-center space-x-2">
            <span className={`border ${landUse[use]?.color} h-4 w-4`}></span>
            <span className="">{landUse[use]?.value}</span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="bg-input py-1.5 px-3 rounded">
        <label className="text-sm mb-1 inline-block">Full name</label>
        <div className="">
          {`${watch("title")} ${watch("firstname")} ${watch("lastname")}`}
        </div>
      </div>

      <div className="bg-input py-1.5 px-3 rounded">
        <label className="text-sm mb-1 inline-block">Phone no.</label>
        <div className="">{watch("contact")}</div>
      </div>

      <div className="bg-input py-1.5 px-3 rounded lg:col-span-2">
        <label className="text-sm mb-1 inline-block">Plot details</label>
        <div className="">{`${locality}, ${sector.label
          }, ${block}, Plot no. ${watch("plot")}`}</div>
      </div>
      <div className="bg-input py-1.5 px-3 rounded lg:col-span-2">
        <label className="text-sm mb-1 inline-block">Land use</label>
        <div className="grid grid-cols-3 gap-2">
          {landUses.map(({ label }: {label: ReactNode}, index: number) => (
            <Fragment key={index.toString()}>{label}</Fragment>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 grid lg:grid-cols-4 gap-2">
        <div className="bg-input py-1.5 px-3 rounded">
          <label className="text-sm mb-1 inline-block">Type</label>
          <div className="capitalize">{watch("type")}</div>
        </div>

        <div className="bg-input py-1.5 px-3 rounded">
          <label className="text-sm mb-1 inline-block">Height</label>
          <div className="">{watch("height")}</div>
        </div>

        <div className="bg-input py-1.5 px-3 rounded">
          <label className="text-sm mb-1 inline-block">Shelf no.</label>
          <div className="">{`${watch("shelf") ?? "N/A"}`}</div>
        </div>

        <div className="bg-input py-1.5 px-3 rounded">
          <label className="text-sm mb-1 inline-block">Already exist</label>
          <div className="">
            {watch("existing") ? <span>Yes</span> : <span>No</span>}
          </div>
        </div>
      </div>

      <div className="bg-input py-1.5 px-3 rounded lg:col-span-2 ">
        <label className="text-sm mb-1 inline-block">Scanned documents</label>

        <div className="grid grid-cols-2 gap-4">
          {watch("epa_cert").length > 0 ? (
            <div className="flex items-center space-x-2">
              <CircleCheckBig className="text-green-500" size={18} />
              <span className="">EPA certified</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <CircleX className="text-red-500" size={18} />
              <span className="">EPA certificate N/A</span>
            </div>
          )}
          {watch("fire_cert").length > 0 ? (
            <div className="flex items-center space-x-2">
              <CircleCheckBig className="text-green-500" size={18} />
              <span className="">GNFS certified</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <CircleX className="text-red-500" size={18} />
              <span className="">GNFS certificate N/A</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
