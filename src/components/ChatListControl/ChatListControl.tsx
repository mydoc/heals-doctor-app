import { Episode, IUser } from "../../interfaces";
import ChatCard from "../ChatCard/ChatCard";
import { Wrapper } from "./ChatListControl.styles";


interface ChatListControlProps  {
    episodes: Episode[] | null;
    activeEpisode: Episode | null;
    session: IUser | null;
    onSelect: (e: Episode) => void;
}

const ChatListControl = ({episodes, activeEpisode, session, onSelect}: ChatListControlProps) => {
    if(episodes) return (
        <Wrapper>
        {episodes?.map((episode) => (
            <ChatCard key={episode.id} isActive={episode.id === activeEpisode?.id } episode={episode} session={session!} onClick={ (e) => onSelect(e) }/>
        ))}
        </Wrapper>
    )

    return <>No Episodes</>
}

export default ChatListControl;