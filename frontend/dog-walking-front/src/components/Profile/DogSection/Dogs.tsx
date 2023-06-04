import {
  Center,
  Icon,
  SimpleGrid,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import storage from "../../../config/firebase-config";
import { RootState } from "../../../store";
import { DogData } from "../../../store/dogsApiSlice";
import {
  useCreateDogMutation,
  useDeleteDogMutation,
  useGetUserQuery,
  useUpdateDogMutation,
} from "../../../store/userApiSlice";
import Card from "../../Card";
import {
  borderRadius,
  headingSize,
  iconButtonSize,
  mainMargin,
  mainPadding,
} from "../UserSection/ProfileDetailsDimensions";
import DogCard from "./DogCard";
import DogCreateEditModal from "./DogCreateEditModal";

const Dogs = () => {
  const columns = useBreakpointValue({
    base: 1,
    md: 2,
    "2xl": 3,
  });

  const [isCreateEditDogModalOpen, setIsCreateEditDogModalOpen] =
    useState(false);

  const username = useSelector((state: RootState) => state.auth.username);
  const { data: details } = useGetUserQuery(username);
  const [deleteDogTrigger] = useDeleteDogMutation();
  const [createDogTrigger] = useCreateDogMutation();
  const [updateDogTrigger] = useUpdateDogMutation();

  const [dogs, setDogs] = useState<DogData[]>([]);

  useEffect(() => {
    if (details != null) {
      setDogs([...details.dogs]);
    }
  }, [details]);

  const addNewDogDetails = (dogInfo: DogData) => {
    if (dogInfo.imageUrl === "") dogInfo.imageUrl = "image";
    if (dogInfo.description === "") dogInfo.description = "<p></p>";

    createDogTrigger({ username, data: dogInfo });
  };

  const changeDogInfo = (dogInfo: DogData) => {
    if (dogInfo.imageUrl === "") dogInfo.imageUrl = "image";
    if (dogInfo.description === "") dogInfo.description = "<p></p>";
    updateDogTrigger(dogInfo);
  };

  const deleteDogInfoHandler = (id: number) => {
    const image = dogs.filter(dog => dog.dogId === id)[0].imageUrl;
    deleteDogTrigger(id).then(() => deleteImage(image));
  };

  const deleteImage = async (currentDogImagePath: string) => {
    const dogImageRef = ref(storage, currentDogImagePath);
    deleteObject(dogImageRef);
  };

  return (
    <>
      <Center w="100%" bg="white">
        <Text textStyle="h3" color="primary.500" fontSize={headingSize}>
          Dogs
        </Text>
        <Icon
          as={AiFillPlusCircle}
          color="green"
          cursor="pointer"
          fontSize={iconButtonSize}
          ml="20px"
          onClick={() => setIsCreateEditDogModalOpen(true)}
        />
      </Center>
      <Card
        px={mainPadding + "px"}
        py={mainPadding + "px"}
        mx={mainMargin + "px"}
        my={mainMargin + "px"}
        borderRadius={borderRadius}
      >
        {dogs.length === 0 ? (
          <Text
            color="primary.600"
            textStyle="h2"
            fontSize={iconButtonSize}
            w="100%"
            align="center"
          >
            There is nothing here yet!
          </Text>
        ) : (
          <SimpleGrid columns={columns} spacing="8px" justifyItems="center">
            {dogs.map((dog, index) => {
              return (
                <DogCard
                  dog={dog}
                  key={index}
                  changeDogInfo={changeDogInfo}
                  deleteDogInfo={deleteDogInfoHandler}
                />
              );
            })}
          </SimpleGrid>
        )}
        <DogCreateEditModal
          isEdit={false}
          isOpen={isCreateEditDogModalOpen}
          setIsOpen={setIsCreateEditDogModalOpen}
          changeDogsHandler={addNewDogDetails}
          id={dogs.length + 1}
          name=""
          birthday=""
          content=""
          imageUrl={null}
          walks={[]}
        />
      </Card>
    </>
  );
};

export default Dogs;
