import Image from "next/image";

const Landing = async () => {
  return (
    <>
      <section className="bg-slate bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <p className="p-regular-20 md:p-regular-24 text-tan">
              Here is a step-by-step demonstration of how to register as an
              athlete instructor on Campify, connect your account to Stripe for
              secure payments, and create your very own camps. Watch to see how
              easy it is to get started and take your training to the next
              level. Ready to inspire and train the next generation of athletes?
              Start your journey with Campify today.
            </p>
          </div>

          <Image
            src="cad4e4ad-886a-457a-ad00-ecb86016c695-p1ul7j.mp4"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
    </>
  );
};

export default Landing;
