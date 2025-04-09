export interface GoLiveDateProps {
  title: string;
  subtitle: string;
  availableDatesLabel: string;
  timeSlotLabel: string;
  datePickerPlaceholder: string;
  backButtonText: string;
  continueButtonText: string;
}

export const goLiveDateText: GoLiveDateProps = {
  title: "Choose Your Go Live Date",
  subtitle: "Select when you'd like your broadband service to be activated",
  availableDatesLabel: "Available Dates",
  timeSlotLabel: "Select morning or afternoon",
  datePickerPlaceholder: "Select an installation date...",
  backButtonText: "Back",
  continueButtonText: "Continue to payment",
};
