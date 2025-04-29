export interface GoLiveDateProps {
  title: string;
  subtitle: string;
  paragraph: string;
  engineerLink: string;
  availableDatesLabel: string;
  timeSlotLabel: string;
  datePickerPlaceholder: string;
  timeSlotPlaceHolder: string;
  continueButtonText: string;
}

export const goLiveDateText: GoLiveDateProps = {
  title: "Your go-live Date",
  subtitle:
    "This is the earliest date we can connect you to our full fibre. If this date doesn't suit you, pick another below.",
  paragraph:
    "You won't need to be at the property on this date, unless we need to send an engineer to set up your connection. We'll let you know in the next step.",
  engineerLink: "What happens if I need an engineer?",
  availableDatesLabel: "Choose your go live date",
  datePickerPlaceholder: "Select an installation date...",
  timeSlotLabel:
    "Please note, our engineers operate Monday - Saturday, between the hours of 8am - 6pm. ",
  timeSlotPlaceHolder: "Select a timeslot",
  continueButtonText: "Continue to payment",
};
