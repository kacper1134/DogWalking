import { DogData } from "../../../store/dogsApiSlice";

export const exampleDogs: DogData[] = [
  {
    dogId: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1558322394-4d8813ceef8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    name: "Burek",
    birthday: "2015-04-09",
    description:
      "<p>Burek is a friendly and loyal mixed-breed dog with short, wiry fur and a medium-sized build. He loves to play fetch and go on walks with his owners. Burek is known for his energetic and playful personality, and he gets along well with other dogs and people. He's also a quick learner and has been trained in basic obedience commands such as sit and stay.</p>",
      walks: [],
  },
  {
    dogId: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1612774412771-005ed8e861d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    name: "Luna",
    birthday: "2010-12-24",
    description:
      "<p>Luna is a sweet and affectionate Golden Retriever with long, fluffy fur and a medium-sized build. She loves to cuddle with her owners and is always eager to meet new people and make new friends. Luna is also an intelligent and obedient dog who excels at training exercises and can perform a variety of tricks, such as roll over and play dead.</p>",
      walks: [],
  },
  {
    dogId: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1541382107930-f87ae2e7d95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    name: "Max",
    birthday: "2015-01-02",
    description:
      "<p>Max is a high-energy Australian Cattle Dog with short, speckled fur and a muscular build. He's a natural herding dog and loves to chase after anything that moves. Max is also fiercely loyal to his owners and is always on the lookout for potential threats, making him a great watchdog. Despite his strong-willed nature, Max is also very affectionate and loves to snuggle up with his owners for some quality cuddle time.</p>",
    walks: [],
    },
];
