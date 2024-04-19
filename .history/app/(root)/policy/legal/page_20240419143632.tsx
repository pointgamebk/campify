const Legal = async () => {
  return (
    <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
      <div className="flex w-full flex-col gap-8 p-5 md:p-10">
        <div className="flex flex-col gap-6 md:pr-40">
          <h1 className="h1-bold text-white">Terms of Use</h1>
        </div>

        <div className="flex flex-col gap-6 md:pr-40">
          <p className="text-white">
            Campify is a platform that helps connect trainees with accomplished
            athletes. Our mission is to put instructors first, and these terms
            attempt to do that. We know that most people skim through terms of
            use because they're boring, but we have done everything we can to
            make this easy to get through. Above every section, we'll summarize
            the most important parts, but these summaries are not legally
            binding, so please look at the full version of the text for a
            complete understanding of these terms.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:pr-40">
          <h3 className="h3-bold text-white">Your Account</h3>

          <p className="text-white italic">
            To summarize: You must be at least 13 years old to use Campify. You
            are responsible for your account.
          </p>

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

          <p className="text-white italic">
            To summarize: An instructor is someone who creates a page on Campify
            to engage with trainees who purchase tickets on Campify to attend an
            instructors camps or events. There are a lot of details below
            involving payments, fees, taxes, and restrictions that you should
            read in full if you are an instructor.
          </p>

          <h5 className="h5-bold text-white">Instructor Page</h5>
          <p className="text-white">
            To become an instructor, simply launch your page to start offering
            your services. When you join Campify, you become part of the Campify
            community. You can use our tools that we provide to, among other
            things, showcase your services and engage with the Campify
            community. On Campify, you can provide your trainees something
            unique that gives them special training and skills, including
            additional access and engaging community experiences. In turn, you
            will receive loyal support from your trainees, and revenue from
            offerings that trainees have purchased on Campify.
          </p>

          <h5 className="h5-bold text-white">Payments</h5>
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
            In order to protect instructor, we may block patrons' payments if we
            believe them to be fraudulent. Sometimes activities like refunds to
            patrons and chargebacks from patrons can put your account balance
            into the negative and any fees you've incurred from Campify or the
            platforms (like the App Store) on which the purchases were made, as
            described below, may not be refunded to you when such refunds and
            chargebacks are processed. If your balance becomes negative, we
            reserve the right to recover those funds from future payments.
          </p>

          <h5 className="h5-bold text-white">Fees</h5>

          <p className="text-white">
            As an instructor, there are fees associated with your offerings on
            Campify. The general nature of these fees is summarized below, but
            the most current information is found in our Help Center. These fees
            may increase with notice to you:
          </p>

          <ul className="list-disc ml-4 text-white">
            <li>
              The platform fee, which may include a flat fee and/or is
              calculated as a percentage of successfully processed payments.
            </li>
            <li>
              The payment processing fee, which is calculated as a percentage of
              successfully processed payments and a flat fee per successfully
              processed payment and relates to the cost of processing payments
              from patrons, including recurring billing, recovering declined
              payments, and fighting fraud.
            </li>
          </ul>

          <h5 className="h5-bold text-white">Tax</h5>

          <p className="text-white">
            In order to satisfy our tax obligations, we collect tax
            identification information and, in certain circumstances, report
            this information and earnings to tax authorities as legally
            required. For example, if you are located in the United States or
            are a United States citizen who has earned $600 or more, Campify is
            required to issue you a Form 1099-K at year end. For purposes of
            Forms 1099-K, we treat all instructor earnings as earned for the
            sales of goods or services. You are responsible for reporting any
            income, withholding, or other earnings-based taxes which may be due
            as a result of money you've earned on Campify. You can learn more in
            our Tax Help Center.
          </p>

          <h5 className="h5-bold text-white">Restrictions</h5>

          <p className="text-white">
            We don't allow camps or events that violate our terms or policies.
            You can learn more by visiting our Community Guidelines and Benefit
            Guidelines. A high level summary of those rules is that we don't
            allow:
          </p>

          <ul className="list-disc ml-4 text-white">
            <li>illegal camps or events;</li>
            <li>camps or events that are abusive towards other people;</li>
            <li>camps or events that are misleading or deceptive;</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Legal;
