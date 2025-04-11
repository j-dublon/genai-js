import { DatePicker } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const getDates = (): Date[] => {
  const dates = [];
  const today = new Date();

  for (let i = 3; i < 25; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    dates.push(date);
  }

  return dates;
};

const DatePickerWithState = () => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <DatePicker
      availableDates={getDates()}
      selectedDate={selectedDate}
      onDateSelect={(date: string | undefined) => {
        if (date) setSelectedDate(date);
      }}
    />
  );
};

const meta = {
  title: "atoms/datePicker",
  component: DatePickerWithState,
  tags: ["autodocs"],
} satisfies Meta<typeof DatePickerWithState>;

export default meta;
type Story = StoryObj<typeof DatePickerWithState>;

export const DatePickerStory: Story = {
  name: "Date Picker",
};
