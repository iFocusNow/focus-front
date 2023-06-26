export interface Alert {
  id: string;
  child_id: string;
  type: 'BLOCK_ENTRY' | 'SOLICIT_UNBLOCK' | 'PHONE_TIME_EXCEEDED';
  created_at: string;
  read_at: string;
}
