import {
  Avatar,
  Box,
  Card,
  Center,
  HStack,
  Select,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  Image,
  Text,
  SimpleGrid,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { dogImageRadius } from "../Profile/DogSection/DogDimensions";
import PageSelector from "../Walks/BookingPage/PageSelector";
import {
  detailsFontSize,
  historyFontSize,
  iconSize,
  imageSize,
} from "./HistoryDimensions";
import { OWNER_WALKS, WALKER_WALKS } from "./WalksExampleInfo";
import { BiSortDown, BiSortUp } from "react-icons/bi";

const Walks = () => {
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1553174770-a37b22033c1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

  const ownerWalks = OWNER_WALKS;
  const walkerWalks = WALKER_WALKS;

  return (
    <VStack
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
    >
      <Center w="100%" h="100%" flexGrow="10000">
        <Tabs
          isFitted
          variant="line"
          colorScheme="primary"
          bg="white"
          maxW="100%"
          minH="70vh"
          flexGrow="10000"
          rounded="2xl"
          boxShadow="dark-lg"
        >
          <TabList mb="1em">
            <Tab fontSize={historyFontSize}>Owner Section</Tab>
            <Tab fontSize={historyFontSize}>Walker Section</Tab>
          </TabList>
          <TabPanels h="60vh">
            <TabPanel>
              <WalksHistory walks={ownerWalks} owner />
            </TabPanel>
            <TabPanel>
              <WalksHistory walks={walkerWalks} owner={false} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </VStack>
  );
};

const walkSelectionTypes = [
  "All",
  "Planned",
  "In progress",
  "Awaiting payment",
  "Completed",
];

interface WalksHistoryProps {
  owner: boolean;
  walks: WalkType[];
}

const orderWalks = (ascendingOrder: boolean, walks: WalkType[]): WalkType[] => {
  if (ascendingOrder) {
    return walks.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
  }
  return walks.sort((a, b) => (a.startTime > b.startTime ? -1 : 1));
};

const WalksHistory = ({ owner, walks }: WalksHistoryProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = useBreakpointValue({ base: 2, md: 4, xl: 6 })!;
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [ascendingSort, setAscendingSort] = useState(true);

  const transformedWalks = orderWalks(
    ascendingSort,
    walks.filter(
      (walk) => selectedFilter === "All" || walk.status === selectedFilter
    )
  );

  const displayedWalks = transformedWalks.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage, selectedFilter]);

  return (
    <VStack h="60vh">
      <HStack alignSelf="flex-end">
        <Select
          color="white"
          bgColor="primary.600"
          cursor="pointer"
          fontSize={historyFontSize}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {walkSelectionTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Box>
          {ascendingSort && (
            <Icon
              as={BiSortDown}
              boxSize={iconSize}
              cursor="pointer"
              onClick={() => setAscendingSort(false)}
            />
          )}
          {!ascendingSort && (
            <Icon
              as={BiSortUp}
              boxSize={iconSize}
              cursor="pointer"
              onClick={() => setAscendingSort(true)}
            />
          )}
        </Box>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacingY={10} py="10px">
        {displayedWalks.map((walk, index) => (
          <Walk key={index} walk={walk} owner={owner} />
        ))}
      </SimpleGrid>
      <Spacer />
      <Box alignSelf="flex-end">
        <PageSelector
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalNumberOfPages={Math.ceil(transformedWalks.length / itemsPerPage)}
        />
      </Box>
    </VStack>
  );
};

export interface WalkType {
  id: number;
  name: string;
  surname: string;
  startTime: string;
  status: "Planned" | "In progress" | "Awaiting payment" | "Completed";
}

interface WalkProps {
  owner: boolean;
  walk: WalkType;
}

const Walk = ({ owner, walk }: WalkProps) => {
  const statusImages: { [key: string]: string } = {
    Planned:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1468&q=80",
    "In progress":
      "https://images.unsplash.com/photo-1497005367839-6e852de72767?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80",
    "Awaiting payment":
      "https://images.unsplash.com/photo-1628527304948-06157ee3c8a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    Completed:
      "https://images.unsplash.com/photo-1613530498905-1b17a6f40547?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1375&q=80",
  };

  return (
    <Card
      py="20px"
      px="20px"
      mx="20px"
      borderRadius="20px"
      bgColor="primary.300"
      boxShadow="dark-lg"
      cursor="pointer"
    >
      <HStack h="100%">
        <Image
          src={
            statusImages[walk.status]
              ? statusImages[walk.status]
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          w={imageSize}
          h={imageSize}
          objectFit="cover"
          objectPosition="top"
          borderRadius={dogImageRadius}
          fallback={
            <Center h="100%">
              <Avatar size="xl" />
            </Center>
          }
        />
        <VStack
          alignSelf="flex-start"
          alignItems="flex-start"
          fontSize={detailsFontSize}
          fontWeight="bold"
          px="10px"
        >
          <Text>
            {owner ? "Owner" : "Walker"}: {walk.name} {walk.surname}
          </Text>
          <Text>Start: {walk.startTime}</Text>
          <Text>Status: {walk.status}</Text>
        </VStack>
      </HStack>
    </Card>
  );
};

export default Walks;
