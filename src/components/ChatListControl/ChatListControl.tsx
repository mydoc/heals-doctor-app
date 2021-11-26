import { useState } from "react";
import { Episode } from "../../interfaces/episode";
import { IUser } from "../../interfaces/user";
import ChatCard from "../ChatCard/ChatCard";
import PropertiesControl from "../PropertiesControl/PropertiesControl";
import SlideOut from "../../braincase/Form/SlideOut/SlideOut";
import { Wrapper, Content, ContentEmpty } from "./ChatListControl.styles";


interface ChatListControlProps  {
    episodes: Episode[] | null;
    activeEpisode: Episode | null;
    session: IUser | null;
    onSelect: (e: Episode) => void;
}

const ChatListControl = ({episodes, activeEpisode, session, onSelect}: ChatListControlProps) => {

    const [isSlideOut, setIsSlideOut] = useState(false);

    const handleMore = (e: Episode) => {
        setIsSlideOut(true);
        onSelect(e);
    }

    if (episodes && episodes.length > 0) return (
        <Wrapper>
            <Content>
            {episodes?.map((episode) => (
            <ChatCard
                key={episode.id}
                isActive={episode.id === activeEpisode?.id }
                episode={episode}
                session={session!}
                onClick={ (e) => onSelect(e) }
                onMore={(e) => handleMore(e) }
            />
            ))}
            </Content>
            <SlideOut title='Properties' open={isSlideOut} onClose={() => setIsSlideOut(false)}>
                <PropertiesControl instance={activeEpisode} />
            </SlideOut>
        </Wrapper>
    )

    return <Wrapper><ContentEmpty>No Episodes</ContentEmpty></Wrapper>
}

export default ChatListControl;
