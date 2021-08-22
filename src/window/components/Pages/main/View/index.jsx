import styled from 'styled-components';

export const AppDetails = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  color: darkgray;
`

export const AppDetailsBox = styled.div`
  width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #2e2e2e;
  margin: 15px;
  transition: all 200ms ease-in-out;

  span {
    color: darkgray;
    margin: 0.4rem;
  }

  &:hover {
    transition: 200ms;
    
  }
`