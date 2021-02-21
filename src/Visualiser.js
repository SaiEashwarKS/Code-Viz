import Iframe from "react-iframe";
import Container from "react-bootstrap/Container";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

let markers = [];

//marker to highlight 7th line
markers.push({
  startRow: 6,
  endRow: 7,
  className: "highlight_lines",
  type: "text",
});

let content = `#include<stdio.h>
int main()
{
	int x = 10;
	int *p;
	p = &x;
	return 0;
}`;

const Visualiser = () => {
  return (
    <>
      <Container fluid style={{ height: "900px" }}>
        <div className="row" style={{ height: "100%" }}>
          <div className="col-12 col-sm-6" style={{ height: "100%" }}>
            <AceEditor
              mode="c_cpp"
              theme="xcode"
              name="fileContentEditor"
              value={content}
              markers={markers}
              readOnly={true}
              cursorStart={3}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              width="100%"
              height="100%"
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
              }}
            />
          </div>
          <div className="col-12 col-sm-6" style={{ height: "100%" }}>
            <Iframe src="../example.html" width="100%" height="100%"></Iframe>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Visualiser;
