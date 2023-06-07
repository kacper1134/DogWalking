import {
  Card,
  Center,
  Box,
  VStack,
  Text,
  Spacer,
  HStack,
  Image,
  Avatar,
  Flex,
  useBreakpointValue,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Rating } from "react-simple-star-rating";
import { DogData } from "../../../store/dogsApiSlice";
import {
  useDeleteWalkMutation,
  useGetWalkQuery,
  useStartWalkMutation,
  WalkDetailsType,
} from "../../../store/walkApiSlice";
import TextEditor from "../../common/TextEditor";
import PageSelector from "../../Planning/BookingPage/PageSelector";
import { calculateAge } from "../../Profile/DogSection/DogCard";
import {
  dogFontSize,
  dogImageRadius,
} from "../../Profile/DogSection/DogDimensions";
import {
  walkDetailsCardHeight,
  walkDetailsCardWidth,
  walksDetailsFontSize,
  walksDetailsImageSize,
  walksDetailsRatingSize,
} from "../HistoryDimensions";
import { setWalkStatus } from "../Walks/Walks";
import WalkMap from "./WalkMap";

const WalkDetails = () => {
  const { walkId } = useParams();
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1541952188281-d960f03c5ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  const { data: walkDetails } = useGetWalkQuery(walkId!);
  const [deleteWalkTrigger] = useDeleteWalkMutation();
  const [startWalkTrigger] = useStartWalkMutation();

  const [walkInfo, setWalkInfo] = useState<WalkDetailsType>();
  const [dogs, setDogs] = useState<DogData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [review, setReview] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const showToast = (title: string, description: string) => {
    toast({
      title,
      description,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/login");
  };

  const cancelWalk = () => {
    deleteWalkTrigger("" + walkDetails?.walkId!).then(() => {
      showToast("Cancel walk", "Walk was canceled sucessfully!");
      navigate("../");
    });
  };

  const startWalk = () => {
    startWalkTrigger({
      walkId: "" + walkDetails?.walkId!,
      lat: 51.1079,
      lng: 17.0385,
    }).then(() => {
      showToast("Start walk", "Walk was started sucessfully!");
      navigate("../");
    });
  };

  const saveReview = () => {
    showToast("Review", "Review was saved sucessfully!");
    navigate("../");
  };

  useEffect(() => {
    if (walkDetails !== undefined) {
      const details: WalkDetailsType = { ...walkDetails, status: "Planned" };
      //@ts-ignore
      setWalkStatus(details);
      setWalkInfo(details);
      setDogs(details.dogs);
    }
  }, [walkDetails]);

  return (
    <Flex
      flexGrow="10000"
      overflow="hidden"
      minW="100%"
      minH="100%"
      color="black"
      px="5"
      bg="primary.300"
      bgImage={`linear-gradient(90deg, rgba(112,34,221,0.4) 0%, rgba(139,88,225,0.4) 50%, rgba(148,187,233,0.4) 100%), url(${backgroundImageUrl})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      as={Center}
      direction={{ base: "column", md: "row" }}
    >
      {walkInfo !== undefined && (
        <Card
          w={walkDetailsCardWidth}
          h={walkDetailsCardHeight}
          bg="white"
          boxShadow="dark-lg"
          rounded="xl"
          as={Center}
          alignItems="flex-start"
          m="20px"
        >
          <VStack color="black" alignItems="flex-start" p="20px" spacing={5}>
            <>
              <Text color="primary.600" fontSize={walksDetailsFontSize}>
                <strong>Owner</strong>: {walkInfo?.owner.firstName}{" "}
                {walkInfo?.owner.lastName}
              </Text>
              <Text color="primary.600" fontSize={walksDetailsFontSize}>
                <strong>Walker</strong>: {walkInfo?.walker.firstName}{" "}
                {walkInfo?.walker.lastName}
              </Text>
              <Text color="primary.600" fontSize={walksDetailsFontSize}>
                <strong>Start</strong>:{" "}
                {walkInfo?.startTime.split("T").join(" ")}
              </Text>
              <Text color="primary.600" fontSize={walksDetailsFontSize}>
                <strong>Status</strong>: {walkInfo?.status}
              </Text>
              <Text
                color="primary.600"
                fontWeight="bold"
                fontSize={walksDetailsFontSize}
              >
                Dogs:
              </Text>
            </>
            {dogs.length > 0 && <DogCard dog={dogs[currentPage]} />}
            <Box>
              <PageSelector
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalNumberOfPages={dogs.length}
              />
            </Box>
            {walkInfo?.status === "Awaiting payment" && (
              <PaymentButton walkId={walkInfo.walkId} />
            )}
            {walkInfo?.status === "Planned" && (
              <HStack>
                <CancelWalkButton cancelWalk={cancelWalk} />
                <StartWalkButton startWalk={startWalk} />
              </HStack>
            )}
          </VStack>
        </Card>
      )}
      {walkInfo !== undefined && walkInfo?.status === "Completed" && (
        <ReviewCard
          review={review}
          setReview={setReview}
          saveReview={saveReview}
        />
      )}
      {walkInfo !== undefined && walkInfo?.status === "In progress" && (
        <WalkMap walk={walkInfo} />
      )}
    </Flex>
  );
};

interface DogCardProps {
  dog: DogData;
}

const DogCard = ({ dog }: DogCardProps) => {
  return (
    <Card bg="white" py="20px" px="20px" mx="20px" borderRadius="20px">
      <HStack h="100%">
        <Image
          src={
            dog.imageUrl ??
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          w={walksDetailsImageSize}
          h={walksDetailsImageSize}
          objectFit="cover"
          objectPosition="top"
          borderRadius={dogImageRadius}
          fallback={
            <Center h="100%">
              <Avatar size="xl" />
            </Center>
          }
        />
        <VStack h="100%">
          <VStack w="100%" px="10px" align="start">
            <Text fontSize={dogFontSize} color="primary.800" textStyle="h2">
              {dog.name}
            </Text>
            <Spacer />
            <Text fontSize={dogFontSize} color="primary.800" textStyle="p">
              {calculateAge(dog.birthday)} years old
            </Text>
          </VStack>
        </VStack>
      </HStack>
    </Card>
  );
};

interface ReviewCardProps {
  review: string;
  setReview: React.Dispatch<React.SetStateAction<string>>;
  saveReview: () => void;
}

const ReviewCard = ({ review, setReview, saveReview }: ReviewCardProps) => {
  const [rating, setRating] = useState(0);
  return (
    <Card
      bg="white"
      boxShadow="dark-lg"
      rounded="xl"
      w={walkDetailsCardWidth}
      p="20px"
    >
      <Text
        color="primary.600"
        fontWeight="bold"
        fontSize={walksDetailsFontSize}
        pb="10px"
      >
        Review:
      </Text>
      <Rating
        emptyStyle={{ display: "flex" }}
        fillStyle={{ display: "-webkit-inline-box" }}
        style={{ marginBottom: "20px" }}
        allowFraction
        fillColor="purple"
        initialValue={rating}
        onClick={(value) => setRating(value)}
        size={useBreakpointValue(walksDetailsRatingSize)!}
      />
      <TextEditor
        content={review}
        setContent={setReview}
        fontSize={useBreakpointValue(dogFontSize)!}
      />
      <Button
        colorScheme="primary"
        color="white"
        mt="20px"
        fontSize={walksDetailsFontSize}
        onClick={saveReview}
      >
        Save
      </Button>
    </Card>
  );
};

interface PaymentButtonProps {
  walkId: number;
}

const PaymentButton = ({ walkId }: PaymentButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      colorScheme="primary"
      color="white"
      fontSize={walksDetailsFontSize}
      onClick={() => navigate(`../payment/${walkId}`)}
    >
      Pay Now
    </Button>
  );
};

interface CancelWalkButtonProps {
  cancelWalk: () => void;
}

const CancelWalkButton = ({ cancelWalk }: CancelWalkButtonProps) => {
  return (
    <Button
      colorScheme="primary"
      color="white"
      fontSize={walksDetailsFontSize}
      onClick={cancelWalk}
    >
      Cancel
    </Button>
  );
};

interface StartWalkButtonProps {
  startWalk: () => void;
}

const StartWalkButton = ({ startWalk }: StartWalkButtonProps) => {
  return (
    <Button
      colorScheme="green"
      color="white"
      fontSize={walksDetailsFontSize}
      onClick={startWalk}
    >
      Start Walk
    </Button>
  );
};

export default WalkDetails;
