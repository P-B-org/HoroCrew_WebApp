import {
  Animator,
  Fade,
  FadeIn,
  MoveIn,
  MoveOut,
  ScrollContainer,
  ScrollPage,
  Sticky,
  StickyIn,
  ZoomIn,
  batch,
} from "react-scroll-motion";
import "./Home.css";
import imgLogo from "../../../assets/images/Backgrounds/bgLogo.png";
import { Button, Grid, Link } from "@nextui-org/react";

import Galaxy from "../../../components/Backgrounds/backgrounGalaxy/BackgroundGalaxy";

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), MoveIn(), MoveOut(), Sticky());
export const Home = () => {
  return (
    <>
      <ScrollContainer>
        <ScrollPage page={0}>
          <Galaxy />

          <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -200))}>
            <img src={imgLogo} style={{ width: "60vh", height: "100%" }} />
            <div className="scroll-down"></div>
          </Animator>
        </ScrollPage>

        <ScrollPage page={1}>
          <Galaxy />

          <Animator animation={ZoomInScrollOut}>
            <span
              style={{
                fontFamily: "fantasy",
                fontSize: "40px",
                color: "white",
              }}
            >
              ✨Welcome✨
            </span>
          </Animator>
        </ScrollPage>

        <ScrollPage>
          <Galaxy />
          <Animator animation={FadeUp}>
            <span
              style={{
                fontFamily: "fantasy",
                textAlign: "center",
                fontSize: "40px",
                color: "white",
              }}
            >
              {" "}
              Find Your True Self{" "}
            </span>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Galaxy />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "white",
            }}
          >
            <span style={{ fontSize: "30px" }}>
              <Animator
                animation={MoveIn(-1000, 0)}
                style={{ fontFamily: "fantasy" }}
              >
                Connect with friends
              </Animator>
              <Animator
                animation={MoveIn(-1000, 0)}
                style={{ fontFamily: "fantasy" }}
              >
                ·
              </Animator>

              <Animator
                animation={MoveIn(1000, 0)}
                style={{ fontFamily: "fantasy" }}
              >
                Get your daily fortune
              </Animator>

              <Animator
                animation={MoveIn(-1000, 0)}
                style={{ fontFamily: "fantasy" }}
              >
                ·
              </Animator>

              <Animator
                animation={MoveIn(-1000, 0)}
                style={{ fontFamily: "fantasy" }}
              >
                Know your compatibilities
              </Animator>

              <Animator
                animation={MoveIn(-1000, 0)}
                style={{ fontFamily: "fantasy" }}
              >
                ·
              </Animator>

              <Animator
                animation={MoveIn(1000, 0)}
                style={{ fontFamily: "fantasy" }}
              >
                And much more!
              </Animator>
            </span>
          </div>
        </ScrollPage>
        <ScrollPage>
          <Galaxy />
          <Animator animation={batch(Fade(), Sticky())}>
            <Grid.Container gap={2}>
              <Grid>
                <Link href="/signup">
                  <Button size="lg" bordered color="warning" auto>
                    Don't have an account? Join Us!
                  </Button>


                </Link>
              </Grid>

              <Grid>
                <Link href="/login">

                  <Button size="lg" flat color="warning" auto>
                    Already have one? Click & Sign In!
                  </Button>

                </Link>
              </Grid>
            </Grid.Container>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </>
  );
};
