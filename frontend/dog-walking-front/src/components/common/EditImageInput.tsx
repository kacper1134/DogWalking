import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import useGetFirebaseImage from "../../hooks/useGetFirebaseImage";
import { detailsModalFontSize } from "../Profile/UserSection/UserDetailsModalDimensions";

interface EditImageInputProps {
  picture: File | null | undefined;
  inititalPictureUrl: string;
  setPicture: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}

const EditImageInput = ({
  picture,
  inititalPictureUrl,
  setPicture,
}: EditImageInputProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [currentPicture, setCurrentPicture] = useState<File | null | undefined>(
    picture
  );

  const imageSize = {
    base: "150px",
    sm: "200px",
    md: "200px",
    lg: "260px",
    xl: "300px",
  };

  useEffect(() => {
    setCurrentPicture(picture);
  }, [picture]);

  const getImage = useGetFirebaseImage();
  const [image, setImage] = useState("");

  useEffect(() => {
    if (inititalPictureUrl !== "") {
      getImage(inititalPictureUrl)
        .then((url) => setImage(url))
        .catch(() => setImage(""));
    }
  }, [getImage, inititalPictureUrl]);

  const toast = useToast();

  const onSubmit = (currentPicture: File | null | undefined) => {
    if (!(currentPicture && currentPicture.type.match("image/*"))) {
      toast({
        title: "Upload image",
        description: "Uploaded file is not an image!",
        status: "error",
        isClosable: true,
      });
      return;
    }
    setPicture(currentPicture);
  };
  
  return (
    <FormControl w="50%" alignSelf="start" pb="20px">
      <FormLabel fontSize={detailsModalFontSize} fontWeight="bold">Image</FormLabel>
      <VStack alignItems="start">
        <Avatar
          borderRadius="10px"
          boxSize={imageSize}
          src={newImageUrl !== "" ? newImageUrl : image}
          position="relative"
        >
          <Button
            onClick={() => {
              hiddenFileInput.current?.click();
            }}
            colorScheme="primary"
            position="absolute"
            bottom="2"
            opacity="0.8"
            textStyle="p"
            fontSize={detailsModalFontSize}
          >
            Upload an image <Icon as={RiImageAddFill} ml="10px" />
          </Button>
        </Avatar>
        <Input
          name="picture"
          id="picture"
          type="file"
          accept="image/*"
          placeholder="Enter a picture url"
          onChange={(e) => {
            setNewImageUrl(URL.createObjectURL(e.target.files?.item(0)!));
            onSubmit(e.target.files?.item(0));
          }}
          display="none"
          ref={hiddenFileInput}
        />
      </VStack>
    </FormControl>
  );
};

export default EditImageInput;
