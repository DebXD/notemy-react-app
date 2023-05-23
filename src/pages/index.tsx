import { useQuery, useQueryClient } from "react-query";
import NoteItem from "@/components/noteItem";
import { TbLoader2 } from "react-icons/tb";
import { useState } from "react";
import useDebounce from "../utils/hooks/useDebounce";
import AddNote from "@/components/addNote";
import { useSession } from "next-auth/react";
import Layout from "./layout";
import useAxiosAuth from "@/utils/hooks/useAxiosAuth";
import Hero from "@/components/hero";

interface NoteTypes {
  id: number;
  title: string;
  content: string;
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(" ");
  const axiosAuth = useAxiosAuth();
  let debouncedSearchQuery = useDebounce(query, 300);
  const { status, data: session } = useSession();

  const { data, isError, error } = useQuery({
    queryKey: ["notes", session, debouncedSearchQuery],
    queryFn: async () => {
      const token = session?.user.access_token;
      if (token) {
        const res = await axiosAuth.get(
          `/notes/search/?query=${debouncedSearchQuery}`
        );
        console.log(res.data);
        return res.data.data;
      }
    },
  });
  const getErrorStatusCode = (error: any) => {
    if (isError) {
      if (typeof error === "object" && error !== null) {
        if ("response" in error) {
          if (typeof error.response === "object" && error.response !== null) {
            if ("status" in error.response) {
              return error.response.status;
            }
          }
        }
      }
    }
  };

  return (
    <Layout>
      {status === "authenticated" ? (
        <div className="bg-gray-900">
          <div className="search-container">
            <form role="search">
              <div className="mb-5 mx-5">
                <input
                  className="w-full  p-2 bg-gray-800 rounded-3xl mt-20 text-white focus:bg-gray-700"
                  type="search"
                  placeholder="   Search keyword..."
                  aria-label="Search"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
              </div>
            </form>
          </div>
          <div className="m-5 flex flex-row justify-center">
            <div className="text-left">
              <AddNote setLoading={setLoading} loading={loading} />
            </div>
            <h2 className="flex-grow mr-14 mt-2 text-center text-3xl font-bebas text-white">
              NOTES
            </h2>
          </div>
          {getErrorStatusCode(error) !== 404 ? (
            data && !loading ? (
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
            )
          ) : (
            <div className="flex justify-center">
              <div className="text-gray-400 font-poppins ">No Result found</div>
            </div>
          )}
        </div>
      ) : (
        <Hero />
      )}
    </Layout>
  );
};

export default Home;
