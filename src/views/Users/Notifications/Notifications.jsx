import React, { useContext, useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import moment from "moment";
import AuthContext from "../../../context/AuthContext";
import {
  getNotifications,
  getReadNotifications,
} from "../../../services/NotificationService";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../../components/Skeletons/Card/Card";

export const Notifications = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState();

  const readNoti = () => {
    getReadNotifications()
      .then((readNotifications) => {
        console.log(readNotifications);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!currentUser && !notifications) return;

    getNotifications()
      .then((notifications) => {
        setNotifications(notifications);
        readNoti();
        console.log(notifications);
      })
      .catch((err) => console.error(err));
  }, [currentUser]);

  return (
    <div className="min-vh-100 position-realtive">
      <h1>Notifications</h1>
      {notifications ? (
        <MDBContainer className="d-flex flex-column justify-content-start align-items-center">
          {notifications.map((notification) => (
            <MDBRow key={notification._id}>
              <MDBCol className="mt-2">
                <MDBCard style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="p-3">
                    <div className="d-flex align-items-center text-black">
                      <div className="flex-shrink-0 d-flex align-items-center">
                        <Link to={`/profile/${notification.notificator.id}`}>
                          <MDBCardImage
                            style={{ width: "50px", borderRadius: "10px" }}
                            src={notification.notificator.image}
                            alt="Generic placeholder image"
                            fluid
                          />
                        </Link>
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-between flex-grow-1 ms-3"
                        style={{ width: "50vw" }}
                      >
                        <div className="d-flex flex-column">
                          {notification.read ? (
                            <p className="me-4 mb-0 p-0">
                              {notification.message}
                            </p>
                          ) : (
                            <p className="me-4 mb-0 p-0">
                              <strong>{notification.message}</strong>
                            </p>
                          )}

                          {notification.type === "Like" ||
                          notification.type === "Comment" ? (
                            <p
                              className="text-muted mb-0"
                              onClick={() => {
                                navigate(`/post/${notification.post}`);
                              }}
                            >
                              <small>View post</small>
                            </p>
                          ) : null}
                        </div>

                        <p className="p-0">
                          <small>
                            <em>
                              {moment(notification.createdAt)
                                .startOf(notification.createdAt)
                                .fromNow()}
                            </em>
                          </small>
                        </p>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          ))}
        </MDBContainer>
      ) : (
        <div style={{ width: "100vw" }}>
          <Card />
        </div>
      )}
    </div>
  );
};
