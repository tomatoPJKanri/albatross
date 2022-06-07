import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button_";
import Responsive from "./Responsive";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 7px;
  }

  .userSec {
    display: flex;
    align-items: center;
  }
  .userInfo {
    font-weight: 800;
    margin-right: 1rem;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="logo">
            <Link to="/">ALBATROSS</Link>
          </div>

          {user ? (
            <div className="userSec">
              <div className="userInfo">{user.username}様</div>
              <Button onClick={onLogout}>LOG OUT</Button>
            </div>
          ) : (
            <div className="userSec">
              <Button to="/login">LOG IN</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
