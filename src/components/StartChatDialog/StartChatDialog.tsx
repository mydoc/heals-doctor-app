import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, ListItem, TextField } from "@mui/material";
import { useState } from "react";
import { IUser } from "../../interfaces";
import { ParticipantList, SelectedList } from "./StartChatDialog.styles";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface StartChatDialogProps {
    open: boolean,
    onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void,
    participants: IUser[]
}

const StartChatDialog = ({ open, onClose, participants }: StartChatDialogProps) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState<IUser[]>([]);

    const filteredParticipants = (): IUser[] => {

        const selectedIds = selectedParticipants.map(p => p.id);

        const unselectedParticipants = participants.filter(p => !selectedIds.includes(p.id));

        if (!searchTerm) return unselectedParticipants;

        return unselectedParticipants.filter(p => {
            const regex = new RegExp(searchTerm, 'gi');
            const name = `${p.firstName} ${p.lastName}`;
            return regex.test(name);
        });
    }

    const onAddParticipant = (participant: IUser) => {
        setSelectedParticipants(prev => [
            ...prev,
            participant
        ]);
        setSearchTerm('');
    }

    const onRemoveParticipant = (participant: IUser) => {
        setSelectedParticipants(prev => prev.filter(p => p.id !== participant.id));
    }

    const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        onClose(event, reason);
        setSelectedParticipants([]);
    }

    return (
        <Dialog open={open} onClose={handleClose}
            fullWidth
            maxWidth='xs'
            scroll="paper"
        >
            <DialogTitle>Start Chat Episode</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                        Select chat participants
                    </DialogContentText> */}
                <SelectedList>
                {selectedParticipants.map(p => (
                        <Chip key={p.id}
                            label={`${p.firstName} ${p.lastName}`}
                            onDelete={() => onRemoveParticipant(p)}
                        />
                ))}
                </SelectedList>
                <TextField
                    multiline
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Doctor or Concierge"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.currentTarget.value)}
                    autoComplete='off'
                />
                <ParticipantList>
                {filteredParticipants().map(u => (
                    <div key={u.id} className="participant-card">
                        <div className="avatar"><img src={u.imgUrl} alt={u.firstName} /></div>
                        <div className="info">
                            <div className="name">{`${u.firstName} ${u.lastName} (${u.id})`}</div>
                            <div className="email">{u.email}</div>
                        </div>
                        <div className="align-right">
                            <IconButton onClick={() => onAddParticipant(u)}><PersonAddIcon /></IconButton>
                        </div>
                    </div>
                ))}
                </ParticipantList>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleClose(e, 'backdropClick')}>Cancel</Button>
                <Button onClick={(e) => handleClose(e, 'backdropClick')}>Start</Button>
            </DialogActions>
        </Dialog>
    )
}


export default StartChatDialog;
