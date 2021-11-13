import { User, Episode, ChatMessage, IUser } from '../interfaces';
import { DataContext, IDataContext } from '../contexts/DataContext';
import { useContext, useEffect, useState } from 'react';

export const useEpisodes = (session: IUser | null) => {
  const { data } = useContext<IDataContext>(DataContext);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    if (session?.id) {

      const getEpisodesByUser = (userId: number): Episode[] => {
        const userEpisodes = data.episodes.filter(episode => {
          return episode.participants.find((user) => user.id === userId) !== undefined;
        });

        const episodes: Episode[] = userEpisodes.map((episode) => {
          const participants = episode.participants.map((participant) => new User(participant));
          const provider = data.providers.find((provider) => provider.id === episode.providerId)!;
          const appointments = data.appointments.filter((appt) => episode.id === appt.episodeId) ?? [];
          const messages = episode.messages.map((m) => new ChatMessage(m, participants.find(p => p.id === m.userId)!));
          episode.participants = participants;
          return new Episode(episode, appointments, provider, messages, participants);
        });

        return episodes;
      }

      const userEpisodes = getEpisodesByUser(session.id);

      setEpisodes(userEpisodes);

      if(userEpisodes.length > 0) setActiveEpisode(userEpisodes[0]);

    } else {
      setEpisodes([]);
    }
  }, [session, data]);

  useEffect(() => {
    if (activeEpisode) {
      setEpisodes(prev => prev.map(e => e.id === activeEpisode.id ? activeEpisode : e));
    }
  }, [activeEpisode])


  const addMessage = (message: ChatMessage) => {
    setActiveEpisode((prev) => { return { ...prev!, messages: [...prev!.messages, message] } });
  }

  const selectActiveEpisode = (episode: Episode) => {
    setActiveEpisode(episode);
  }

  return {
    episodes, activeEpisode,
    selectActiveEpisode, addMessage
  };
}

export default useEpisodes;
