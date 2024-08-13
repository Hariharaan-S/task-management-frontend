import { styled } from "@mui/material";


const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

export const PopupBody = styled('div')(
  ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: ${theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
  `,
);

export const Button = styled('button')(
  () => `
      outline: none;
      border: none;
      border-radius: 5px;
      padding: 2px 8px;
      cursor: pointer;
      color: white;
      background: #373A40; 
      transition: all .2s ease;
      &:hover{
        background: black;
      }
  `,
);

export const ButtonWrapper = styled('div')(
  () => `
      display: flex;
      flex-direction: row;
      column-gap: 1.2rem;
  `
)

export const TaskDiv = styled('div')(
  () => `
    max-width: 250px;
    padding: 2rem;
    background: rgb(254, 250, 246, 0.30);
    box-shadow: 0 8px 28px 0 rgba( 0,0,0, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;

    h2{
      font-weight: 500;
    }

  @media (max-width: 768px){
        display: flex;
        max-width: 100%;
        flex-direction: column;
        align-items: center;
    }
  `
)

export const TaskWrapper = styled('div')(
  () => `
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    row-gap: 3rem;
    flex-wrap: wrap;
    @media (max-width: 768px){
    position: relative;
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
        align-items: center;
    }
  `

)