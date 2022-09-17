import styled from 'styled-components';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { MdMenu } from 'react-icons/md';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { MdAccountBox } from 'react-icons/md';
import { FaFilePrescription } from 'react-icons/fa';
import { FaFolder } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa';
import { ImLab } from 'react-icons/im';
import { AiFillFile } from 'react-icons/ai';
import { BsFillChatFill } from 'react-icons/bs';

//import { CDockForm, DockManager, RenderEvent, useDockManager } from '@jakesee/react-dockpanel/dist';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`

    position: absolute;
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 65px 1fr;
`

const MainNav = styled.div`
    background-color: #123764;

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
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 400px 1fr;
`

const PanelWrapper = styled.div`
    border-left: 3px solid #E0E0E0;
    background-color: #F7F7F7;
`

const TitleBar = styled.div`
    font-weight: bold;
    padding: 16px;
    border-bottom: 2px solid #E0E0E0;
    background-color: white;
    color: #292929;
`

const PanelContentWrapper = styled.div`

`

const ProfileCard = styled.div`
    background-color: white;

    .title {

        background-color: #CBDDF6;
        color: #white;
        font-weight: bold;
        padding: 5px;
    }

    table {
        text-align: left;
        border-collapse: collapse;
        width: 100%;

        th, td {
            padding: 5px;
            border-bottom: 1px solid #efefef;
            font-weight: normal;
        }
    }
`

const HistoryToolBar = styled.ul `

    margin: 0;
    padding: 0;

    li {
        list-style: none;
        display: inline-block;
        padding: 15px;
        color: #C8C8C8;

        :hover {
            background-color: white;
        }

        .current {

        }
    }

    li.current {
        color: #292929;
    }

`

const Card = styled.div`
    background-color: white;
    -webkit-box-shadow: 8px 8px 20px -8px rgba(41,41,41,0.43);
    box-shadow: 8px 8px 20px -8px rgba(41,41,41,0.43);
`

const PanelContentWrapperForConsultation = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr min-content;
`


export const DockSystem = () => {

    const [current, setCurrent] = useState('casenote');


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
                <PanelWrapper>
                    <TitleBar>
                        Patient Profile Summary
                    </TitleBar>
                    <PanelContentWrapper>
                        <ProfileCard>
                            <div className="title">Profile</div>
                            <table>
                                <tr><th>Name</th><td>Jake See</td></tr>
                                <tr><th>Age</th><td>23</td></tr>
                                <tr><th>Nationality</th><td>Singaporean</td></tr>
                                <tr><th>Gender</th><td>Male</td></tr>
                                <tr><th>Insurance</th><td>Prudential Assurance</td></tr>
                                <tr><th>Contact No.</th><td>+65 90845751</td></tr>
                            </table>
                        </ProfileCard>

                        <HistoryToolBar>
                            <li className={current == 'casenote' ? 'current' : undefined } onClick={() => setCurrent('casenote')}><FaFolder style={{ fontSize: '1.6rem', cursor: 'pointer'}} /></li>
                            <li className={current == 'rx' ? 'current' : undefined } onClick={() => setCurrent('rx')}><FaFilePrescription style={{ fontSize: '1.6rem', cursor: 'pointer' }} /></li>
                            <li className={current == 'lab' ? 'current' : undefined } onClick={() => setCurrent('lab')}><ImLab style={{fontSize: '1.6rem', cursor: 'pointer'}} /></li>
                            <li className={current == 'file' ? 'current' : undefined } onClick={() => setCurrent('file')}><AiFillFile style={{fontSize: '1.6rem', cursor: 'pointer'}} /></li>
                            <li className={current == 'chat' ? 'current' : undefined } onClick={() => setCurrent('chat')}><BsFillChatFill style={{fontSize: '1.6rem', cursor: 'pointer'}} /></li>
                        </HistoryToolBar>

                    </PanelContentWrapper>
                </PanelWrapper>
                <PanelWrapper>
                    <TitleBar>
                        Current Consultation
                    </TitleBar>
                    <PanelContentWrapperForConsultation>
                        <div>
                            <div>Consultation Record</div>
                            <div>

                            </div>
                        </div>
                        <div>
                            <div>Billing Summary</div>
                            <div>

                            </div>
                        </div>
                    </PanelContentWrapperForConsultation>
                </PanelWrapper>
            </ContentWrapper>
        </Wrapper>
    </>
}
