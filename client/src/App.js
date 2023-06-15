import {Route, Switch} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PasswordRecovery from "./components/auth/PasswordRecovery";
import PasswordUpdate from "./components/auth/PasswordUpdate";
import Profile from "./components/user/Profile";
import Friends from "./components/user/Friends";
import Comments from "./components/user/Comments";
import Submissions from "./components/user/Submissions";
import Contests from "./components/user/Contests";
import Home from "./components/user/Home";
import Settings from "./components/user/Settings";
import Message from "./components/user/Message";
import Talks from "./components/user/Talks";
import Favourites from "./components/user/Favourites";
import ProblemPost from "./components/problem/ProblemPost";
import ProblemPut from "./components/problem/ProblemPut";
import ProblemGet from "./components/problem/ProblemGet";
import Problemset from "./components/problem/Problemset";
import AddContest from "./components/contest/AddContest";
import Announcement from "./components/contest/Announcement";
import AddProblem from "./components/contest/AddProblem";
import PostContest from "./components/contest/PostContest";
import ContestPut from "./components/contest/ContestPut";
import Standings from "./components/contest/Standings";
import AddEditorial from "./components/contest/AddEditorial";
import AddAnnouncement from "./components/contest/AddAnnouncement";
import CommentPost from "./components/contest/CommentPost";
import Arena from "./components/contest/Arena";
import Navbar from "./components/Navbar";
import {v4 as uuid} from "uuid";

function App() {
  return (
    <div>
      <Navbar key={uuid()}/>
      <Switch>
        <Route exact path='/login' key={uuid()} component={Login} />;
        <Route exact path='/register' key={uuid()} component={Register} />;
        <Route exact path='/friends' key={uuid()} component={Friends} />;
        <Route exact path='/allContests' key={uuid()} component={Contests} />;
        <Route exact path='/settings' key={uuid()} component={Settings} />;
        <Route exact path='/talks' key={uuid()} component={Talks} />;
        <Route exact path='/' key={uuid()} component={Home} />;
        <Route exact path='/favourites' key={uuid()} component={Favourites} />;
        <Route exact path='/passwordRecovery' key={uuid()} component={PasswordRecovery} />;
        <Route exact path='/contest' key={uuid()} component={PostContest} />;
        <Route exact path='/contest/:contestID/edit' key={uuid()} component={ContestPut} />;
        <Route exact path='/contests/organiser' key={uuid()} component={AddContest} />;
        <Route exact path='/contest/:contestID' key={uuid()} component={AddProblem} />;
        <Route exact path='/updatePassword/:userId/:accessToken' key={uuid()} component={PasswordUpdate} />;
        <Route exact path='/profile/:username' key={uuid()} component={Profile} />;
        <Route exact path='/submissions/:username' key={uuid()} component={Submissions} />;
        <Route exact path='/comments/:username' key={uuid()} component={Comments} />;
        <Route exact path='/message/:username' key={uuid()} component={Message} />;
        <Route exact path='/contest/:contestID/problem' key={uuid()} component={ProblemPost} />;
        <Route exact path='/contest/:contestID/standings' key={uuid()} component={Standings} />;
        <Route exact path='/problem/:problemID' key={uuid()} component={ProblemGet} />;
        <Route exact path='/contest/:contestID/editorial' key={uuid()} component={AddEditorial} />;
        <Route exact path='/contest/:contestID/announcement' key={uuid()} component={AddAnnouncement} />;
        <Route exact path='/contest/:contestID/comment' key={uuid()} component={CommentPost} />;
        <Route exact path='/contest/:contestID/enter' key={uuid()} component={Arena} />;
        <Route exact path='/contest/:contestID/announcement/get' key={uuid()} component={Announcement} />;
        <Route exact path='/problem/:problemID/edit' key={uuid()} component={ProblemPut} />;
        <Route exact path='/problems' key={uuid()} component={Problemset} />;
        {/* <Route path='/' render={()=>(<div>Jello</div>)} />; */}
      </Switch>
    </div>
  );
}

export default App;
