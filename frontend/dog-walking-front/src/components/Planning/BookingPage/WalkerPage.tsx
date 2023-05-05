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

export interface Walker {
  name: string;
  surname: string;
  email: string;
  phone: string | undefined;
  reviews: { rating: number; date: Date; content: string }[];
  position: { lat: number; lng: number };
}

interface WalkerPageProps {
  walkerData: Walker;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const getAverageRating = (walker: Walker) => {
  var sum = 0;
  walker.reviews.forEach((review) => (sum += review.rating));
  if (sum === 0) return 0;
  return sum / walker.reviews.length;
};

const WalkerPage = ({ walkerData, setCurrentStep }: WalkerPageProps) => {
  const [currentPage, setCurrentPage] = useState(0);

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
          {walkerData.name + " " + walkerData.surname}
        </Heading>
        <StarRating value={getAverageRating(walkerData)} />
      </HStack>
      {walkerData.reviews.length > 0 && (
        <Card
          width="80%"
          overflow="auto"
          flexGrow={10000}
          maxH={{ base: "30vh", lg: "40vh" }}
          p="2%"
          bg="primary.50"
        >
          <HStack>
            <StarRating value={walkerData.reviews[currentPage].rating} />
            <Spacer />
            <Text
              fontSize={fontSmallSize}
              fontWeight="bold"
              color="primary.700"
            >
              {walkerData.reviews[currentPage].date.toLocaleString()}
            </Text>
          </HStack>
          <Text color="black" pt="10px">
            {parser(walkerData.reviews[currentPage].content)}
          </Text>
        </Card>
      )}
      {walkerData.reviews.length === 0 && (
        <>
          <Text fontSize={fontSize}>No reviews yet!</Text>
          <Spacer />
        </>
      )}
      <HStack w="80%" h="20%">
        <PageSelector
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalNumberOfPages={walkerData.reviews.length}
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
