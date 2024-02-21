"use client";

import { useUser } from "@clerk/nextjs";

import ConnectStripe from "./ConnectStripe";

const ConnectButton = () => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  return <div className="flex items-center gap-3"></div>;
};

export default ConnectButton;
