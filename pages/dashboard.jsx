import { useProvider } from "../context";
import WordItem from "../components/WordItem";
import Head from "next/head";
import Addform from "../components/AddForm";
import EditForm from "../components/EditForm";
import React, { useState } from "react";

const Dashboard = () => {
  const { words, loading } = useProvider();
  const [showEditForm, setShowEditForm] = useState(false);
  return (
    <div className="bg-dark">
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
      <h1 className="text-center py-5 fw-normal text-light">Dashboard</h1>
      <Addform />
      <EditForm showEditForm={showEditForm} setShowEditForm={setShowEditForm} />
      <section className="pb-5">
        <h2 className="text-center my-5 text-capitalize fw-normal text-light">
          words
        </h2>
        {loading ? (
          <h3 className="text-center my-5 fw-normal text-light">loading....</h3>
        ) : (
          <ul className="list-group w-50 mx-auto">
            {words.map((item) => {
              const { id, word, meaning } = item;
              return (
                <WordItem
                  data={{ id, word, meaning, setShowEditForm }}
                  key={id}
                />
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
