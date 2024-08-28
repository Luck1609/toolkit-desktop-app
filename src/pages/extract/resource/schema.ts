import * as yup from "yup";



export const ExtractValidation = yup.object().shape({
  name: yup.string().required(),
  contact: yup.string().required(),
  use: yup.array().required(),
  plot: yup.string().required(),
  allocation_date: yup.date().required(),
  registration_date: yup.date().required(),
});