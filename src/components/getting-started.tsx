import { Link } from "react-router-dom";

const GettingStarted = () => {
  return (
    <main className="mt-16 container mx-auto py-6 px-4 text-gray-300">
      <h2 className="text-2xl font-bold mb-4">Get Started</h2>
      <p className="mb-4 text-xl">
        Welcome to our notes app! We prioritize the security of our users' data
        and use zero-knowledge encryption to ensure that your notes are kept
        private and secure.
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li className="mb-2 text-lg">
          Create an account with a strong, unique password. We recommend using a
          password manager to generate and store your passwords securely.
        </li>
        <li className="mb-2 text-lg">
          Once you've created an account, you can start creating notes right
          away. All notes are encrypted end-to-end, which means that only you
          can access them.
        </li>
        <li className="mb-2 text-lg">
          You can access your notes from any device by logging into your
          account.
        </li>
      </ol>
      <p className="text-gray-400">
        We take security very seriously and are committed to keeping your data
        safe. If you have any questions or concerns, please don't hesitate to
        contact us.
      </p>
      <div className="flex justify-center">
        <button className="p-2 text-white bg-indigo-800 rounded-md mt-5 hover:bg-indigo-700">
          <Link to="/login">Continue</Link>
        </button>
      </div>
    </main>
  );
};

export default GettingStarted;
