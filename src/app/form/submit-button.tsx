"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} className="bg-blue-500 text-white px-4 py-2 rounded-md">
      Create Event
    </button>
  )
}