export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  limit: "",
  noLimit: false,
};

export const placesDefaultValues = {
  location: "",
};

export const profileDefaultValues = {
  profileDescription: "",
  profilePhoto: "",
  profileSchool: "",
  profileContact: "",
};

export const deleteStripeAccountDefaultValues = {
  accountId: "",
};

// in percentage
export const processingFee = 0.08;

// in cents
export const stripeFee = 0.3;

export const authorizedIds = [
  "6658e5f785a7f68a96637284",
  "665a2ce39eddcbd50032845a",
  "665a5a40b96cc363c9bcb652",
  "665b9e78582a51f9844a3ddf",
];
