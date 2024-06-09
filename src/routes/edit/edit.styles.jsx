import styled from "styled-components";

export const FormData = styled.form`
    padding: 1rem 7rem;
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
    .editbutton{
        background: #373A40;
        &:hover{
            background: black;
        }
    }
    @media (max-width: 768px){
        padding: 1rem;
    }
`

export const FormInput = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 4rem;
    label {
        margin: auto 0;
        font-size: 1.2rem;
    }
    .titleInput{
        border: none;
        background: none;
        font-size: 1.2rem;
        border-bottom: 1px solid black;
        width: 100%;
        padding: .5rem;
        &:focus{
            outline: none;
        }
    }
        .descArea{
            width: 100%;
            border-radius: 30px;
            padding: 2rem;
            font-size: 1rem;
            font-family: inherit;
            background: none;
            &:focus{
                outline: none;
            }
            @media screen and (max-width: 617px){
                width: 80%;
            }
        }

    @media screen and (max-width: 617px){
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
    }
`