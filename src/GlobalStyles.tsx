import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        --headerHeight: 50px;
        --maxWidth: 1280px;
        --onSurface: #000;
        --lightGrey: #CBDCF7; // #eee;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1.0rem;
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
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
    }

    body {
        margin: 0;
        padding: 0;

        h1 {
            font-size: 2rem;
            font-weight: 600;
            color: var(--onSurface);
        }

        h3 {
            font-size: 1.1rem;
            font-weight: 600;
        }

        p, span, button, input {
            font-size: 1.0rem;
            color: var(--onSurface);
        }
    }
`
