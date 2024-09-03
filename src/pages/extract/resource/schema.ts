import * as yup from "yup";

import { Locality } from "@/pages/locality/resource/schema";
import { Sector } from "@/pages/sector/resource/schema";


export type FormProps = {
  title: string;
  initialData: Extract | null
}


export type Extract = {
  id?: string;
  firstname: string;
  lastname: string;
  landuse: string;
  locality_id: Locality;
  sector_id: Sector;
  locality: Locality;
  sector: Sector;
  plot_number: string;
  block: string;
  phone_number: string;
  registration_date: Date;
  allocation_date: Date;
}

export const ExtractValidation = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  phone_number: yup.string().required(),
  landuse: yup.array().required(),
  locality_id: yup.string().uuid().required(),
  sector_id: yup.string().uuid().required(),
  block: yup.string().required(),
  plot_number: yup.string().required(),
  allocation_date: yup.date().required(),
  registration_date: yup.date().required(),
});