import * as yup from "yup";



export type FormProps = {
  title: string;
  initialData: Sector | null
}

export type Sector = {
  id?: string;
  initials: string;
  name: string;
  blocks: string;
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
