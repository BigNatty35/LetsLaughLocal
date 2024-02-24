export type ApprovalStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

// Ensure that the above definition matches the actual definition of ApprovalStatus
// used in the getPendingEvents() objects.

export type eventType = {
  id: number,
  title: string | null,
  date: Date | null,
  image_url: string | null,
  ticket_price: string | null,
  ticket_link: string | null,
  doors_open: string | null,
  start_time: string,
  approvalStatus: ApprovalStatus
  address: string | null,
  description: string | null,
  venue_name: string | null
}

export type openMicType = {
  id: number,
  title: string | null,
  startTime: string | null,
  signupTime: string | null,
  day: string | null,
  city: string | null,
  info: string | null,
  frequency: string | null,
  address: string | null,
  signupForm: string | null, 
}

export type EventArray = Event[];
