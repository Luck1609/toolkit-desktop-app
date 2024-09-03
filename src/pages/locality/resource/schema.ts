import { Sector } from "@/pages/sector/resource/schema";
import * as yup from "yup";



export type FormProps = {
  title: string;
  initialData: Locality | null
}

export type Locality = {
  id?: string;
  name: string;
  initials: string;
  sectors?: Sector[]
  blocks?: string;
}

export const LocalityValidation = yup.object().shape({
  name: yup.string().required(),
  initials: yup.string().required()
});


export const SectorValidation = yup.object().shape({
  name: yup.string().required(),
  initials: yup.string().required(),
  blocks: yup.array().required()
});
