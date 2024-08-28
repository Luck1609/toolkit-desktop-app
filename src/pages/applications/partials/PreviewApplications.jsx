import { Fragment } from "react";
import useSWR from "swr";
import { CircleCheckBig, CircleX } from "lucide-react";
import Loader from "@/components/Loader";
import { landUse } from "./Forms/ApplicationFoms/Preview";



export default function PreviewApplications({ data: { id } }) {
  const { data, isLoading } = useSWR(`/application/${id}`);

  const application = data?.data ?? {};

  const landUses = application?.use ? JSON.parse(application.use).reduce(
    (uses, use) => [
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
  ) : [];

  return isLoading ? (
    <Loader />
  ) : (
    <div className="grid lg:grid-cols-3 gap-4 gap-y-6">
      <div className="bg-input py-1.5 px-3 rounded">
        <label className="text-sm mb-1 inline-block">Full name</label>
        <div className="">
          {`${application?.title} ${application?.firstname} ${application?.lastname}`}
        </div>
      </div>

      <div className="bg-input py-1.5 px-3 rounded">
        <label className="text-sm mb-1 inline-block">Phone no.</label>
        <div className="">{application?.contact}</div>
      </div>

      <div className="bg-input py-1.5 px-3 rounded">
        <label className="text-sm mb-1 inline-block">Application no.</label>
        <div className="">{application?.application_num}</div>
      </div>

      <div className="lg:col-span-3 grid lg:grid-cols-5 gap-4">
        <div className="bg-input py-1.5 px-3 rounded lg:col-span-2">
          <label className="text-sm mb-1 inline-block">Plot details</label>
          <div className="">{`${application?.locality?.name}, ${application?.sector?.name}, ${application?.block}, Plot no. ${application?.plot}`}</div>
        </div>
        <div className="bg-input py-1.5 px-3 rounded lg:col-span-3">
          <label className="text-sm mb-1 inline-block">Land use</label>
          <div className="grid grid-cols-3 gap-2">
            {landUses.map(({ label }, index) => (
              <Fragment key={index.toString()}>{label}</Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 grid lg:grid-cols-4 gap-2">
        <div className="bg-input py-1.5 px-3 rounded">
          <label className="text-sm mb-1 inline-block">Type</label>
          <div className="capitalize">{application?.type}</div>
        </div>

        <div className="bg-input py-1.5 px-3 rounded">
          <label className="text-sm mb-1 inline-block">Height</label>
          <div className="">{application?.height}</div>
        </div>

        <div className="bg-input py-1.5 px-3 rounded">
          <label className="text-sm mb-1 inline-block">Shelf no.</label>
          <div className="">{`${application?.shelf ?? "N/A"}`}</div>
        </div>

        <div className="bg-input py-1.5 px-3 rounded">
          <label className="text-sm mb-1 inline-block">Already exist</label>
          <div className="">
            {application?.existing ? <span>Yes</span> : <span>No</span>}
          </div>
        </div>
      </div>

      <div className="bg-input py-1.5 px-3 rounded">
        <label className="text-sm mb-1 inline-block">Dev. permit no.</label>
        <div className="">{application?.dev_permit_num ?? "N/A"}</div>
      </div>

      <div className="bg-input py-1.5 px-3 rounded lg:col-span-2 ">
        <label className="text-sm mb-1 inline-block">Scanned documents</label>

        <div className="grid grid-cols-2 gap-4">
          {application?.epa_cert?.length > 0 ? (
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
          {application?.fire_cert?.length > 0 ? (
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
