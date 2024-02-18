export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
export type eventType = {
  title: string | null,
  date: Date | null,
  image_url: string | null,
  ticket_price: string | null,
  ticket_link: string | null,
  doors_open: string | null,
  start_time: string,
  approvalStatus: ApprovalStatus | null,
  address: string | null,
  description: string | null,
  venue_name: string | null
}

export type EventArray = Event[];
