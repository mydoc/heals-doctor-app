import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        font-size: 62.5%;

        --defaultFont: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

        --headerHeight: 50px;
        --maxWidth: 1280px;
        --onSurface: #24292F;
        --lightGrey: #CBDCF7; // #eee;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1.1rem;
        --fontTiny: 0.86rem;

        --iconSmall: 2rem;
        --iconMed: 3.6rem;
        --iconLarge: 4rem;
    }

    ::-webkit-scrollbar {
            width: 6px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #F1F1F1;
        border: none;
    }

    * {
        box-sizing: border-box;
        font-family: var(--defaultFont);
        font-size: 1.4rem;
    }

    body {
        color: #24292F;
        margin: 0;
        padding: 0;

        h1 {
            font-size: 2rem;
            font-weight: 600;
        }

        h2 {
            font-size: 1.7rem;
            font-weight: 400;
        }

        h3 {
            font-size: 1.1rem;
            font-weight: 400;
        }
    }
`
