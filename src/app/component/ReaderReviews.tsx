import { Quote } from "lucide-react";

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
    <section className="w-full px-6 py-20 sm:px-10 lg:px-16 lg:py-24 ">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.18em] text-[#527568]">
            Reader Reviews
          </span>

          <h2 className="font-serif text-3xl font-bold leading-tight text-[#171717] sm:text-4xl md:text-5xl">
            Stories From Our <span className="text-[#527568]">Readers</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#55504B] sm:text-base">
            Every book creates a story, and every reader has an experience worth
            sharing. Here&apos;s what readers think about BookNook.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.initials}
              className="group flex h-full flex-col rounded-2xl border border-[#D9CFC3] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#527568] hover:shadow-lg hover:shadow-[#174D38]/5 sm:p-8"
            >
              {/* Quote Icon */}
              <div className="mb-6 flex items-center justify-between">
                <Quote size={28} className="text-[#527568]/40" />
              </div>

              {/* Review */}
              <p className="flex-1 text-sm leading-7 text-[#514B45] sm:text-base">
                {review.review}
              </p>

              {/* Reviewer Information */}
              <div className="mt-8 flex items-center gap-3 border-t border-[#D9CFC3]/70 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#174D38] font-serif text-sm font-bold text-[#C5EF70]">
                  {review.initials}
                </div>

                <div>
                  <h3 className="font-serif text-base font-bold text-[#171717]">
                    {review.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#77716B]">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReaderReviews;