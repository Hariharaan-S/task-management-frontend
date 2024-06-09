import styled from 'styled-components'

export const NavigationWrapper = styled.div`
    margin: 3rem 4rem;
    padding: 2rem;
    background: rgb(255, 255, 255, 0.70);
    box-shadow: 0 8px 32px 0 rgb(180, 180, 184, 0.37);
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;

    @media screen and (max-width: 1366px){
        max-width: 100%;
    }
`

export const NavigationBar = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    min-width: 100vh;
    h1{
        font-family: "Poppins", sans-serif;
        font-size: 3rem;
        -webkit-text-stroke: .5px #B4B4B8;
        background: linear-gradient(#FFA27F, #E49BFF);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    @media screen and (max-width: 768px){
        min-width: 500px;
        h1{ 
            font-size: 2rem;
        }

    }
    @media screen and (max-width: 617px){
        min-width: 200px;
    }
`

export const ButtonBar = styled.div`
    position: absolute;
    max-width: 100vh;
    padding: 1.2rem;
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    top: 1.2rem;
    left: 74.6rem;

    .pop-up{
        position: absolute;
    }

    @media screen and (max-width: 1366px){
        position: absolute;
        left: 61.6rem;
    }

    @media (max-width: 768px){
        position: absolute;
        top: 0;
        left: 24rem;
    }
    @media (max-width: 617px){
        position: left;
        left: 14rem;
    }

`

export const Button = styled.button`
    border: none;
    cursor: pointer;
    padding: .5rem;
    border-radius: 100%;
    background: #373A40;
    color: white;
    transition: all .5s ease;
    &:hover{
        background: black;
   }
    .icon{
        font-size: 2rem;
    }
`

export const Time = styled.p`
    position: absolute;
    left: 60rem;
    top: 2.2rem;

    @media screen and (max-width: 1366px){
        position: absolute;
        left: 45rem;
    }
    @media (max-width: 768px){
        position: absolute;
        top: 1.7rem;
        left: 12rem;
        font-size: .8rem;
    }
    @media screen and (max-width: 617px){
        display: none;
    }
`