//global Style 지정

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
        
    }

    
    a{
        text-decoration: none;
    }
`;

export default GlobalStyle;
