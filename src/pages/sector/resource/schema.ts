import * as yup from "yup";


export type Locality = {
  name: string;
  initials: string;
}

export type Sector = Locality & {
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
