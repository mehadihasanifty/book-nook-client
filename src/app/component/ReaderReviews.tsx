import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Book Lover",
    initials: "SJ",
    review:
      "BookNook makes discovering new books so simple. I love how easy it is to explore different categories and borrow books. It has become my favorite place to find my next read.",
  },
  {
    name: "Michael Anderson",
    role: "Regular Reader",
    initials: "MA",
    review:
      "A wonderful platform for anyone who loves reading. The borrowing process is straightforward, and I can easily keep track of the books I have borrowed.",
  },
  {
    name: "Emily Wilson",
    role: "Book Enthusiast",
    initials: "EW",
    review:
      "I really enjoy the simple experience BookNook offers. Finding interesting books and managing my borrowed books has never felt this convenient.",
  },
];

const ReaderReviews = () => {
  return (
    <section className="bg-[#94ec8d] px-6 py-4 sm:px-10 lg:px-16 lg:py-5 dark:bg-[#071F17]">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#0E4630] to-[#071F17] px-6 pb-16 pt-14 shadow-[0_24px_60px_rgba(7,31,23,0.35)] sm:px-10 sm:pb-20 sm:pt-18 lg:px-14 lg:pb-24 lg:pt-20">
        {/* Decorative quote watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-serif text-[220px] leading-none text-white/[0.04] sm:text-[300px]"
        >
          &ldquo;
        </span>

        {/* Section Heading */}
        <div className="relative mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#D5B477]/30 bg-white/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-[#E7C995]">
            <span className="h-2 w-2 rounded-full bg-[#C5EF70]" />
            Reader Reviews
          </span>

          <h2 className="font-serif text-3xl font-bold leading-tight text-[#F5EFE3] sm:text-4xl md:text-5xl">
            Stories From Our <span className="text-[#C5EF70]">Readers</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#F5EFE3]/60 sm:text-base">
            Every book creates a story, and every reader has an experience worth
            sharing. Here&apos;s what readers think about BookNook.
          </p>
        </div>

        {/* Review Cards */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.initials}
              className="group flex h-full flex-col rounded-[24px] border border-[#F5EFE3]/10 bg-[#F8F6F0] p-7 shadow-[0_16px_40px_rgba(7,31,23,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D5B477]/60 hover:shadow-[0_22px_55px_rgba(7,31,23,0.5)] sm:p-8"
            >
              {/* Quote Icon + Rating */}
              <div className="mb-6 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#174D38]/10 transition-colors duration-300 group-hover:bg-[#174D38]">
                  <Quote
                    size={20}
                    className="fill-current text-[#527568] transition-colors duration-300 group-hover:text-[#E7C995]"
                  />
                </span>

                <span className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star
                      key={star}
                      size={13}
                      className="fill-[#D5B477] text-[#D5B477]"
                    />
                  ))}
                </span>
              </div>

              {/* Review */}
              <p className="flex-1 text-sm leading-7 text-[#514B45] sm:text-base sm:leading-7">
                {review.review}
              </p>

              {/* Reviewer Information */}
              <div className="mt-8 flex items-center gap-3 border-t border-[#174D38]/10 pt-6">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#174D38] font-serif text-sm font-bold text-[#C5EF70] ring-4 ring-[#174D38]/10 transition-transform duration-300 group-hover:scale-105">
                  {review.initials}

                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#F8F6F0] bg-[#C5EF70]">
                    <span className="block h-1 w-1 rounded-full bg-[#174D38]" />
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base font-bold text-[#1D241D]">
                    {review.name}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-[#77716B]">
                    {review.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <p className="relative mt-12 text-center font-serif text-sm italic text-[#E7C995]/70">
          &ldquo;Every book opens a new world.&rdquo;
        </p>
      </div>
    </section>
  );
};

export default ReaderReviews;
