import styled from "styled-components";




export const DownSpace = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    color: darkgray;
`;

export const DownSpaceBox = styled.div`
  width: 95%;
  height: auto;
  margin: 10px;
  padding: 0.9rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: var(--dk-box-dark);

  label {
    margin: 0.3rem;
    width: 30%;
  }
`

export const InputGroup = styled.div`
  width: auto;
  height: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem;
    width: 20px;
    height: 20px;
    transition: all 100ms ease-in-out;
    border-radius: 10px;
    transform: rotate(${props => props.rotate ? 180 + 'deg' : 360 + 'deg'});

    &:hover {
      transition: 100ms;
      background-color: var(--dk-box-light-dark);
    }
  }

  input {
    width: 30%;
    height: 20px;
    color: white;
    margin: 0.4rem;
    padding: 10px;
    border: none;
    font-size: 1.0rem;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: var(--dk-box-color);
    background-color: transparent;
    transition: all 200ms ease-in-out;

    &:focus {
      outline: none;
      background-color: var(--dk-box-light-dark);
    }

    &:hover {
      transition: 100ms;
      background-color: var(--dk-box-light-dark);
    }

    &::placeholder {
      color: darkgray;
    }
  }
`

export const DropDown = styled.div` 
    position: absolute;
    width: ${props => props.width ? 20 + '%' : 0};
    height: ${props => props.height ? 'auto' + 'px' : 0};
    visibility: ${props => props.display ? 'visible' : 'hidden'};
    background-color: #fff;
    right: 27rem;
    top: 11rem;
    border-radius: 15px;
    border-top-right-radius: 0;
    transition: all 100ms ease-in-out;
    text-align: center;
    padding: 0.3rem;
    color: black;
`

export const DropItems = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.3rem;
  visibility: ${props => props.display ? 'visible' : 'hidden'};

  ul {
    width: 100%;
  }

  li {
    list-style: none;
    margin: 0.5rem;
    border-radius: 5px;
    padding: 5px;
    background-color: #f3f2f2;

    &:hover {
      background-color: #cccccc;
    }
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.4rem;
  padding: 0.5rem;

  button {
    border: none;
    padding: 0.6rem;
    margin: 0.3rem;
    border-radius: 0.3rem;
    color: white;
    background-color: var(--dk-box-color);
    transition: 200ms;
    display: flex;
    width: 20%;
    align-items: center;
    justify-content: center;

    i {
      width: 20px;
      display: flex;
      justify-content: flex-start;
    }

    &:hover {
      transition: 200ms;
      background-color: var(--dk-hover-color);
    }
  }
`