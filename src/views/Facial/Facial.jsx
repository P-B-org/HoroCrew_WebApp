import { Link } from "react-router-dom";

import { useEffect } from "react";

export const FacialIO = () => {

    let faceio;

    useEffect(() => {
        faceio = new faceIO("fioa76d4") // CONVERTIR EL PUBLICID EN ENV
    }, []);



    const handleSignUp = async () => {
        try {
            let response = await faceio.enroll({
                locale: "auto",
                payload: {
                    email: "example@gmail.com",
                    pin: "12345",
                },
            });

            console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
        } catch (errCode) {
            handleError(errCode);
        }
    };

    const handleLogIn = async () => {
        try {
            let response = await faceio.authenticate({
                locale: "auto",
            });

            console.log(` Unique Facial ID: ${response.facialId}
          PayLoad: ${response.payload}
          `);
        } catch (error) {
            handleError(errCode);
        }
    };

    const handleError = (errCode) => {
        switch (errCode) {
            case fioErrCode.PERMISSION_REFUSED:
                console.log("Access to the Camera stream was denied by the end user");
                break;
            case fioErrCode.NO_FACES_DETECTED:
                console.log("No faces were detected during the enroll or authentication process");
                break;
            case fioErrCode.UNRECOGNIZED_FACE:
                console.log("Unrecognized face on this application's Facial Index");
                break;
            case fioErrCode.MANY_FACES:
                console.log("Two or more faces were detected during the scan process");
                break;
            case fioErrCode.FACE_DUPLICATION:
                console.log("User enrolled previously (facial features already recorded). Cannot enroll again!");
                break;
            case fioErrCode.PAD_ATTACK:
                console.log("Presentation (Spoof) Attack (PAD) detected during the scan process");
                break;
            case fioErrCode.FACE_MISMATCH:
                console.log("Calculated Facial Vectors of the user being enrolled do not matches");
                break;
            case fioErrCode.WRONG_PIN_CODE:
                console.log("Wrong PIN code supplied by the user being authenticated");
                break;
            case fioErrCode.PROCESSING_ERR:
                console.log("Server side error");
                break;
            case fioErrCode.UNAUTHORIZED:
                console.log("Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information");
                break;
            case fioErrCode.TERMS_NOT_ACCEPTED:
                console.log("Terms & Conditions set out by FACEIO/host application rejected by the end user");
                break;
            case fioErrCode.UI_NOT_READY:
                console.log("The FACEIO Widget could not be (or is being) injected onto the client DOM");
                break;
            case fioErrCode.SESSION_EXPIRED:
                console.log("Client session expired. The first promise was already fulfilled but the host application failed to act accordingly");
                break;
            case fioErrCode.TIMEOUT:
                console.log("Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)");
                break;
            case fioErrCode.TOO_MANY_REQUESTS:
                console.log("Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications");
                break;
            case fioErrCode.EMPTY_ORIGIN:
                console.log("Origin or Referer HTTP request header is empty or missing");
                break;
            case fioErrCode.FORBIDDDEN_ORIGIN:
                console.log("Domain origin is forbidden from instantiating fio.js");
                break;
            case fioErrCode.FORBIDDDEN_COUNTRY:
                console.log("Country ISO-3166-1 Code is forbidden from instantiating fio.js");
                break;
            case fioErrCode.SESSION_IN_PROGRESS:
                console.log("Another authentication or enrollment session is in progress");
                break;
            case fioErrCode.NETWORK_IO:
            default:
                console.log("Error while establishing network connection with the target FACEIO processing node");
                break;
        }
    }


    return (
        <section >
            <h1>
                Face Authentication by FaceIO
            </h1>
            <div className="flex flex-col justify-center items-center">
                <button

                    onClick={handleSignUp}
                >
                    <Link to="/signup" > register </Link> {/* refresh page.. login working*/}
                </button>

                <button

                    onClick={() => handleLogIn()}
                >
                    <Link to="/loginFacial" >Log-in  </Link> {/* refresh page.. login working*/}
                </button>
            </div>
        </section>
    );
}
