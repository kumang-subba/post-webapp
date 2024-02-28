import { FC } from "react";
import Output from "editorjs-react-renderer";

interface EditorOutputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      style={style}
      className="text-sm"
      renderers={renderers}
      data={content}
    />
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <img alt="image" className="object-contain" src={src} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="bg-gray-800 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
}
export default EditorOutput;
