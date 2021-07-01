import { useProvider } from "../context";
import WordItem from "../components/WordItem";
import Head from "next/head";
import Addform from "../components/AddForm";
import EditForm from "../components/EditForm";

const Dashboard = () => {
  const { words, loading } = useProvider();
  return (
    <div>
      <Head>
        {/* font awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <h1 className='text-center my-4 fw-normal text-primary'>Dashboard</h1>
      <Addform />
      <EditForm />
      <section>
        {loading ? (
          <h3>loading....</h3>
        ) : (
          <ul>
            {words.map((item) => {
              console.log(item);
              const { id, word, meaning } = item;
              return <WordItem data={{ id, word, meaning }} key={id} />;
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
