import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/Skeletons/Card/Card";
import { UserBrief } from "../../../components/UserBrief/UserBrief";
import AuthContext from "../../../context/AuthContext";

import { getCurrentUserFollowers } from "../../../services/FollowService";

export const FollowersList = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setloading] = useState(true);

  const [currentUserFollowers, setCurrentUserFollowers] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    getCurrentUserFollowers()
      .then((followers) => {
        setCurrentUserFollowers(followers);
        setloading(false);
      })
      .catch((err) => console.error(err));
  }, [currentUser]);
  return (
    <div className="min-vh-100 position-realtive d-flex flex-column justify-content-start align-items-center">
      <h1>Followers</h1>
      {!loading ? (
        currentUserFollowers.length > 0 ? (
          <div>
            {currentUserFollowers.map((follower) => (
              <UserBrief
                key={follower._id}
                img={follower.follower.image}
                user={follower.follower}
                text="View Profile"
                onClick={() => navigate(`/profile/${follower.follower.id}`)}
              />
            ))}
          </div>
        ) : (
          "No followers yet"
        )
      ) : (
        <div style={{ width: "100vw" }}>
          <Card />
        </div>
      )}
    </div>
  );
};
