import React from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { logout as logoutToken } from "../../../stores/AccessTokenStore";
import { getEditCurrentUser as editService } from "../../../services/UserService";
import ReactDOM from "react-dom";


import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Grid,
  Card,
} from "@nextui-org/react";

import {
  deletePost,
  getCurrentUserPosts,
  likePost,
} from "../../../services/PostService";
import { getCurrentUserLikes } from "../../../services/LikeService";
import {
  getCurrentUserFollowers,
  getCurrentUserFolloweds,
} from "../../../services/FollowService";

import { Buttons } from "../../../components/Button/Button";
import { Posts } from "../../../components/Posts/Posts";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "@nextui-org/react";
import { ProfileSk } from "../../../components/Skeletons/ProfileSk/ProfileSk";
import { deleteCurrentUserAcc } from "../../../services/UserService";

export const Profile = () => {
  const { currentUser, getCurrentUser } = useContext(AuthContext);


  const faceio = new faceIO("fioa76d4");

  const navigate = useNavigate();

  const [currentUserFollowers, setCurrentUserFollowers] = useState([]);
  const [currentUserFolloweds, setCurrentUserFolloweds] = useState([]);

  const [showCurrentUserAbout, setShowCurrentUserAbout] = useState(true);

  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [showCurrentUserPosts, setShowCurrentUserPosts] = useState(false);

  const [currentUserLikes, setCurrentUserLikes] = useState([]);
  const [showCurrentUserLikes, setShowCurrentUserLikes] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const handleDelete = (postId) => {
    deletePost(postId).then((res) => {
      handleCurrentUserPosts();
      handleCurrentUserLikes();
    });
  };

  const handleLike = (postId) => {
    likePost(postId).then((res) => {
      return handleCurrentUserLikes();
    });
  };

  const handleCurrentUserPosts = () => {
    getCurrentUserPosts()
      .then((posts) => {
        setCurrentUserPosts(posts);
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

  const handleSignUp = async () => {
    try {
      console.log(currentUser);
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: currentUser.email,
          whoami: currentUser.id,
        },
      });

      const initialValues = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        dayOfBirth: currentUser.dayOfBirth,
        monthOfBirth: currentUser.monthOfBirth,
        yearOfBirth: currentUser.yearOfBirth,
        timeOfBirth: currentUser.timeOfBirth,
        facialId: response.facialId
      };

      editService({
        firstName: initialValues.firstName,
        lastName: initialValues.lastName,
        dayOfBirth: initialValues.dayOfBirth,
        monthOfBirth: initialValues.monthOfBirth,
        yearOfBirth: initialValues.yearOfBirth,
        timeOfBirth: initialValues.timeOfBirth,
        facialId: initialValues.facialId
      })
        .then((response) => {
          console.log("success!!!")
        })
        .catch((error) => {
          console.log(error.response);
        });

      console.log(` Unique Facial ID: ${response.facialId}
  Enrollment Date: ${response.timestamp}`);
    } catch (errCode) {
      console.log(errCode);
    }
  };

  const handleDeleteAccount = () => {
    deleteCurrentUserAcc()
      .then((deleteAcc) => {
        console.log("Account deleted");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!currentUser) return;

    getCurrentUserFollowers()
      .then((followers) => {
        setCurrentUserFollowers(followers);
      })
      .catch((err) => console.error(err));

    getCurrentUserFolloweds()
      .then((followeds) => {
        setCurrentUserFolloweds(followeds);
      })
      .catch((err) => console.error(err));

    handleCurrentUserPosts();

    handleCurrentUserLikes();
  }, [currentUser]);

  return (
    <div
      className="background-profile gradient-custom-2"
      style={{
        minHeight: "100vh",
      }}
    >
      {currentUser ? (
        <div className="py-3 mx-2 h-100">
          <MDBContainer>
            <MDBRow className="h-100">
              <MDBCol>
                <MDBCard>
                  <div
                    className="rounded d-flex flex-row profilBg"
                    style={{
                      paddingBottom: "50px",
                    }}
                  >
                    <div className="mx-2 mt-5 d-flex justify-content-between align-items-center w-100 profilBg">
                      <div className="d-flex flex-wrap align-items-center">
                        <MDBCardImage
                          src={currentUser.image}
                          alt="Generic placeholder image"
                          className="me-4 ms-1 my-2 img-thumbnail"
                          fluid
                          style={{ width: "80px" }}
                        />
                        <div>
                          <MDBCardText className="mt-2 h5 text-dark text-white">
                            {currentUser.firstName} {currentUser.lastName}
                          </MDBCardText>
                        </div>
                      </div>
                      <Dropdown>
                        <Dropdown.Button color="light" light>
                          <i className="bi bi-gear-fill me-2"></i>
                        </Dropdown.Button>
                        <Dropdown.Menu
                          aria-label="Single selection actions"
                          color="primary"
                          disallowEmptySelection
                          selectionMode="single"
                        >

                          <Dropdown.Item key="register">
                            <Button
                              auto
                              onPress={() => {
                                handleSignUp();
                              }}
                            >
                              Enable FaceID
                            </Button>
                          </Dropdown.Item>

                          <Dropdown.Item key="edit">
                            <NavLink
                              className="text-decoration-none text-dark"
                              to="/profile/edit-profile"
                            >
                              <i className="bi bi-pencil-square"></i> Edit
                              Profile
                            </NavLink>
                          </Dropdown.Item>







                          <Dropdown.Item key="logout">
                            <NavLink
                              className="text-decoration-none text-dark"
                              to="/"
                              onClick={logoutToken}
                            >
                              <i className="bi bi-box-arrow-right"></i> Log Out
                            </NavLink>
                          </Dropdown.Item>
                          <Dropdown.Item
                            withDivider
                            color="light"
                            className="ps-1"
                            key="delete"
                          >
                            <Button className="ms-0" ghost onPress={handler}>
                              Delete Account
                            </Button>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </MDBCard>

                <Modal
                  closeButton
                  preventClose
                  scroll
                  aria-labelledby="modal-title"
                  open={visible}
                  onClose={closeHandler}
                >
                  <Modal.Header>
                    <Text id="modal-title" b size={18}>
                      Are you sure you want to delete your account?
                    </Text>
                  </Modal.Header>
                  <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                    <div className="text-center">
                      <p className="mb-2">We will miss you!</p>
                      <img
                        style={{ width: "180px", filter: "grayscale(100%)" }}
                        src="https://lens-storage.storage.googleapis.com/png/cc6a85c6a1564ba083819474584e3ed9"
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="d-flex justify-content-center align-items-center">
                    <Button auto flat color="light" onPress={closeHandler}>
                      No, I regretted
                    </Button>
                    <Button
                      auto
                      onPress={() => {
                        handleDeleteAccount();
                      }}
                    >
                      Yes, delete account
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div className="py-4 text-black">
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-0 h5">
                        {currentUserPosts.length}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Posts
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <Link
                        to="/profile/followers"
                        className="mb-0 h5 text-decoration-none"
                      >
                        {currentUserFollowers.length}
                      </Link>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <Link
                        to="/profile/followeds"
                        className="mb-0 h5 text-decoration-none"
                      >
                        {currentUserFolloweds.length}
                      </Link>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-around text-center mb-3 py-2 border-top border-bottom">
                  <Buttons
                    text="Your big three"
                    bg={showCurrentUserAbout ? "#8FEBE0" : null}
                    onClick={() => {
                      setShowCurrentUserAbout(true);
                      showCurrentUserPosts && setShowCurrentUserPosts(false);
                      showCurrentUserLikes && setShowCurrentUserLikes(false);
                    }}
                  />
                  <Buttons
                    text="Your posts"
                    bg={showCurrentUserPosts ? "#8FEBE0" : null}
                    onClick={() => {
                      setShowCurrentUserPosts(true);
                      showCurrentUserAbout && setShowCurrentUserAbout(false);
                      showCurrentUserLikes && setShowCurrentUserLikes(false);
                    }}
                  />
                  <Buttons
                    text="Your likes"
                    bg={showCurrentUserLikes ? "#8FEBE0" : null}
                    onClick={() => {
                      setShowCurrentUserLikes(true);
                      showCurrentUserAbout && setShowCurrentUserAbout(false);
                      showCurrentUserPosts && setShowCurrentUserPosts(false);
                    }}
                  />
                </div>

                <div style={{ width: "90vw" }}>
                  {showCurrentUserAbout ? (
                    <Grid.Container gap={2} justify="center">
                      <Grid xs={12} sm={6} md={4} lg={4}>
                        <Card>
                          <div className="d-flex flex-column align-items-center text-center p-3">
                            <i className="bi bi-sun mb-2"></i>
                            {currentUser.sunSign.sun}
                          </div>
                        </Card>
                      </Grid>
                      <Grid xs={12} sm={6} md={4} lg={4}>
                        <Card>
                          <div className="d-flex flex-column align-items-center text-center p-3">
                            <i className="bi bi-moon mb-2"></i>
                            {currentUser.moonSign.moon}
                          </div>
                        </Card>
                      </Grid>
                      <Grid xs={12} sm={6} md={4} lg={4}>
                        <Card>
                          <div className="d-flex flex-column align-items-center text-center p-3">
                            <i className="bi bi-arrow-up mb-2"></i>
                            {currentUser.ascendantSign.ascendant}
                          </div>
                        </Card>
                      </Grid>
                    </Grid.Container>
                  ) : null}
                </div>

                <div style={{ width: "90vw" }}>
                  {showCurrentUserPosts ? (
                    currentUserPosts.length > 0 ? (
                      <div>
                        {currentUserPosts.map((post) => (
                          <Posts
                            key={post.id}
                            img={currentUser.image}
                            firstName={currentUser.firstName}
                            lastName={currentUser.lastName}
                            sunSign={currentUser.sunSign.name}
                            moonSign={currentUser.moonSign.name}
                            ascendantSign={currentUser.ascendantSign.name}
                            body={post.body}
                            postId={post.id}
                            postImgs={post.images}
                            createdAt={post.createdAt}
                            showTrash={true}
                            deleteFn={() => {
                              handleDelete(post.id);
                            }}
                            likeFn={() => {
                              handleLike(post.id);
                            }}
                            userId={post.user}
                            currentUser={currentUser.id}
                            isLiked={currentUserLikes.some(
                              (likedPost) => likedPost.post.id === post.id
                            )}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">
                        <h4 className="mb-3">Your posts will appear here</h4>
                        <img
                          style={{ width: "180px", opacity: "0.7" }}
                          src="https://lens-storage.storage.googleapis.com/png/b53e28601c6145639a18fae7a8f37958"
                        />
                      </div>
                    )
                  ) : null}
                </div>

                <div style={{ width: "90vw" }}>
                  {showCurrentUserLikes ? (
                    currentUserLikes.length > 0 ? (
                      <div>
                        {currentUserLikes.map((like) => (
                          <Posts
                            key={like._id}
                            img={like.post.user.image}
                            firstName={like.post.user.firstName}
                            lastName={like.post.user.lastName}
                            sunSign={like.post.user.sunSign.name}
                            moonSign={like.post.user.moonSign.name}
                            ascendantSign={like.post.user.ascendantSign.name}
                            body={like.post.body}
                            postId={like.post.id}
                            postImgs={like.post.images}
                            createdAt={like.post.createdAt}
                            showTrash={true}
                            deleteFn={() => {
                              handleDelete(like.post.id);
                            }}
                            likeFn={() => {
                              handleLike(like.post.id);
                            }}
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
                        <h4 className="mb-3">Your likes will appear here</h4>
                        <img
                          style={{ width: "180px", opacity: "0.7" }}
                          src="https://lens-storage.storage.googleapis.com/png/4b9d069ea727454aa258cd13b2c03259"
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
