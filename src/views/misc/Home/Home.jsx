
import { Animator, Fade, FadeIn, MoveIn, MoveOut, ScrollContainer, ScrollPage, Sticky, StickyIn, Zoom, ZoomIn, batch } from "react-scroll-motion"
import "./Home.css";
import imgLogo from "../../../assets/images/Backgrounds/bgLogo.png"
import { Button, Grid, Link, Spacer } from "@nextui-org/react";

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
                        <img src={imgLogo} style={{ width: "70vh", height: "100%" }} />
                    </Animator>
                </ScrollPage>

                <ScrollPage page={1}>
                    <Galaxy />

                    <Animator animation={ZoomInScrollOut}>
                        <span style={{ fontFamily: "fantasy", fontSize: "40px", color: "white" }}>✨Welcome✨</span>
                    </Animator>
                </ScrollPage>

                <ScrollPage>
                    <Galaxy />
                    <Animator animation={FadeUp}>
                        <span style={{ fontFamily: "fantasy", fontSize: "40px", color: "white" }}> Find Your True Self </span>
                    </Animator>
                </ScrollPage>
                <ScrollPage>
                    <Galaxy />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", color: "white" }} >
                        <span style={{ fontSize: "30px" }}>
                            <Animator animation={MoveIn(-1000, 0)} style={{ fontFamily: "fantasy" }}>🐐Capricorn♑</Animator>
                            <Animator animation={MoveIn(1000, 0)} style={{ fontFamily: "fantasy" }}>🐮Taurus♉</Animator>
                            <Animator animation={MoveIn(1000, 0)} style={{ fontFamily: "fantasy" }}>🐟Pisces♓</Animator>
                            <Animator animation={MoveOut(1000, 0)} style={{ fontFamily: "fantasy" }}>👯Gemini♊</Animator>
                            <Animator animation={MoveOut(-1000, 0)} style={{ fontFamily: "fantasy" }}> 🏹Sagitarius♐ </Animator>
                            <Animator animation={MoveOut(-1000, 0)} style={{ fontFamily: "fantasy" }}> ⚖️Libra♎ </Animator>
                            <Animator animation={MoveIn(-1000, 0)} style={{ fontFamily: "fantasy" }}>🌊Aquarius♒</Animator>
                            <Animator animation={MoveIn(1000, 0)} style={{ fontFamily: "fantasy" }}>🐏Aries♈</Animator>
                            <Animator animation={MoveIn(1000, 0)} style={{ fontFamily: "fantasy" }}>💸Virgo♍</Animator>
                            <Animator animation={MoveOut(-1000, 0)} style={{ fontFamily: "fantasy" }}> 🦂Scorpio♏ </Animator>
                            <Animator animation={MoveOut(-1000, 0)} style={{ fontFamily: "fantasy" }}> 🦀Cancer♋</Animator>
                            <Animator animation={MoveOut(-1000, 0)} style={{ fontFamily: "fantasy" }}> 🦁Leo♌</Animator>
                        </span>
                    </div>
                </ScrollPage>
                <ScrollPage>
                    <Galaxy />
                    <Animator animation={batch(Fade(), Sticky())}>
                        <Grid.Container gap={5}>
                            <Grid>
                                <Link href="/signup">
                                    <Button size="lg" color="success" auto ghost>
                                        Do´nt have an account? Join Us!
                                    </Button>
                                </Link>
                            </Grid>

                            <Grid>
                                <Link href="/login">
                                    <Button size="lg" shadow color="primary" auto>
                                        Already have an account? Sign In!
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid.Container>
                    </Animator>
                </ScrollPage>
            </ScrollContainer>


        </>

    )
}



