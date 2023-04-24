import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/Skeletons/Card/Card";
import { UserBrief } from "../../../components/UserBrief/UserBrief";
import AuthContext from "../../../context/AuthContext";

import { getCurrentUserFolloweds } from "../../../services/FollowService";

export const FollowedsList = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setloading] = useState(true);

  const [currentUserFolloweds, setCurrentUserFolloweds] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    getCurrentUserFolloweds()
      .then((followeds) => {
        setCurrentUserFolloweds(followeds);
        setloading(false);
      })
      .catch((err) => console.error(err));
  }, [currentUser]);
  return (
    <div className="min-vh-100 position-realtive d-flex flex-column justify-content-start align-items-center">
      <h1>Followeds</h1>
      {!loading ? (
        currentUserFolloweds.length > 0 ? (
          <div>
            {currentUserFolloweds.map((followed) => (
              <UserBrief
                user={followed.followed}
                img={followed.followed.image}
                key={followed.followed.id}
                text="View Profile"
                onClick={() => navigate(`/profile/${followed.followed.id}`)}
              />
            ))}
          </div>
        ) : (
          "No followeds yet"
        )
      ) : (
        <div style={{ width: "100vw" }}>
          <Card />
        </div>
      )}
    </div>
  );
};
