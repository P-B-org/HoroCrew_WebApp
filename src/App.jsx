import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./views/misc/Login/Login";
import { Home } from "./views/misc/Home/Home";
import { Navbar } from "./components/Misc/Navbar/Navbar";
import FormSignUp from "./views/misc/Signup/Signup";
import { SocialFeed } from "./views/Feeds/SocialFeed/SocialFeed";
import AstroFeed from "./views/Feeds/AstroFeed/AstrologicalFeed";
import ProtectedRoute from "./components/Misc/ProtectedRoute/ProtectedRoute";
import { Profile } from "./views/Users/Profile/Profile";
import { FormBg } from "./components/Backgrounds/BackgroudForms/BackgroundForm";
import { FollowersList } from "./views/Users/FollowersList/FollowersList";
import { OthersProfile } from "./views/Users/OthersProfile/OthersProfile";
import { Notifications } from "./views/Users/Notifications/Notifications";
import { NewPost } from "./views/Post/NewPost";
import { FollowedsList } from "./views/Users/FollowedsList/FollowedsList";


import { EditProfile } from "./components/Edit/EditProfile/EditProfile";

import { MessageSection } from "./components/MessageSection/MessageSection";
import { PostWithComments } from "./views/Post/PostWithComments";

function App() {
  const routesWithoutNav = ["/", "/signup", "/login"];
  const location = useLocation();

  return (
    <div className="App">
      {!routesWithoutNav.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* MISC */}
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <>
              <FormBg />
              <FormSignUp />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <FormBg />
              <Login />
            </>
          }
        />


        {/* PROFILES */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/followers"
          element={
            <ProtectedRoute>
              <FollowersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/followeds"
          element={
            <ProtectedRoute>
              <FollowedsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <OthersProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* FEEDS AND POSTS */}
        <Route
          path="/socialfeed"
          element={
            <ProtectedRoute>
              <SocialFeed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/astrofeed"
          element={
            <ProtectedRoute>
              <AstroFeed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/new-post"
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="post/:id"
          element={
            <ProtectedRoute>
              <PostWithComments />
            </ProtectedRoute>
          }
        />

        {/* MESSAGES */}
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <MessageSection />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
