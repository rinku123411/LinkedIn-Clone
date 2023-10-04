import React from 'react'
import { styled } from 'styled-components';
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { Navigate } from "react-router-dom";


function Login(props) {
  return (
   <Container>
    {props.user && <Navigate to = "/home"/> } {/** if there is a user redirect to home page */}
    <Nav> {/*navigation bar */}
        <a href="/">
          <img src="/images/LinkedIn-Logo-wine.svg" alt="" />
        </a>
        <div>
          <Join>Join now</Join>
          <SignIn>Sign in</SignIn>
        </div>
    </Nav> {/* nav bar finished*/}
    <Section>
      <Hero>
          <h1>Welcome to your professional community</h1>
          <img src="/images/Linkedin-login.svg" alt="" />
        </Hero>
        <Form>
          <Google  onClick={() => props.signIn()}> {/** onclick we will call function sign in */}
            <img src="/images/google (1).svg" alt="" />
              Sign in with Google
          </Google>
        </Form>
    </Section>

   </Container>
  )
}

const Container = styled.div` // this is the component styling method instead of using css
    padding: 0px;
`;

const Nav = styled.nav` // styling for nav bar
  max-width: 100%;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a > img { 
    width: 135px;
    height: 34px;
    @media (max-width: 768px) { // for mobile resolutions i.e to make it responsive
      padding: 0 5px;
    }
  }
`;

const Join = styled.a` // styling for join now button
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  &:hover { // changes to button when we hover
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;

const SignIn = styled.a` // styling for sign in button
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover { // changes to component when we hover
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

const Section = styled.section` // section below the nav bar
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div` // styling for text and image in hero
  width: 100%;
  h1 {
    padding-top : 45px;
    padding-bottom: 0px;
    width: 45%;
    font-size: 46px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }

  img {
    /* z-index: -1; */
    width: 800px;
    height: 870px;
    position: absolute;
    bottom: -5px;
    right: -150px;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);

  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);

  
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

const mapStatetoProps = (state) => {
  return {
    user: state.userState.user, //updating the user here
  };
};

const mapDispatchtoProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()), //when sign In is called we dispatch a action with calling signInAPI function in action folder
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);