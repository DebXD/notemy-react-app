import { useQuery } from "react-query";
import NoteItem from "@/components/noteItem";
import { TbLoader2 } from "react-icons/tb";
import { getNotes, sleep } from "../utils/api/api";
import { useState } from "react";
import useDebounce from "../utils/hooks/useDebounce";
import AddNote from "@/components/addNote";
import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "./layout";

interface NoteTypes {
  id: number;
  title: string;
  content: string;
}

const Notes = () => {
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");

  //const debouncedSearchQuery = useDebounce(query, 300);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ["notes", session],
    queryFn: async () => {
      const token = session?.user.access_token;
      if (token) {
        const res = await getNotes(token);
        return res.data;
      }
    },
  });
  if (isError) {
    if (typeof error === "object" && error !== null) {
      if ("message" in error) {
        alert(error.message);
      }
    }
  }

  return (
    <Layout>
      <div className="bg-gray-900">
        <div className="search-container">
          <form role="search">
            <div className="mb-5 mx-5">
              <input
                className="w-full  p-2 bg-gray-800 rounded-3xl mt-20 text-white focus:bg-gray-700"
                type="search"
                placeholder="   Search keyword..."
                aria-label="Search"
                //onKeyUp={(e) => setQuery(e.target?.value)}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>
          </form>
        </div>
        <div className="m-5 flex flex-row justify-center">
          <div className="text-left">
            <AddNote setLoading={setLoading} />
          </div>
          <h2 className="flex-grow mr-14 mt-2 text-center text-3xl font-bebas text-white">
            NOTES
          </h2>
        </div>

        {isSuccess && data ? (
          <ul className="masonry sm:masonry-sm md:masonry-md mx-5">
            {data?.length === 0 ? (
              <h4 className="text-center  text-xl font-poppins text-gray-400">
                Add a Note...
              </h4>
            ) : (
              data.map((note: NoteTypes) => {
                return (
                  <NoteItem
                    id={note.id}
                    title={note.title}
                    content={note.content}
                    key={note.id}
                  />
                );
              })
            )}
          </ul>
        ) : (
          <div className="flex justify-center h-screen">
            <TbLoader2 className="animate-spin h-8 w-8 text-white" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notes;
