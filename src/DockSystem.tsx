import styled from 'styled-components';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { MdMenu } from 'react-icons/md';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { MdAccountBox } from 'react-icons/md';
import { User, UserRole } from './interfaces/user';
import { useEffect, useState } from 'react';
import { Database } from './Database';
import ConsultationManager from './ConsultationManager';


//import { CDockForm, DockManager, RenderEvent, useDockManager } from '@jakesee/react-dockpanel/dist';


const Wrapper = styled.div`

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: min-content 1fr;
`

const MainNav = styled.div`
    background-color: #293955;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 10px;

    ul {

        margin: 0;
        padding: 0;
        padding-top: 50px;

        display: grid;
        gap: 30px;

        li {

            margin: 0;
            padding: 0;
            list-style: none;

            display: grid;
            justify-items: center;
            align-items: center;

            cursor: pointer;


            div {
                color: white;
                padding: 0;
                margin: 0;
            }

            .icon-button {
                font-size: 2.4rem;
            }
        }
    }
`

const ContentWrapper = styled.div`

    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 400px 1fr;
`




export const DockSystem = () => {

    const [patient, setPatient] = useState<User>();

    useEffect(() => {
        setPatient(() => {
            const iuser = Database.users.find((u) => u.role === UserRole.patient);
            const user = new User(iuser!);
            return user;
        });
    }, []);

    return <>
        <Wrapper>
            <MainNav>
                <ul>
                    <li><div><MdMenu className="icon-button" /></div><div></div></li>
                    <li><div><FavoriteTwoToneIcon className="icon-button" /></div><div></div></li>
                    <li><div><VideoCameraFrontIcon className="icon-button" /></div><div></div></li>
                    <li><div><MdAccountBox className="icon-button" /></div><div></div></li>
                </ul>
            </MainNav>
            <ContentWrapper>
                <ConsultationManager />
            </ContentWrapper>
        </Wrapper>
    </>
}
