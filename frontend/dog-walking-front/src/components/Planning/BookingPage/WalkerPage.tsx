import {
  Text,
  Heading,
  HStack,
  useBreakpointValue,
  VStack,
  Card,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { Rating } from "react-simple-star-rating";
import { fontSize, fontSmallSize } from "../PlanningDimensions";
import parser from "html-react-parser";
import { useEffect, useState } from "react";
import PageSelector from "./PageSelector";
import { UserData } from "../../../store/userApiSlice";

export interface Walker {
  name: string;
  surname: string;
  email: string;
  phone: string | undefined;
  reviews: { rating: number; date: Date; content: string }[];
  position: { lat: number; lng: number };
}

interface WalkerPageProps {
  walkerData: UserData;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const getAverageRating = (walker: UserData) => {
  var sum = 0;
  const reviews = walker.walkerWalks.filter(w => w.content !== null);
  reviews.forEach((review) => (sum += review.rating));
  if (sum === 0) return 0;
  return sum / reviews.length;
};

const WalkerPage = ({ walkerData, setCurrentStep }: WalkerPageProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const walks = walkerData.walkerWalks.filter(w => w.content !== null);
  useEffect(() => {
    setCurrentPage(0);
  }, [setCurrentPage, walkerData]);

  return (
    <VStack
      color="black"
      flexGrow={10000}
      minHeight="100%"
      textStyle="p"
      p="1%"
    >
      <HStack h="20%">
        <Heading fontSize={fontSize} textStyle="p" mt="5px">
          {walkerData.firstName + " " + walkerData.lastName}
        </Heading>
        <StarRating value={getAverageRating(walkerData)} />
      </HStack>
      {walks.length > 0 && (
        <Card
          width="80%"
          overflow="auto"
          flexGrow={10000}
          maxH={{ base: "30vh", lg: "40vh" }}
          p="2%"
          bg="primary.50"
        >
          <HStack>
            <StarRating value={walks[currentPage].rating} />
            <Spacer />
            <Text
              fontSize={fontSmallSize}
              fontWeight="bold"
              color="primary.700"
            >
              {new Date(Date.now()).toLocaleString()}
            </Text>
          </HStack>
          <Text color="black" pt="10px">
            {parser(walks[currentPage].content)}
          </Text>
        </Card>
      )}
      {walks.length === 0 && (
        <>
          <Text fontSize={fontSize}>No reviews yet!</Text>
          <Spacer />
        </>
      )}
      <HStack w="80%" h="20%">
        <PageSelector
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalNumberOfPages={walks.length}
        />
        <Spacer />
        <Button
          colorScheme="primary"
          color="white"
          fontSize={fontSize}
          paddingX={1.7 * useBreakpointValue(fontSize)!}
          onClick={() => setCurrentStep(2)}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

interface StarRatingProps {
  value: number;
}

const StarRating = ({ value }: StarRatingProps) => {
  return (
    <Rating
      emptyStyle={{ display: "flex" }}
      fillStyle={{ display: "-webkit-inline-box" }}
      readonly
      size={useBreakpointValue(fontSize)}
      allowFraction
      initialValue={value}
      fillColor="purple"
    />
  );
};

export default WalkerPage;
