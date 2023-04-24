import React from "react";
import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import { Buttons } from "../Button/Button";

export const UserBrief = ({ user, text, onClick, img }) => {
  return (
    <div className="mb-3">
      <MDBCard style={{ borderRadius: "15px", maxWidth: "80vw" }}>
        <MDBCardBody className="p-3">
          <div className="d-flex align-items-center justify-content-between text-black">
            <div className="d-flex align-items-center">
              <MDBCardImage
                style={{ width: "80px", borderRadius: "10px" }}
                src={img}
                alt="Generic placeholder image"
                fluid
              />
              <h6 className="ms-4 mt-2">
                {user.firstName} {user.lastName}
              </h6>
            </div>
            <div className="d-flex align-items-center justify-content-between ms-3">
              <Buttons text={text} onClick={onClick} />
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};
