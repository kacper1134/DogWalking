import { Center, Heading } from "@chakra-ui/react";
import { useState } from "react";
import SchedulerCalendar from "scheduler-calendar";
import "scheduler-calendar/dist/index.css";

const sortByStartTime = (
  availabities: { slots: { from: string; to: string }[] }[]
) => {
  availabities.forEach((a) =>
    a.slots.sort((x, y) => (x.from > y.from ? 1 : -1))
  );
};

interface WalkerSchedulerProps {
  availabities: any[];
  setAvailabites: React.Dispatch<React.SetStateAction<any[]>>;
}

const WalkerScheduler = ({availabities, setAvailabites}: WalkerSchedulerProps) => {
  return (
    <>
      <Heading as={Center} py="30px" fontSize={25} color="white">
        Change Your Availabity
      </Heading>
      <SchedulerCalendar
        availabilities={availabities}
        availabilityType={"infinity"}
        duration={10}
        onIntervalChange={(newValues) => {
          sortByStartTime(newValues);
          setAvailabites(newValues);
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
