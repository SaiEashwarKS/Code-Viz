import Iframe from "react-iframe";
import Container from "react-bootstrap/Container";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

const Visualiser = () => {
  return (
    <>
      <Iframe src="../LL.html" width="100%" height="800px"></Iframe>
    </>
  );
};

export default Visualiser;
