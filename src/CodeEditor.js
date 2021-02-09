import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("");

  const onChange = (newValue) => {
    setCode(newValue);
  };
  return (
    <>
      <div className="code-editor">
        <AceEditor
          placeholder="Enter C code or import C file"
          mode="c_cpp"
          theme="xcode"
          name="codeEditor"
          onChange={onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          width="100%"
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
        {/* <h1>{code}</h1> */}
      </div>
    </>
  );
};

export default CodeEditor;
