import Link from "next/link";

const Help = () => {
  return (
    <main>
      <div className="md:mt-16 mt-14 text-center">
        <div className="text-gray-300">
          <h1 className="text-3xl text-center">Help Regarding Notemy</h1>
          <p className="text-center mt-2 text-lg">
            If You need any extra help you can Create issue on{" "}
            <Link
              href="https://github.com/DebXD/notemy-react-app/issues"
              target="_blank"
              className="text-indigo-500 hover:text-indigo-300"
            >
              this repository
            </Link>{" "}
            I&apos;ll try to give you feedback asap.
          </p>
        </div>
        <button className="p-2 text-white bg-indigo-800 rounded-md mt-5 hover:bg-indigo-700">
          <Link href="/about">About Us</Link>
        </button>
      </div>
    </main>
  );
};

export default Help;
