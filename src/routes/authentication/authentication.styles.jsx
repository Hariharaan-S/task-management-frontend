import styled from 'styled-components'
export const AuthenticationContainer = styled.div`
display: flex;
justify-content: space-between;
width: 900px;
margin: 30px auto;
@media (max-width: 768px){
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
}
`