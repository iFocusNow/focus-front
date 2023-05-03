export interface Alert {
	id: number;
	parent_id: number;
	type: 'block_entry'| 'solicit_unblock' |'phone_time_exceeded';
	created_at: string;
	read_at: string;
}