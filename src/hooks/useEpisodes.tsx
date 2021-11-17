import { DataContext, IDataContext } from '../contexts/DataContext';
import { useContext, useEffect, useState } from 'react';
import { IUser, User } from '../interfaces/user';
import { Message, Episode, Appointment } from '../interfaces/episode';

export const useEpisodes = (session: IUser | null) => {
  const { data } = useContext<IDataContext>(DataContext);

  // main state
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  // derived states
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (session?.id) {

      const getEpisodesByUser = (userId: number): [Episode[], Appointment[]] => {
        const userEpisodes = data.episodes.filter(episode => {
          return episode.participants.find((user) => user.id === userId) !== undefined;
        });

        const appointments: Appointment[] = [];
        const episodes: Episode[] = [];

        for (let i = 0; i < userEpisodes.length; i++) {
          const episode = userEpisodes[i];
          const _participants = episode.participants.map((participant) => new User(participant));
          const _provider = data.providers.find((provider) => provider.id === episode.providerId)!;
          const _appointments = data.appointments.filter((appt) => episode.id === appt.episodeId) ?? [];
          const _messages = episode.messages.map((m) => new Message(m, _participants.find(p => p.id === m.userId)!));
          episode.participants = _participants;
          const _episode = new Episode(episode, _appointments, _provider, _messages, _participants);

          // save the appointments
          appointments.push(..._appointments.map(a => new Appointment(a, _episode)));
          episodes.push(_episode);
        }

        appointments.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());

        return [episodes, appointments];
      }

      const [userEpisodes, userAppointments] = getEpisodesByUser(session.id);

      setEpisodes(userEpisodes);
      if (userEpisodes.length > 0) setActiveEpisode(userEpisodes[0]);
      setAppointments(userAppointments);

    } else {
      setEpisodes([]);
    }
  }, [session, data]);

  useEffect(() => {
    if (activeEpisode) {
      setEpisodes(prev => prev.map(e => e.id === activeEpisode.id ? activeEpisode : e));
    }
  }, [activeEpisode])


  const addMessage = (message: Message) => {
    setActiveEpisode((prev) => { return { ...prev!, messages: [...prev!.messages, message] } });
  }

  const selectActiveEpisode = (episode: Episode) => {
    setActiveEpisode(episode);
  }

  return {
    episodes, activeEpisode, appointments,
    selectActiveEpisode, addMessage
  };
}

export default useEpisodes;
