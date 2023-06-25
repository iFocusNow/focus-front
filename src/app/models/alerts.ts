export interface Alert {
  id: string;
  child_id: string;
  type: 'block_entry' | 'solicit_unblock' | 'phone_time_exceeded';
  created_at: string;
  read_at: string;
}
