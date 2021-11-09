import { IAppointment, IProvider, IEpisode, IChatMessage, User } from '../interfaces';
import { DataContext, IDataContext } from '../contexts/DataContext';
import { useContext, useEffect, useState } from 'react';

export class Episode implements IEpisode {
  id: number = 0;

  participants: User[] = [];
  messages: IChatMessage[] = [];
  providerId: number = 0;

  constructor(episode: IEpisode, public appointments: IAppointment[], public provider: IProvider) {
    Object.assign(this, episode);
  }
}

export const useEpisodes = () => {
  const { data, session } = useContext<IDataContext>(DataContext);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    if (session) {

      const getEpisodesByUser = (userId: number): Episode[] => {
        const userEpisodes = data.episodes.filter(episode => {
          return episode.participants.find((user) => user.id === userId) !== undefined;
        });

        const episodes: Episode[] = userEpisodes.map((episode) => {
          const participants = episode.participants.map((participant) => User.create(participant));
          const provider = data.providers.find((provider) => provider.id === episode.providerId)!;
          const appointments = data.appointments.filter((appt) => episode.id === appt.episodeId) ?? [];
          episode.participants = participants;
          return new Episode(episode, appointments, provider);
        });

        return episodes;
      }

      const userEpisodes = getEpisodesByUser(session.id);
      setEpisodes(userEpisodes);

    } else {
      setEpisodes([]);
    }
  }, [session, data.episodes, data.providers, data.appointments]);

  return { episodes, setEpisodes, activeEpisode, setActiveEpisode };
}

export default useEpisodes;
