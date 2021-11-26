import styled from 'styled-components';
import SplitterLayout from './react-splitter-layout-master';

export const Wrapper = styled.div`

    padding: 0; margin: 0;

    .splitter-layout {
        position: absolute;
        display: flex;
        flex-direction: row;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
    }

    .splitter-layout .layout-pane {
        position: relative;
        flex: 0 0 auto;
        overflow: auto;
    }

    .splitter-layout .layout-pane.layout-pane-primary {
        flex: 1 1 auto;
    }

    .splitter-layout > .layout-splitter {
        flex: 0 0 auto;
        width: 4px;
        height: 100%;
        cursor: col-resize;
        //background-color: #ccc;

        hover: {
            background-color: #ccc;
            transition: all 1s;
        }
    }

    .splitter-layout .layout-splitter:hover {
        background-color: #bbb;
    }

    .splitter-layout.layout-changing {
        cursor: col-resize;
    }

    .splitter-layout.layout-changing > .layout-splitter {
        background-color: #aaa;
    }

    .splitter-layout.splitter-layout-vertical {
        flex-direction: column;
    }

    .splitter-layout.splitter-layout-vertical.layout-changing {
        cursor: row-resize;
    }

    .splitter-layout.splitter-layout-vertical > .layout-splitter {
        width: 100%;
        height: 4px;
        cursor: row-resize;
    }
`

const Splitter = (props: any) => (
    <>
        <Wrapper>
            <SplitterLayout {...props} customClassName='splitter-layout'>
                {props.children}
            </SplitterLayout>
        </Wrapper>
    </>
);

export default Splitter;
