import Textarea from "@/components/form-components/textarea";
import FileUploader from "@/components/form-components/uploader";


export default function ScannedDocuments() {
  return (
    <div className="grid lg:grid-cols-2">
      <FileUploader name="epa_cert" label="Upload EPA permit" type="single" dimensions="" />
      <FileUploader name="fire_cert" label="Upload Fire permit" type="single" dimensions="" />

      <div className="mt-4 lg:col-span-2">
        <Textarea
          name="description"
          label="Project description"
          placeholder="Brief description about the structure"
          className=""
        />
      </div>
    </div>
  );
}
