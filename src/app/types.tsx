export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
export interface Event {
  title: string,
  date: Date,
  image_url: string,
  ticket_price: string,
  ticket_link: string,
  doors_open: string,
  start_time: string,
  appovalStatus: ApprovalStatus,
  address: string,
  description: string,
  venue_name: string
}

export type EventArray = Event[];
