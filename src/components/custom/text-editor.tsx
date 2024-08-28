import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEditor } from "tinymce";
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

export function TextEditor({
  plugins = editorPlugins,
  toolbar = editorToolbar,
  menubar = false
}: {
  plugins?: string[];
  toolbar?: string;
  menubar?: boolean
}) {
  const editorRef = useRef<TinyMCEditor | null>(null)
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  return (
    <div className="editor-container">
      <Editor
        tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar,
          plugins,
          toolbar,
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        // onEditorChange={onChange}
      />
    </div>
  );
}
