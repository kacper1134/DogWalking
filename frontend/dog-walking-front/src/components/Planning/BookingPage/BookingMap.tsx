import { Box, Center, HStack, Spinner, Text } from "@chakra-ui/react";
import {
  CircleF,
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { UserData } from "../../../store/userApiSlice";
import { fontSmallSize } from "../PlanningDimensions";

interface BookingMapProps {
  currentCoordinates: { lat: number; lng: number };
  setCurrentCoordinates: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  circleRadius: number;
  walkers: UserData[];
  walkerIndex: number;
  setWalkerIndex: React.Dispatch<React.SetStateAction<number>>;
}

const BookingMap = ({
  currentCoordinates,
  setCurrentCoordinates,
  circleRadius,
  walkers,
  walkerIndex,
  setWalkerIndex,
}: BookingMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
  });

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 10000,
  });

  useEffect(() => {
    setCurrentCoordinates({
      lat: coords?.latitude ?? 10,
      lng: coords?.longitude ?? 10,
    });
  }, [coords, setCurrentCoordinates]);

  if (!isLoaded)
    return (
      <Center h="100%" color="primary.900">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <GoogleMap
      zoom={17}
      center={{
        lat: currentCoordinates.lat,
        lng: currentCoordinates.lng,
      }}
      options={{
        fullscreenControl: false,
        zoomControl: false,
        minZoom: 8,
        maxZoom: 20,
      }}
      mapContainerClassName="map-container"
      mapContainerStyle={{ height: "90%" }}
    >
      <MarkerF
        position={{
          lat: currentCoordinates.lat,
          lng: currentCoordinates.lng,
        }}
        draggable
        onDragEnd={(e) =>
          setCurrentCoordinates({
            lat: e.latLng?.lat() ?? 10,
            lng: e.latLng?.lng() ?? 10,
          })
        }
        onClick={() => setWalkerIndex(-1)}
      />
      {walkers.map((walker, index) => (
        <MarkerF
          key={index}
          position={{ lat: walker.availabilities[0].latitude, lng: walker.availabilities[0].longitude }}
          icon={{
            url: require("./walker-marker.svg").default,
            scaledSize: new google.maps.Size(25, 25),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
          }}
          onClick={() => setWalkerIndex(index)}
        >
          {walkerIndex === index && (
            <InfoWindow>
              <Box w="200px">
                <HStack pb="10px" fontSize={fontSmallSize}>
                  <Text fontWeight="bold">Phone number: </Text>
                  <Text>{walker.phoneNumber ?? "Not provided"}</Text>
                </HStack>
                <HStack fontSize={fontSmallSize}>
                  <Text fontWeight="bold">Email: </Text>
                  <Text>{walker.email}</Text>
                </HStack>
              </Box>
            </InfoWindow>
          )}
        </MarkerF>
      ))}
      <CircleF
        center={{
          lat: currentCoordinates.lat,
          lng: currentCoordinates.lng,
        }}
        radius={circleRadius}
        options={{ fillColor: "purple" }}
      />
    </GoogleMap>
  );
};

export default BookingMap;
