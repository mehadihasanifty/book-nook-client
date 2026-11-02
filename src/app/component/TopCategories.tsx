import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BookOpen,
  FlaskConical,
  Landmark,
  Layers,
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Discover stories, novels and unforgettable adventures.",
    icon: BookOpen,
    number: "01",
  },
  {
    name: "Science",
    description: "Explore scientific discoveries and new ideas.",
    icon: FlaskConical,
    number: "02",
  },
  {
    name: "History",
    description: "Travel through time and discover the past.",
    icon: Landmark,
    number: "03",
  },
  {
    name: "Kids",
    description: "Wonderful stories for curious young minds.",
    icon: Baby,
    number: "04",
  },
  {
    name: "Others",
    description: "Explore more books and unexpected interests.",
    icon: Layers,
    number: "05",
  },
];

const spineTones = [
  "bg-[#174D38]",
  "bg-[#1C5A42]",
  "bg-[#0E4630]",
  "bg-[#245E45]",
  "bg-[#123B2C]",
];

const TopCategories = () => {
  return (
    <section className="bg-[#F3E5D6] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#174D38]/20 bg-[#174D38]/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-[#174D38]">
              <span className="h-2 w-2 rounded-full bg-[#C5EF70]" />
              Explore &amp; Discover
            </span>

            <h2 className="font-serif text-3xl font-bold leading-tight text-[#171717] sm:text-4xl md:text-5xl">
              Find Your Favorite{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Category</span>
                <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#55504B] sm:text-base">
              Every reader has a different taste. Explore our book categories
              and find stories, knowledge and ideas that inspire you.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#174D38] transition-all hover:gap-3"
          >
            View All Books
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Category Cards: book-spine shelf on desktop */}
        <div className="hidden h-[430px] gap-3 lg:flex">
          {categories.map((category, ind) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.number}
                href="/books"
                className={`${spineTones[ind]} group relative min-w-0 flex-1 overflow-hidden rounded-2xl shadow-lg shadow-[#174D38]/20 transition-all duration-500 hover:flex-[2.7] focus-within:flex-[2.7] hover:shadow-2xl hover:shadow-[#174D38]/30`}
              >
                {/* Collapsed: spine face */}
                <div className="absolute inset-0 flex flex-col items-center justify-between py-7 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                  <span className="font-serif text-lg text-[#E7C995]/80">
                    {category.number}
                  </span>

                  <span className="rotate-180 font-serif text-2xl font-bold tracking-widest text-[#F5EFE3] [writing-mode:vertical-rl]">
                    {category.name}
                  </span>

                  <span className="h-9 w-[3px] rounded-full bg-[#C5EF70]/70" />
                </div>

                {/* Expanded: full card */}
                <div className="absolute inset-0 flex flex-col justify-between p-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C5EF70] text-[#174D38]">
                    <Icon size={22} />
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {category.name}
                    </h3>

                    <p className="text-sm leading-6 text-[#F5EFE3]/70">
                      {category.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#C5EF70] transition-all group-hover:gap-3.5">
                      Explore
                      <ArrowRight size={14} />
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#E7C995]/70">
                      BookNook Shelf
                    </span>

                    <span className="font-serif text-3xl font-bold text-white/10">
                      {category.number}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Shelf board under the spines */}
        <div className="mt-3 hidden h-3 rounded-full bg-gradient-to-r from-[#C7A97E] via-[#A97F52] to-[#C7A97E] shadow-inner lg:block" />

        {/* Category Cards: stacked on tablet & mobile */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
          {categories.map((category, ind) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.number}
                href="/books"
                className={`${spineTones[ind]} group relative overflow-hidden rounded-2xl p-6 shadow-lg shadow-[#174D38]/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 right-3 select-none font-serif text-[80px] font-bold leading-none text-white/[0.07]"
                >
                  {category.number}
                </span>

                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C5EF70] text-[#174D38]">
                    <Icon size={22} />
                  </div>

                  <span className="font-serif text-sm text-[#E7C995]/70">
                    {category.number}
                  </span>
                </div>

                <h3 className="mb-2 font-serif text-xl font-bold text-white">
                  {category.name}
                </h3>

                <p className="text-sm leading-6 text-[#F5EFE3]/70">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#C5EF70] transition-all group-hover:gap-3">
                  Explore
                  <ArrowRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
