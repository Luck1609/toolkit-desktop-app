import { UserBasicInfo } from "@/lib/global-types";
import * as yup from "yup";



export type CommitteFormValues = UserBasicInfo & {
  role: string;
  panel: string;
  designation: string;
}

export const CommitteeMemberSchema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),

  contact: yup
    .string()
    .required()
    .min(10)
    .max(13)
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, {
      message: "Format must be +233249149420 or 0249149420",
    })
    .typeError("Invalid format - must be +233249149420 or 0249149420"),

  email: yup
    .string()
    .email("Invalid email format")
    .notRequired(),
    // .required(),

  title: yup
    .string()
    .required()
    .oneOf(
      ["Dr.", "Eng.", "Mr.", "Mrs.", "Ms."],
      "Role must be one of ['Dr.', 'Eng.', 'Mr.', 'Mrs', 'Ms.']"
    ),

  role: yup
    .string()
    .required()
    .oneOf(
      ["Chairperson", "Secretary", "Member", "Other"],
      "Role must be one of ['Chairperson', 'Secretary', 'Member', 'Other']"
    ),

  panel: yup
    .string()
    .required()
    .oneOf(["TSC", "SPC"], "Panel must be one of ['TSC', 'SPC']"),

  designation: yup.string().required(),
});
