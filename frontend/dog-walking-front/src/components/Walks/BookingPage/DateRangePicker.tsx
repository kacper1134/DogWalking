import ReactDatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { BsCalendarHeartFill } from "react-icons/bs";
import { fontSize } from "../WalksDimensions";

interface DateRangePickerProps {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if(isOpen) {
        const element: any = document.getElementsByClassName("date-picker").item(0);
        element.click();
    }
  }, [isOpen]);

  return (
    <>
      <Button onClick={handleClick} colorScheme="primary" fontSize={fontSize}>
        <Icon mr="4" as={BsCalendarHeartFill} />
        {(endDate ? "From " : "") + startDate.toDateString() +
          (!endDate ? "" : " to " + endDate.toDateString())}
      </Button>
      {isOpen && (
        <ReactDatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          withPortal
          minDate={new Date()}
          todayButton="Today"
          className="date-picker"
          portalId="root-portal"
          onCalendarClose={() => setIsOpen(false)}
        />
      )}
      {isOpen}
    </>
  );
};

export default DateRangePicker;
