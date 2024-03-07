import { z } from "zod";
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


export const EventSchema = z.object({
  title: z.string().trim().min(3, {
    message: "Title must at least be 1 chararcter long."
  }).max(100, {
    message: "Title must not be longer than 100 characters."
  }),
  date: z.date(),
  start_time: z.string(),
  doors_open: z.string(),
  venue_name: z.string(),
  address: z.string(),
  image_url: z.custom<File>(),
  ticket_url: z.string().optional(),
  ticket_price: z.string().optional(),
  description: z.string().trim().min(10, {
    message: "Description must at least be 10 chararcters long."
  }).max(400, {
    message: "Title must not be longer than 400 characters."
  }),
}).refine(data => {
  const doorsOpenTime = data.doors_open;
  const startTime = data.start_time;
  return startTime >= doorsOpenTime;
}, {
  message: "Start Time can't be before Doors Open time.",
  "path": ["start_time"]
}).refine(data => {
  const today = new Date();
  return data.date > today;
}, {
  message: "You can't pick a date in the past",
  "path": ["date"]
})

export const OpenMicSchema = z.object({
  title: z.string().trim().min(3, {
    message: "Title Must be at least 3 characters long."
  }),
  address: z.string().trim(),
  city: z.string().trim(),
  signupTime: z.string().trim().optional(),
  startTime: z.string().trim(),
  day: z.string().trim(),
  frequency: z.string().trim(),
  info: z.string().min(10, {
    message: "Info must be at least 10 characters"
  }),
  signupForm: z.string(),
})

export type Event = z.infer<typeof EventSchema>

export type OpenMic = z.infer<typeof OpenMicSchema>

export type EventArray = Event[];


