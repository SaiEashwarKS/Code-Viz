import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import UploadCode from "./UploadCode";
import Visualiser from "./Visualiser";

const code = `#include<stdio.h>
#include<stdlib.h>

int g=0;

struct node
{
    struct node* left;
    int data;
    struct node* right;

};

struct node* createnode(int data)
{
    struct node* temp=malloc(sizeof(struct node));
    temp->left=NULL;
    temp->right=NULL;
    temp->data=data;
    return temp;
}


int main()
{
    struct node* head=createnode(50);
    head->left=createnode(25);
    head->right=createnode(75);
    head->left->left=createnode(10);
    head->left->right=createnode(40);
}`;

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="text-center">
              <UploadCode />
            </div>
          </Route>
          <Route path="/visualise">
            <Visualiser code={code} mode={"c_cpp"} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
