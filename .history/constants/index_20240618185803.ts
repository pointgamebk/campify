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

export const authorizedIds = ["6672105ec7752689e06a7176"];
