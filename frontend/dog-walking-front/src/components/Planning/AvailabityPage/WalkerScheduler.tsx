import { Center, Heading } from "@chakra-ui/react";
import SchedulerCalendar from "scheduler-calendar";
import "scheduler-calendar/dist/index.css";
import { AvailabilitiesData } from "../../../store/availabilitiesSlice";
import { headerFontSize } from "../PlanningDimensions";

const sortByStartTime = (
  availabities: { slots: { from: string; to: string }[] }[]
) => {
  availabities.forEach((a) =>
    a.slots.sort((x, y) => (x.from > y.from ? 1 : -1))
  );
};

const availabilitiesToCalendarType = (
  availabilities: AvailabilitiesData[]
): CalendarType[] => {
  let calendar: { [key: string]: [{ from: string; to: string }] } = {};
  availabilities.forEach((a) => {
    var date = new Date(a.startTime);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    var dateString = year + "-" + month + "-" + day;

    var startTimeHour = new Date(a.startTime).getHours();
    var startTimeMinute = new Date(a.startTime).getMinutes();
    var startTime = `${startTimeHour.toString().padStart(2, "0")}:${startTimeMinute.toString().padStart(2, "0")}`;

    var endTimeHour = new Date(a.endTime).getHours();
    var endTimeMinute = new Date(a.endTime).getMinutes();
    var endTime = `${endTimeHour.toString().padStart(2, "0")}:${endTimeMinute.toString().padStart(2, "0")}`;
    if(calendar[dateString] === undefined) 
    {
      //@ts-ignore
      calendar[dateString] = [];
    }
    calendar[dateString].push({ from: startTime, to: endTime });
  });
  
  return Object.keys(calendar).map((key) => {
    return {
      day: key,
      slots: calendar[key],
      comment: '',
    };
  });
};

const calendarTypeToAvailabilities = (availabilities: CalendarType[]) => {
  console.log(availabilities);
  const transformedAvailabilities: AvailabilitiesData[] = [];
  availabilities.forEach((a) => {
    a.slots.forEach((b) =>
      transformedAvailabilities.push({
        walkerId: -1,
        startTime: a.day + "T" + b.from + ":00",
        endTime: a.day + "T" + b.to +":00",
        latitude: -1,
        longitude: -1,
        radius: -1,
      })
    );
  });
  return transformedAvailabilities;
};

interface WalkerSchedulerProps {
  availabities: AvailabilitiesData[];
  setAvailabites: React.Dispatch<React.SetStateAction<AvailabilitiesData[]>>;
}

interface CalendarType {
  day: string;
  slots: {
    from: string;
    to: string;
  }[];
}

const WalkerScheduler = ({
  availabities,
  setAvailabites,
}: WalkerSchedulerProps) => {
  return (
    <>
      <Heading as={Center} py="30px" fontSize={headerFontSize} color="white">
        Change Your Availabity
      </Heading>
      <SchedulerCalendar
        availabilities={availabilitiesToCalendarType(availabities)}
        availabilityType={"infinity"}
        duration={10}
        onIntervalChange={(newValues: CalendarType[]) => {
          sortByStartTime(newValues);
          setAvailabites(calendarTypeToAvailabilities(newValues));
        }}
        is24hour
        isCommentEnabled
        initialRenderOfRows={1}
        totalNumOfRows={3}
      />
    </>
  );
};

export default WalkerScheduler;
