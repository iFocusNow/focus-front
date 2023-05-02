export interface Alert {
	id: number;
	parent_id: number;
	type: 'block entry'| 'solicit unblock' |'phone time exceeded';
	created_at: string;
	read_at: string;
	message: string;
}