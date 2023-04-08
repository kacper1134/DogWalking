import { Box } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

type TextEditorProps = {
  initialValue?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content?: string;
  padding?: string;
  fontSize: string;
};

const TextEditor = ({
  initialValue,
  padding,
  setContent,
  content,
  fontSize,
}: TextEditorProps) => {
  const editorRef = useRef<any>(null);

  return (
    <Box w="100%" px={padding}>
      <Editor
        apiKey="2ee56e9oiyjbmqzp7wz21w7x64dta3hy0d9ibg7mtpyru6ar"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        value={content}
        onEditorChange={(content) => {
          setContent(content);
        }}
        
        init={{
          menubar: false,
          plugins: ["image", "media", "wordcount", "fullscreen", "autoresize"],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic | alignleft aligncenter " +
            "alignright alignjustify |" +
            "removeformat",
          content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size: ${fontSize};}`
        }}
      />
    </Box>
  );
};

export default TextEditor;
