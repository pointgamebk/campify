"use client";

import { SignedIn, useUser } from "@clerk/nextjs";

import ConnectStripe from "./ConnectStripe";

const ConnectButton = () => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const userEmail = user?.emailAddresses[0].emailAddress as string;
  const firstName = user?.firstName as string;
  const lastName = user?.lastName as string;

  console.log(userId, userEmail, firstName, lastName);

  return (
    <div className="flex items-center gap-3">
      <SignedIn>
        <ConnectStripe
          userId={userId}
          email={userEmail}
          firstName={firstName}
          lastName={lastName}
        />
      </SignedIn>
    </div>
  );
};

export default ConnectButton;
