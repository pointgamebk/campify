import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-slate">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <p className="text-tan p-semibold-16">campify</p>
        </Link>

        <Link href="/how_to">
          <p className="text-tan p-semibold-14">How to Campify</p>
        </Link>

        <Link href="/how_to">
          <p className="text-tan p-semibold-14">Terms of Use & Policies</p>
        </Link>

        <p className="text-tan">2024 campify. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
