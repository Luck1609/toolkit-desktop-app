import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Save } from "lucide-react";
import useSWR from "swr";
import dayjs from "dayjs";
import useAPI from "@/hooks/useAPI";
import { Button } from "@/components/ui/button";
import logo from "@/assets/img/coa.png"
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "@/components/form-components/richTextEditor";

export default function MinutesForm() {
  const [content, setContent] = useState(),
    {
      state: { panel, id },
    } = useLocation(),
    { data: meeting } = useSWR(`/${panel}/${id}`),
    { data: applications } = useSWR("/app-stats"),
    methods = useForm(),
    { makeRequest } = useAPI();

  const { handleSubmit, reset, watch } = methods;

  useEffect(() => {
    if (meeting?.data && applications?.data) {
      const minutes = contents({ meeting: meeting?.data, panel, applications: applications?.data ?? {} });
      console.log("app data", minutes)
      setContent(minutes);
    }
  }, [meeting, panel, applications]);

  useEffect(() => {
    reset({
      minute_status: Boolean(meeting?.data.minute_status) ?? false,
      minutes: meeting?.data.minutes ?? content,
    });
  }, [reset, meeting, content]);



  const submit = (payload) => {
    console.log("Payload", payload);
    makeRequest({
      method: "patch",
      url: `${panel}/${id}/update-minute`,
      payload,
      muation: `${panel}/${id}/update-minute`,
    });
  };

  console.log("data url", meeting);

  return (
    <FormProvider {...methods}>
      <form
        className="w-11/12 mx-auto bg-white dark:bg-default p-5 rounded-md shadow-custom"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex items-center">
          <h2 className="text-2xl grow font-bold my-10 relative w-full">
            Create Minutes
          </h2>

          <div className="flex items-center w-2/4">
            <Checkbox
              name="minute_status"
              // label="Mark as completed"
              className="ml-2"

            />
          </div>
          <Button className="" variant="success">
            <Save size={18} className="mr-1" />
            <span className="flex items-center">Save</span>
          </Button>
        </div>

        <RichTextEditor name="minutes" />
      </form>
    </FormProvider>
  );
}

var contents = ({
  meeting,
  panel,
  applications: { total, recommended, approved, deferred },
}) => `<div style="padding:20px;">
    <h1 className="font-bold text-center text-3xl" style="font-size:24px;text-align:center;">SUNYANI MUNICIPAL ASSEMBLY</h1>
        <h2 className="font-bold text-center text-2xl mb-5" style="font-size:20px;text-align:center;">PHYSICAL PLANNING DEPARTMENT</h2>

        <div className="flex w-1/5 mx-auto justify-center" style="dixplay:flex;width:230px;margin: 0 auto 5pc auto;">
          <img src="${logo}" alt="Office logo" style="width:100px;" className="h-20 w-20 mr-8" />
          <img src="${logo}" alt="Ghana National Coat of Arms" style="width:100px;" className="h-20 w-20" />
        </div>


    <h1 style="font-size:20px;text-align:center;padding:20px 0;font-weight:bold;">
      MINUTES OF THE ${panel === "tsc"
    ? "TECHNICAL SUB-COMMITTEE MEETING "
    : "SPATIAL PLANNING COMMITTEE MEETING "
  } 
      OF (${meeting?.office?.initials.toUpperCase()}) HELD ON THE ${dayjs(meeting?.date).format("D MMMM, YYYY").toUpperCase()} 
      AT THE ${meeting?.venue.toUpperCase()}
    </h1>

    <p>MEMBERS PRESENT:</p>

    <table style="border-collapse:collapse;width: 90%;margin:0 auto;" border="1">
      <thead>
        <tr>
          <th style="width: 5%;padding:8px;">S/N</th>
          <th style="width: 35%;padding:8px;">Name</th>
          <th style="width: 20%;padding:8px;">Role</th>
          <th style="width: 40%;padding:8px;">Designation</th>
        </tr>
      </thead>
      <tbody>
        ${table(meeting?.participants)}
      </tbody>
    </table>


    <h3 style="margin-top:3pc;text-decoration:underline;">OPENING PRAYER</h3>
    <p>
      The meeting took off at exactly ${dayjs(meeting?.date).format(
    "h:mma"
  )} with an opening prayer from the secretary <span style="background:red;padding:8px;color:white;">Name of participant</span>.
    </p>

    <h3 style="margin-top:3pc;text-decoration:underline;">WELCOME ADDRESS</h3>
    <p>
      <span style="background:red;padding:8px;color:white;">Welcome address goes here</span>.
    </p>

    <h3 style="margin-top:3pc;text-decoration:underline;">READING AND ACCEPTANCE OF PREVIOUS MINUTES</h3>
    <p>
      Minutes of the last meeting was read and accordingly amended and accepted as true reflection of the previous meeting.
    </p>

    <h3 style="margin-top:3pc;text-decoration:underline;">VETTING OF DEVELOPMENT APPLICATIONS</h3>
    <p>
      A total of (${total}) development applications were received for the session. Out of this total applications, ${recommended - deferred?.length
  } were recommended by the Technical Sub-Committee(TSC) 
      for approval by the Spatial Planning Committee(SPC). ${panel === "spc" ? `${approved} of the applications was approved by the SPC.` : ""} ${deferred?.length
  } application${deferred?.length > 1 ? "s" : ""
  } was deferred. Details of the deferred  application${deferred?.length > 1 ? "s" : ""
  } was as follows:

      ${deferred?.length > 0
    ? `
          <table style="border-collapse:collapse;width: 100%;margin:0 auto;" border="1">
            <thead>
              <tr>
                <th style="width: 5%;padding:8px;">S/N</th>
                <th style="width: 25%;padding:8px;">Name</th>
                <th style="width: 10%;padding:8px;">Application num.</th>
                <th style="width: 25%;padding:8px;">Plot details</th>
                <th style="width: 35%;padding:8px;">Comments</th>
              </tr>
            </thead>
            <tbody>
              ${renderDeclinedApps(deferred)}
            </tbody>
          </table>
        `
    : null
  }
    </p>
    
    <h3 style="margin-top:3pc;text-decoration:underline;">OTHER MATTERS</h3>
    <p>
      <span style="background:red;padding:8px;color:white;">Other matters goes here</span>.
    </p>
    
    <h3 style="margin-top:3pc;text-decoration:underline;">CHAIRMAN&apos;S CLOSING REMARKS</h3>
    <p>
      <span style="background:red;padding:8px;color:white;">Closing remarks goes here</span>.
    </p>
    
    <h3 style="margin-top:3pc;text-decoration:underline;">CLOSING</h3>
    <p>
      The meeting came to a close at exactly <span style="background:red;padding:8px;color:white;">Closing time here</span> with <span style="background:red;padding:8px;color:white;">Closing prayer said by goes here</span> giving the prayer.
    </p>

    <div style="display:flex;width:100%;margin-top:40px;justify-content:space-between;">
      ${getInfo(meeting?.participants, "Secretary")}
      
      ${getInfo(meeting?.participants, "Chairperson")}
    </div>
  </div>`;

var counter = 1;

var table = (members) =>
  JSON.parse(members).map(
    ({ firstname, lastname, role, designation }) => `<tr>
      <td style="width: 5%;padding:8px;text-align:center;">${counter++}</td>
      <td style="width: 35%;padding:8px;">${firstname} ${lastname}</td>
      <td style="width: 20%;padding:8px;text-align:center;">${role}</td>
      <td style="width: 40%;padding:8px;text-align:center;">${designation}</td>
    </tr>`
  );

var getInfo = (members, param) => {
  if (members) {
    const { title, lastname, firstname, name } = JSON.parse(members).filter((participant) => participant.role === param)?.[0] ?? { name: "Not available" };
    return (
      `<div style="flex-basis:30%;text-align:center;">
        <div style="width:100%;border-bottom:1px dashed gray;margin-bottom:8px;"></div>
        <label style="display:block">
          ${name ?? `${title} ${lastname} ${firstname}`}
        </label>
        <label style="display:block">
          (${param})
        </label>
      </div>`
    );
  }

  return `<div style="flex-basis:30%;text-align:center;">
      <div style="width:100%;border-bottom:1px dashed gray;margin-bottom:8px;">Not available</div>
      <label style="display:block">
        Not available
      </label>
      <label style="display:block">(${param})</label>
    </div>`;
}


var renderDeclinedApps = (deferred) =>
  deferred.map(
    ({ title, firstname, lastname, application_num, locality, sector, plot, block }, index) =>
      `
      <tr>
        <td style="width: 5%;padding:8px;">${index + 1}</td>
        <td style="width: 25%;padding:8px;">${title} ${firstname} ${lastname}</td>
        <td style="width: 10%;padding:8px;">${application_num}</td>
        <td style="width: 25%;padding:8px;text-align: center;">${locality.name}, ${sector.name}, ${block} ${plot}</td>
        <td style="width: 35%;padding:8px;">Comments</td>
      </tr>
    `
  );