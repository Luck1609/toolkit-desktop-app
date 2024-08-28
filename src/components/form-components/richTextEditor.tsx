

import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFormContext } from "react-hook-form";
import { Editor as TinyMCEditor } from "tinymce";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import "@/styles/tinymce_styles.css"

const editorPlugins: string[] = [
  "advlist",
  "autolink",
  "lists",
  "link",
  "image",
  "charmap",
  "preview",
  "anchor",
  "searchreplace",
  "visualblocks",
  "code",
  "fullscreen",
  "insertdatetime",
  "media",
  "table",
  "code",
  "help",
  "wordcount",
], editorToolbar = "undo redo | blocks | " +
  "bold italic forecolor | alignleft aligncenter " +
  "alignright alignjustify | bullist numlist outdent indent | " +
  "removeformat | help";

export function RichTextEditor({
  name,
  label,
  plugins = editorPlugins,
  toolbar = editorToolbar,
  className = "",
  menubar = false
}: {
  name: string;
  label: string;
  plugins?: string[];
  toolbar?: string;
  className?: string
  menubar?: boolean
}) {
  const editorRef = useRef<TinyMCEditor | null>(null),
    { control } = useFormContext();
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>

          <div className="editor-container">
            <Editor
              tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={value}
              init={{
                height: 500,
                menubar,
                plugins,
                toolbar,
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
