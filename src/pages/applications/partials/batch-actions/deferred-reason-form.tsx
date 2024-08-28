import { X } from "lucide-react";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validation = yup.object().shape({
  comment: yup.string().required()
})

export default function DeferredReasonForm({ updateComment, close }) {
  const method = useForm({ resolver: yupResolver(validation) }), {handleSubmit, formState: {isDirty, isValid}} = method;

  const submit = ({comment}) => updateComment(comment)

  return (
    <FormProvider {...method}>
      <div className="fixed -left-5 top-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center z-20">
        <form className="max-w-xl w-full p-5 rounded bg-default relative" onSubmit={handleSubmit(submit)}>
          <label className="block pb-3 mb-4 border-b border-input font-semibold text-center">Reason for defer</label>
          <Button className="absolute top-3 right-3" onClick={close}>
            <X size={18} />
          </Button>

          <Textarea
            name="comment"
            label="Reason"
            placeholder="Reason(s) for declining"
          />

          <div className="flex justify-end mt-4">
            <Button variant="success" type="submit" disabled={!isValid || !isDirty}>Submit</Button>
          </div>
        </form>
      </div>
    </FormProvider>

  );
}
