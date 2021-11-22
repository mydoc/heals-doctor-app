import styled from 'styled-components';

export const FormWrapper = styled.div`
    padding: 20px;
`;

export const Form = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;

    margin-bottom: 48px;
`;

export const FormSectionTitle = styled.h2`
    padding: 0 0 8px 0;
    border-bottom: 1px solid #D8DEE4;
    margin: 0;
`

export const FormField = styled.div`
    margin-bottom: 12px;

    label {
        display: inline-block;
        font-weight: 600;
        margin-bottom: 6px;
    }
`;

export const FormFieldNote = styled.div`
    color: #57606A;
    font-size: var(--fontTiny);
    margin: 4px 0 2px 0;
    line-height: 18px;
`

export const FormFieldInput = styled.div`

    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    select, input[type=text], textarea {
        background-color: #F6F8FA;
        border-radius: 6px;
        padding: 5px 12px;
        line-height: 20px;

        border: 1px solid #D0D7DE;

        outline-color: #0078D7;

        &:focus {
            background-color: transparent;
        }
    }

    textarea {
        width: 100%;
        min-height: 80px;
    }

    button, input[type=file]::file-selector-button {
        background-color: #F6F8FA;
        border-radius: 6px;
        padding: 5px 16px;
        border: 1px solid #D0D7DE;
        font-family: var(--defaultFont);
        cursor: pointer;
    }
`;

export const FormActions = styled.div`

    display: flex;
    gap: 10px;

    input[type=submit], button {
        font-weight: 600;
        background-color: #F6F8FA;
        border-radius: 6px;
        padding: 5px 16px;
        border: 1px solid #D0D7DE;
        font-family: var(--defaultFont);
        cursor: pointer;
    }
`;
