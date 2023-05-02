export interface Alert {
	id: number;
	child_id: number;
	type: 'block entry'| 'solicit unblock' |'phone time exceeded';
	created_at: string;
	read_at: string;
}