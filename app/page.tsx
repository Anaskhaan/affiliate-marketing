import Categories from "./Components/UI/Categories";
import Section from "./Components/UI/Section";

export default async function Home() {
  return (
    <main className='px-8 py-2'>
      <Categories />
      <Section />
    </main>
  );
}
