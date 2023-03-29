import { AspectRatio } from "@chakra-ui/react";
import Offer from "../components/About/Offer";
import SlideShow, { Slide } from "../components/About/SlideShow";
import Statistics from "../components/About/Statistics";

const HOME_SLIDE_DISPLAY_TIME = 45000;
const HOME_FILTER = "blur(0.75px)";

const slides: Slide[] = [
  {
    URL: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    content: {
      title: "Why Choose Us",
      content: "We provide a simple and effective way to find the perfect dog walker for your furry friend.",
    },
  },
  {
    URL: "https://images.unsplash.com/photo-1424709746721-b8fd0ff52499?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    content: {
      title: "Our Values",
      content: "We believe in putting the needs of your pet first and connecting you with the best walkers in your area.",
    },
  },
  {
    URL: "https://images.unsplash.com/uploads/1412433710756bfa9ec14/d568362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
    content: {
      title: "Our Promise",
      content: "We promise to make the process of finding a reliable and trustworthy dog walker as easy and stress-free as possible.",
    },
  },
];

const AboutPage: React.FC<{}> = () => {
  const responsiveRatio = { base: 4 / 3, md: 16 / 9 };
  return (
    <>
      <AspectRatio ratio={responsiveRatio}>
        <SlideShow
          slides={slides}
          displayTime={HOME_SLIDE_DISPLAY_TIME}
          filter={HOME_FILTER}
          color="white"
        />
      </AspectRatio>
      <Offer />
      <Statistics />
    </>
  );
};

export default AboutPage;
