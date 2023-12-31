import { createRoutesFromElements, Route } from 'react-router-dom'

import LandingPage from './components/LandingPage'
import App from './components/App'
import Home from './components/Home'
import GroupList from './components/AllGroups'
import AllProfiles from './components/AllProfiles'
import SignUp from './components/SignUp'
import CompleteProfile from './components/CompleteProfile'

export const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* Replace the element with your React Component */}
      <Route path="post">
        <Route index element={<div>AddPost</div>} />
        <Route path=":id" element={<div>Post</div>} />
      </Route>
      <Route path="register" element={<div>Register</div>} />
      <Route path="profiles">
        <Route index element={<AllProfiles />} />
        <Route path=":username" element={<div>Profile</div>} />
      </Route>
      <Route path="groups">
        <Route index element={<GroupList />} />
        <Route path="add" element={<div>GroupProfileForm</div>} />
        <Route path=":id" element={<div>Group</div>} />
      </Route>
    </Route>
    <Route path="/complete-profile" element={<CompleteProfile />} />
    <Route path="/login" element={<LandingPage />} />
    <Route path="/signup" element={<SignUp />} />
  </>
)
