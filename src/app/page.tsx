import HeroBanner from "./component/HeroBanner";
import HowItWorks from "./component/HowItWorks";
// import ReaderReviews from "./components/ReaderReviews";
// import TopCategories from "./components/TopCategories";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <HowItWorks />
      {/* <TopCategories /> */}
      {/* <ReaderReviews /> */}
    </div>
  );
}