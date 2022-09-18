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
    grid-template-columns: 65px 1fr;
`

const MainNav = styled.div`
    background-color: #123764;
    overflow-y: scroll;
    overflow-x: hidden;

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

const PanelWrapper = styled.div`
    background-color: #F7F7F7;
    position: relative;
    height: 100%;
    overflow: hidden;

    display: grid;
    grid-template-columns: auto;
    grid-template-rows: min-content 1fr;
`

const TitleBar = styled.div`
    font-weight: bold;
    padding: 16px;
    border-bottom: 2px solid #E0E0E0;
    background-color: white;
    color: #292929;
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
                    <li><div><MdMenu style={{fontSize: '1.6rem'}} /></div><div>Menu</div></li>
                    <li><div><FavoriteTwoToneIcon /></div><div>Favorite</div></li>
                    <li><div><VideoCameraFrontIcon /></div><div>Video</div></li>
                    <li><div><MdAccountBox style={{ fontSize: '1.6rem' }} /></div><div>Account</div></li>
                </ul>
            </MainNav>
            <ContentWrapper>
                <ConsultationManager />
            </ContentWrapper>
        </Wrapper>
    </>
}
