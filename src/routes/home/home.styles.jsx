import styled from "styled-components";

const colors = [
    '#DC5F00',
    '#3ABEF9',
    '#9DDE8B'
]

export const TaskCount = styled.div`        
    display: flex;
    flex-direction: row;
    column-gap: 6rem;
    @media (max-width: 768px){
        display: flex;
        flex-direction: column;
        row-gap: 3rem;
    }
`
export const PastTask = styled.div`
    padding: 2rem;
    background: rgb(254, 250, 246, 0.30);
    box-shadow: 0 8px 28px 0 rgba( 0,0,0, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    flex: 1 100%;

    h2{
        font-size: 1.6rem;
        font-weight: 500;
        color: ${({ colorIndex }) => colors[colorIndex]}
    }
    @media (max-width: 768px){
        display: flex;
        flex-direction: column;
        row-gap: 0rem;
        align-items: center;
    }
`