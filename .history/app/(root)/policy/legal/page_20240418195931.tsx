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
            Campify, you must be at least 13 years old and you must also be old
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
          <h3 className="h3-bold text-white">Being an Instructor</h3>

          <h4 className="h4-semibold text-white">Payments</h4>
          <p className="text-white">
            As an instructor, you may make offerings available on Campify on a
            one-time basis. Where supported and subject to your controls as
            applicable, we may automatically increase the prices of offerings to
            patrons to account for the fees imposed by the platforms (like the
            App Store) on which the associated purchases were made in a manner
            that may be determined at our sole discretion. You can learn more
            here.
          </p>
          <p className="text-white">
            We typically handle payments issues such as fraud, chargebacks, and
            resolution of payments disputes, though, for purchases made through
            certain platforms (like the App Store), the associated platforms may
            handle these payments issues. We try to provide timely access to the
            funds you've earned on Campify. Purchases made on certain platforms
            (like the App Store) and different levels and types of Campify
            service may have different timelines associated with funds becoming
            accessible to you and/or may require that reserves of funds are
            withheld from becoming accessible to you. You can learn more here.
            You may, however, occasionally experience further delays in
            accessing these funds.
          </p>
          <p className="text-white">
            We may also block or withhold access to these funds for violations
            of our terms or policies or for compliance reasons, including
            collecting tax reporting information. When this happens, we try to
            communicate the reason to you promptly. If you have questions about
            access to funds being blocked or withheld, please reach out to us.
            In order to protect creators, we may block patrons' payments if we
            believe them to be fraudulent. Sometimes activities like refunds to
            patrons and chargebacks from patrons can put your account balance
            into the negative and any fees you've incurred from Campify or the
            platforms (like the App Store) on which the purchases were made, as
            described below, may not be refunded to you when such refunds and
            chargebacks are processed. If your balance becomes negative, we
            reserve the right to recover those funds from future payments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Legal;
