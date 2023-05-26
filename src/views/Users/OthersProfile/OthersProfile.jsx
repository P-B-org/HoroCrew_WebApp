import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../../context/AuthContext";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getUserById as getUserByIdService } from "../../../services/UserService";
import { Buttons } from "../../../components/Button/Button";
import {
  getUserFollowers,
  getUserFolloweds,
  createFollow,
} from "../../../services/FollowService";
import { getUserByIdPosts, likePost } from "../../../services/PostService";
import {
  getCurrentUserLikes,
  getUserByIdLikes,
} from "../../../services/LikeService";
import { horoscopeAstroCompatibility as horoscopeAstroCompatibilityService } from "../../../services/Apis/HoroscopeAstro";
import { Posts } from "../../../components/Posts/Posts";
import { Card, Collapse, Grid, Text, Tooltip } from "@nextui-org/react";
import { ProfileSk } from "../../../components/Skeletons/ProfileSk/ProfileSk";

export const OthersProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [userFollowers, setUserFollowers] = useState([]);
  const [userFolloweds, setUserFolloweds] = useState([]);

  const [userLikes, setUserLikes] = useState([]);
  const [showUserLikes, setShowUserLikes] = useState(false);

  const [userPosts, setUserPosts] = useState([]);
  const [showUserPosts, setShowUserPosts] = useState(false);

  const [currentUserLikes, setCurrentUserLikes] = useState([]);

  const [horoscopeAstroCompatibility, setHoroscopeAstroCompatibility] =
    useState(null);
  const [showHoroscopeAstroCompatibility, setShowHoroscopeAstroCompatibility] =
    useState(true);

  const handleFollow = () => {
    createFollow(id)
      .then((follow) => {
        return handleUserFollowers();
      })
      .catch((err) => console.error(err));
  };

  const handleCurrentUserLikes = () => {
    getCurrentUserLikes()
      .then((likes) => {
        setCurrentUserLikes(likes);
      })
      .catch((err) => console.error(err));
  };

  const handleLike = (postId) => {
    likePost(postId).then((res) => {
      return handleCurrentUserLikes();
    });
  };

  const handleUserFollowers = () => {
    getUserFollowers(id)
      .then((followers) => {
        setUserFollowers(followers);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!user) {
      getUserByIdService(id)
        .then((userId) => {
          setUser(userId);
        })
        .catch((err) => console.error(err));
    }

    if (!currentUser || !user) return;

    getUserByIdPosts(id)
      .then((posts) => {
        setUserPosts(posts);
      })
      .catch((err) => console.error(err));

    getUserByIdLikes(id)
      .then((likes) => {
        setUserLikes(likes);
      })
      .catch((err) => console.error(err));

    handleUserFollowers();

    getUserFolloweds(id)
      .then((followeds) => {
        setUserFolloweds(followeds);
      })
      .catch((err) => console.error(err));

    getCurrentUserLikes()
      .then((likes) => {
        setCurrentUserLikes(likes);
      })
      .catch((err) => console.error(err));

    horoscopeAstroCompatibilityService(
      currentUser.sunSign.name,
      user.sunSign.name
    )
      .then((response) => {
        setHoroscopeAstroCompatibility(response.data);
      })
      .catch((err) => console.error(err));
  }, [currentUser, user]);

  return (
    <div
      className="gradient-custom-2"
      style={{
        minHeight: "100vh",
      }}
    >
      {user ? (
        <div className="py-3 mx-2 h-100 w-100">
          <MDBContainer style={{
            paddingLeft: "10px",
          }}>
            <MDBRow className="h-100 w-100">
              <MDBCol>
                <MDBCard>
                  <div
                    className="rounded d-flex profilBg"
                    style={{
                      paddingBottom: "50px",
                    }}
                  >
                    <div className="mx-2 mt-5 d-flex justify-content-between align-items-center w-100 profilBg">
                      <div className="d-flex flex-wrap align-items-center">
                        <MDBCardImage
                          src={user.image}
                          alt="Generic placeholder image"
                          className="me-4 ms-1 my-2 img-thumbnail"
                          fluid
                          style={{ width: "80px" }}
                        />
                        <div>
                          <MDBCardText className="mt-2 h5 text-white">
                            {user.firstName} {user.lastName}
                          </MDBCardText>
                        </div>
                      </div>
                      <div className="mt-2 ms-5 d-flex flex-row-reverse align-items-center">
                        <Buttons
                          text={
                            userFollowers.some(
                              (follower) =>
                                follower.follower.id === currentUser.id
                            ) ? (
                              <span className="d-flex text-dark">
                                <p className="me-2 mb-0">Unfollow</p>
                                <i className="bi bi-person-fill-dash"></i>
                              </span>
                            ) : (
                              <span className="d-flex text-white">
                                <p className="me-2 mb-0">Follow</p>
                                <i className="bi bi-person-fill-add"></i>
                              </span>
                            )
                          }
                          bg={
                            userFollowers.some(
                              (follower) =>
                                follower.follower.id === currentUser.id
                            )
                              ? "transparent"
                              : "#252525"
                          }
                          onClick={handleFollow}
                        />

                        {userFollowers.some(
                          (follower) => follower.follower.id === currentUser.id
                        ) &&
                          userFolloweds.some(
                            (followed) => followed.followed.id === currentUser.id
                          ) ? (
                          <div className="me-2">
                            <Tooltip
                              content={`chat with ${user.firstName}`}
                              placement="top"
                            >
                              <i
                                onClick={() => {
                                  navigate(`/chat/${user.id}`);
                                }}
                                className="bi bi-chat-right-text-fill"
                              ></i>
                            </Tooltip>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </MDBCard>

                <div className="py-4 text-black">
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-0 h5">
                        {userPosts.length}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Posts
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-0 h5">
                        {userFollowers.length}{" "}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-0 h5">
                        {userFolloweds.length}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around text-center mb-3 py-2 border-top border-bottom">
                  <Buttons
                    text="Compatibility"
                    bg={showHoroscopeAstroCompatibility ? "#8FEBE0" : null}
                    onClick={() => {
                      setShowHoroscopeAstroCompatibility(true);
                      showUserPosts && setShowUserPosts(false);
                      showUserLikes && setShowUserLikes(false);
                    }}
                  />

                  <Buttons
                    text="Their posts"
                    bg={showUserPosts ? "#8FEBE0" : null}
                    onClick={() => {
                      setShowUserPosts(true);
                      showHoroscopeAstroCompatibility &&
                        setShowHoroscopeAstroCompatibility(false);
                      showUserLikes && setShowUserLikes(false);
                    }}
                  />

                  <Buttons
                    text="Their likes"
                    bg={showUserLikes ? "#8FEBE0" : null}
                    onClick={() => {
                      setShowUserLikes(true);
                      showHoroscopeAstroCompatibility &&
                        setShowHoroscopeAstroCompatibility(false);
                      showUserPosts && setShowUserPosts(false);
                    }}
                  />
                </div>

                {showHoroscopeAstroCompatibility &&
                  horoscopeAstroCompatibility ? (
                  <Grid.Container gap={3} justify="center">
                    <Grid xs={12} sm={6} md={6} lg={6}>
                      <Card>
                        <div className="text-center p-3">
                          <h5 className="mb-3">
                            <strong>
                              {horoscopeAstroCompatibility[0].header}
                            </strong>
                          </h5>
                          <p>{horoscopeAstroCompatibility[0].text}</p>
                        </div>
                      </Card>
                    </Grid>
                    <Grid xs={12} sm={6} md={6} lg={6}>
                      {userFollowers.some(
                        (follower) => follower.follower.id === currentUser.id
                      ) &&
                        userFolloweds.some(
                          (followed) => followed.followed.id === currentUser.id
                        ) ? (
                        <Collapse.Group splitted>
                          <Collapse
                            subtitle={horoscopeAstroCompatibility[1].header}
                          >
                            <Text>{horoscopeAstroCompatibility[1].text}</Text>
                          </Collapse>
                          <Collapse
                            subtitle={horoscopeAstroCompatibility[2].header}
                          >
                            <Text>{horoscopeAstroCompatibility[2].text}</Text>
                          </Collapse>
                          <Collapse
                            subtitle={horoscopeAstroCompatibility[3].header}
                          >
                            <Text>{horoscopeAstroCompatibility[3].text}</Text>
                          </Collapse>
                          <Collapse
                            subtitle={horoscopeAstroCompatibility[4].header}
                          >
                            <Text>{horoscopeAstroCompatibility[4].text}</Text>
                          </Collapse>
                        </Collapse.Group>
                      ) : (
                        <div className="text-center">
                          <h4 className="mb-3">
                            Follow each other to unlock more info about your
                            sign compatibility!
                          </h4>
                          <img
                            style={{ width: "180px", opacity: "0.7" }}
                            src="https://lens-storage.storage.googleapis.com/png/d17e798658ed41a5a8737ee6c4276299"
                          />
                        </div>
                      )}
                    </Grid>
                  </Grid.Container>
                ) : null}

                <div>
                  {showUserPosts ? (
                    userPosts.length > 0 ? (
                      <div>
                        {userPosts.map((post) => (
                          <Posts
                            key={post.id}
                            img={user.image}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            sunSign={user.sunSign.name}
                            moonSign={user.moonSign.name}
                            ascendantSign={user.ascendantSign.name}
                            body={post.body}
                            likeFn={() => {
                              handleLike(post.id);
                            }}
                            postId={post.id}
                            postImgs={post.images}
                            userId={post.user.id}
                            currentUser={currentUser.id}
                            isLiked={currentUserLikes.some(
                              (likedPost) => likedPost.post.id === post.id
                            )}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">
                        <h4 className="mb-3">
                          {user.firstName} doesn't have any posts yet!
                        </h4>
                        <img
                          style={{
                            width: "180px",
                            opacity: "0.7",
                            filter: "grayscale(100%)",
                          }}
                          src="https://lens-storage.storage.googleapis.com/png/7094275a165d452686a0e44722af53c3"
                        />
                      </div>
                    )
                  ) : null}
                </div>

                <div>
                  {showUserLikes ? (
                    userLikes.length > 0 ? (
                      <div>
                        {userLikes.map((like) => (
                          <Posts
                            key={like._id}
                            img={like.post.user.image}
                            firstName={like.post.user.firstName}
                            lastName={like.post.user.lastName}
                            sunSign={like.post.user.sunSign.name}
                            moonSign={like.post.user.moonSign.name}
                            ascendantSign={like.post.user.ascendantSign.name}
                            body={like.post.body}
                            likeFn={() => {
                              handleLike(like.post.id);
                            }}
                            postId={like.post.id}
                            postImgs={like.post.images}
                            showTrash={true}
                            userId={like.post.user.id}
                            currentUser={currentUser.id}
                            isLiked={currentUserLikes.some(
                              (likedPost) => likedPost.post.id === like.post.id
                            )}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">
                        <h4 className="mb-3">
                          {user.firstName} doesn't have any likes yet!
                        </h4>
                        <img
                          style={{
                            width: "180px",
                            opacity: "0.7",
                            filter: "grayscale(100%)",
                          }}
                          src="https://lens-storage.storage.googleapis.com/png/6980dfc2d7654972be6813f2bf3aa95b"
                        />
                      </div>
                    )
                  ) : null}
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      ) : (
        <ProfileSk />
      )}
    </div>
  );
};
