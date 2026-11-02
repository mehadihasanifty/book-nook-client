import { ChevronRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find a book",
    description:
      "Open a category or browse the whole shelf. Every card shows the cover, the author and how many copies are free right now.",
  },
  {
    number: "02",
    title: "Borrow it",
    description:
      "Sign in, open the book you want and confirm. It moves to My Borrows, and the copy count drops by one.",
  },
  {
    number: "03",
    title: "Return it",
    description:
      "Press Return Book when you are done. The copy goes straight back on the shelf for whoever is next.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#94ec8d] px-6 py-4 sm:px-10 lg:px-16 lg:py-5 dark:bg-[#071F17]">
      <div className="mx-auto overflow-hidden rounded-[2.5rem] border border-[#ECEAE2] bg-[#FFFEFA] px-6 pb-16 pt-14 shadow-[0_16px_45px_rgba(23,77,56,0.10)] dark:border-gray-800 dark:bg-[#0E241C] sm:px-10 sm:pb-20 sm:pt-18 lg:px-14 lg:pb-24 lg:pt-20">
        {/* Section Heading */}
        <div className="mx-auto mb-16 text-center sm:max-w-2xl sm:text-center">
          <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#174D38]/20 bg-[#174D38]/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-[#174D38] dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477]">
            <span className="h-2 w-2 rounded-full bg-[#C5EF70]" />
            How It Works
          </span>

          <h2 className="font-serif text-3xl font-bold leading-tight text-[#1D241D] sm:text-4xl md:text-5xl dark:text-[#F5EFE3]">
            Borrow a book in{" "}
            <span className="relative inline-block">
              <span className="relative z-10">three steps</span>
              <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#6B6F63] sm:text-base dark:text-gray-400">
            No membership fees, no complicated process. Borrow a book for seven
            days and return it whenever you finish reading.
          </p>
        </div>

        {/* Three Steps */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, ind) => (
            <div
              key={step.number}
              className="group relative rounded-[24px] border border-[#ECEAE2] bg-white p-7 shadow-[0_8px_25px_rgba(23,77,56,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#174D38]/30 hover:shadow-[0_18px_40px_rgba(23,77,56,0.14)] dark:border-gray-700/70 dark:bg-[#123327] dark:hover:border-[#D5B477]/40 sm:p-8"
            >
              {/* Connector line to next card */}
              {ind < steps.length - 1 && (
                <div className="absolute -right-[26px] top-[52px] z-10 hidden w-[26px] items-center md:flex">
                  <span className="h-[2px] w-full border-t-2 border-dashed border-[#C49A5A]/70" />
                  <ChevronRight className="absolute right-0 h-4 w-4 text-[#C49A5A]" />
                </div>
              )}

              {/* Step Number */}
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#174D38] font-serif text-lg font-bold text-[#E7C995] shadow-md shadow-[#174D38]/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105 dark:bg-[#D5B477] dark:text-[#173D2D]">
                  {step.number}
                </span>

                <span className="h-[2px] w-6 rounded-full bg-[#F3B54A]/60" />
              </div>

              {/* Step Title */}
              <h3 className="mb-3 font-serif text-xl font-bold text-[#1D241D] sm:text-2xl dark:text-[#F5EFE3]">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-sm leading-6 text-[#6B6F63] sm:text-base sm:leading-7 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
