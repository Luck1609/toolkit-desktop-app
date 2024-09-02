import * as yup from "yup";

export const LetterValidation = yup.object().shape({
  date: yup.date().required(),
  reference: yup.string().required(),
  to: yup.string().required(),
  status: yup.string().required().oneOf(['Outgoing', 'Incoming']),
  scanned_copy: yup.mixed().notRequired()
});
