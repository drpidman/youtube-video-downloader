import styled from "styled-components";

export const SideBar = styled.div`
  height: 100%;
  width: auto;
  position: fixed;
  display: flex;
  background-color: var(--dk-box-color);
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  border-top-right-radius: 5px;
`

export const SideBarItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin: 5px;

  a {
    margin: 5px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    border-radius: 0.5rem;
    transition: all 100ms ease-in-out;

    &:hover {
      transition: 100ms;
      background-color: var(--dk-hover-color);
    }
  }
`