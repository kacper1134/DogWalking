import { Walker } from "./WalkerPage";

export const WALKERS_MOCK_DATA: Walker[] = [
  {
    name: "Kacper",
    surname: "Kochański",
    email: "kacper2000@o2.pl",
    phone: "123456789",
    reviews: [
      {
        rating: 5,
        date: new Date(),
        content:
          "<p>I highly recommend Kacper as a dog walker. He has been walking my dog for several months now, and I couldn't be happier with his services. Kacper is reliable, punctual, and truly cares about the dogs he walks. He is always on time and takes my dog for long walks, making sure that she gets plenty of exercise and fresh air.</p>" +
          "<p>Kacper has a natural ability to connect with dogs, and my dog absolutely loves him. He is patient, gentle, and attentive to my dog's needs, making sure she feels comfortable and safe on their walks.</p>" +
          "<p>What I appreciate most about Kacper is his flexibility and willingness to accommodate my schedule. He is always willing to adjust his walking times and routes to fit my needs, which is incredibly helpful and makes my life easier.</p>" +
          "<p>Overall, I would highly recommend Kacper as a dog walker to anyone looking for a reliable and caring professional to take care of their furry friend.</p>",
      },
      {
        rating: 2,
        date: new Date(),
        content:
          "<p>I recently hired Kacper to walk my dog, but unfortunately, I was not satisfied with his services. Although he was punctual and reliable, I found that he lacked attention and care towards my dog.</p>" +
          "<p>I recently hired Kacper to walk my dog, but unfortunately, I was not satisfied with his services. Although he was punctual and reliable, I found that he lacked attention and care towards my dog.</p>" +
          "<p>Moreover, I noticed that my dog came back from her walks looking unclean and unkempt. It seemed like Kacper did not take the time to clean her paws or check for any ticks or fleas.</p>" +
          "<p>Overall, I was disappointed with Kacper's services and would not recommend him to anyone looking for a reliable and attentive dog walker.</p>",
      },
    ],
    position: {
      lat: 51.135487,
      lng: 17.093,
    },
  },
  {
    name: "Jakub",
    surname: "Kochański",
    email: "jakub2000@o2.pl",
    phone: undefined,
    reviews: [],
    position: {
      lat: 51.095487,
      lng: 17.03,
    },
  },
];
