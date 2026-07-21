export interface GalleryImage {
  image: string;
  title: string;
  memoryCaption: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  memory: string;
}

export interface GiftConfig {
  recipientName: string;
  senderName: string;
  heroTitle: string;
  heroSubtitle: string;
  personalizedLetter: string;
  personalizedMessage: string;
  galleryImages: GalleryImage[];
  timeline: TimelineEvent[];
  quote: string;
  quoteAuthor: string;
  whatsappNumber: string;
}

export const giftConfig: GiftConfig = {
  recipientName: "Deena",
  senderName: "Your Special Someone",
  heroTitle: "A Digital Gift Crafted Just for You",
  heroSubtitle: "Every moment with you is a memory I treasure. Here is a small collection of our beautiful story.",
  personalizedMessage: "From the very first moment we met, my world changed in ways I never thought possible. You brought light, warmth, and an endless stream of laughter into my life. This website is a small tribute to the beautiful journey we are sharing together, and a promise of many more starry nights, warm coffees, and quiet sunsets.",
  personalizedLetter: "Dearest Deena,\n\nI wanted to create something as unique and beautiful as you are. A simple card could never hold all the things I want to say, so I built this little corner of the internet just for us.\n\nThank you for being my constant source of joy, my sounding board, and my favorite adventure. Thank you for your kindness, your radiant smile, and the gentle way you understand me even when I don't say a word.\n\nAs you scroll through these memories, I hope you feel even a fraction of the warmth and love you bring into my life every single day. You are my favorite chapter, and I cannot wait to write the rest of the book with you.\n\nWith all my love,",
  quote: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
  quoteAuthor: "Maya Angelou",
  whatsappNumber: "919000000000", // Default placeholder WhatsApp number
  galleryImages: [
    {
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200",
      title: "Golden Hour Walks",
      memoryCaption: "The evening the sky turned golden, and we promised to walk hand-in-hand through every sunset life brings."
    },
    {
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200",
      title: "Cozy Coffee Dates",
      memoryCaption: "Where we spent hours talking about everything and nothing at all, losing track of time in our own little world."
    },
    {
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200",
      title: "The Starlit Promise",
      memoryCaption: "Underneath a blanket of stars, whispering our dreams and realizing that my favorite dream had already come true."
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200",
      title: "Laughter in the Rain",
      memoryCaption: "Getting caught in an unexpected downpour, laughing like kids, and finding beauty in the most chaotic moments."
    }
  ],
  timeline: [
    {
      date: "October 14, 2024",
      title: "The First Hello",
      memory: "A simple introduction that sparked an unbreakable connection. I still remember the nervous smile on your face and how instantly comfortable I felt."
    },
    {
      date: "December 25, 2024",
      title: "Our First Real Trip",
      memory: "Exploring new streets, tasting local foods, and realizing that any place in the world is perfect as long as you are standing next to me."
    },
    {
      date: "February 14, 2025",
      title: "A Quiet Valentine's",
      memory: "No fancy restaurants, just us cooking a slightly burnt dinner, playing board games, and laughing until our stomachs hurt."
    },
    {
      date: "June 08, 2025",
      title: "Sunset by the Beach",
      memory: "Listening to the waves crash as the sun dipped below the horizon. You leaned your head on my shoulder, and I wished that moment would last forever."
    }
  ]
};
