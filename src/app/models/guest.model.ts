export interface Guest {
    name: string;
    email: string;
    rsvpStatus: 'Attending' | 'Not Attending' | 'Maybe';
}