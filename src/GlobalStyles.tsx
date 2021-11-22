import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
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
        --fontSmall: 1.0rem;
        --fontTiny: 0.86rem;

        --iconSmall: 20px;
        --iconMed: 36px;
        --iconLarge: 40px;
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
        font-size: 14px;
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

        p, span, button, input {
            font-size: 1.0rem;
        }
    }
`
