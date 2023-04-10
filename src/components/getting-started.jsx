import React from "react";

const GettingStarted = () => {
  return (
    <main class="mt-16 container mx-auto py-6 px-4 text-gray-300">
      <h2 class="text-2xl font-bold mb-4">Get Started</h2>
      <p class="mb-4">
        Welcome to our notes app! We prioritize the security of our users' data
        and use zero-knowledge encryption to ensure that your notes are kept
        private and secure.
      </p>
      <ol class="list-decimal list-inside mb-4">
        <li class="mb-2">
          Create an account with a strong, unique password. We recommend using a
          password manager to generate and store your passwords securely.
        </li>
        <li class="mb-2">
          Once you've created an account, you can start creating notes right
          away. All notes are encrypted end-to-end, which means that only you
          can access them.
        </li>
        <li class="mb-2">
          You can access your notes from any device by logging into your
          account.
        </li>
      </ol>
      <p class="text-gray-400">
        We take security very seriously and are committed to keeping your data
        safe. If you have any questions or concerns, please don't hesitate to
        contact us.
      </p>
    </main>
  );
};

export default GettingStarted;
