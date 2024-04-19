const Legal = async () => {
  return (
    <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
      <div className="flex w-full flex-col gap-8 p-5 md:p-10">
        <div className="flex flex-col gap-6 md:pr-40">
          <h1 className="h1-bold text-white">Terms of Use</h1>
        </div>

        <div className="flex flex-col gap-6 md:pr-40">
          <h3 className="h3-bold text-white">Your Account</h3>

          <p className="text-white">
            When you create an account, you must provide us with accurate
            information, in good faith, and you agree to keep your information
            updated if it changes. To create an account or otherwise use
            Patreon, you must be at least 13 years old and you must also be old
            enough to consent to the processing of your personal data in your
            country (in some countries we may allow your parent or guardian to
            do so on your behalf). You must be at least 18 years old or have
            your parent's or legal guardian's permission to have an Instructor
            page on Campify or to purchase an offering or subscription on
            Campify. Please contact us immediately if you believe your account
            is compromised. You can learn more about security in our Security
            Policy.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:pr-40">
          <h3 className="h3-bold text-white">Being an Instrcutor</h3>

          <p className="text-white">
            When you create an account, you must provide us with accurate
            information, in good faith, and you agree to keep your information
            updated if it changes. To create an account or otherwise use
            Patreon, you must be at least 13 years old and you must also be old
            enough to consent to the processing of your personal data in your
            country (in some countries we may allow your parent or guardian to
            do so on your behalf). You must be at least 18 years old or have
            your parent's or legal guardian's permission to have an Instructor
            page on Campify or to purchase an offering or subscription on
            Campify. Please contact us immediately if you believe your account
            is compromised. You can learn more about security in our Security
            Policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Legal;
