import "./App.css";
import CodeEditor from "./CodeEditor";
import UploadCode from "./UploadCode";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

function App() {
  return (
    <>
      <Container className="pt-3">
        <Jumbotron>
          <h1 className="header">Welcome to Code-Viz!</h1>
        </Jumbotron>
        <div className="text-center">
          <UploadCode />
        </div>
      </Container>
    </>
  );
}

export default App;
