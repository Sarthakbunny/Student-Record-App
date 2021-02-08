import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Login from "./component/Login";
import RecordAdd from "./component/RecordAdd";
import RecordDetail from "./component/RecordDetail";
import RecordEdit from "./component/RecordEdit";
import RecordList from './component/RecordList'
import { selectUserName } from "./features/userSlice";
import { useSelector } from "react-redux";

const BuildComponent = ({admin}) => {
  if(admin !== null){
    return(
      <Switch>
        <Route exact path='/:recordId/edit' component={RecordEdit} />
        <Route exact path='/:recordId/details' component={RecordDetail} />
        <Route exact path='/add' component={RecordAdd} />
        <Route path='/home' component={RecordList} />
        <Redirect from='/' to='/home' />
      </Switch>
    )
  }
  else{
    return(
      <Login />
    )
  }
}

function App() {
  const admin = useSelector(selectUserName);
  console.log(admin);
  return (
    <div className="app">
      <div>
        <BrowserRouter>
          <Header />
          <BuildComponent admin={admin} />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
