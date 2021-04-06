import Iframe from "react-iframe";
import Container from "react-bootstrap/Container";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

let content = `
#include<stdio.h>
#include<stdlib.h>

int g;

typedef struct example2
{
	int a;
	int b[5];
}example2;

typedef struct example1
{
	int a;
	struct example2 b;
}example1;

int main()
{
	int x = 10;
	int y = 20;
	int *z=&x;
	z=&y;

}

`;

const Visualiser = () => {
  return (
    <>
      {/* <Container fluid style={{ height: "900px" }}>
        <div className="row" style={{ height: "100%" }}>
          <div className="col-12 col-sm-6" style={{ height: "100%" }}>
            <AceEditor
              mode="c_cpp"
              theme="xcode"
              name="fileContentEditor"
              value={content}
              markers={marker.marker_info}
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
          <div className="col-12 col-sm-6" style={{ height: "100%" }}> */}
      <Iframe src="../LL.html" width="100%" height="780px"></Iframe>
      {/* </div>
        </div>
      </Container> */}
    </>
  );
};

export default Visualiser;
