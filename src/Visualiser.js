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
      <Iframe src="../LL.html" width="100%" height="800px"></Iframe>
    </>
  );
};

export default Visualiser;
