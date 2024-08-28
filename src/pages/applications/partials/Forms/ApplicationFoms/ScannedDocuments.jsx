import { FileUploader } from "@/components/FormComponents/FileUploader";
import { Textarea } from "@/components/ui/textarea";

export default function ScannedDocuments() {
  return (
    <div className="grid lg:grid-cols-2">
      <FileUploader name="epa_cert" label="Upload EPA permit" />
      <FileUploader name="fire_cert" label="Upload Fire permit" />

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
