export default function Home() {
  return (
    <div className="py-24">
      <header className="mb-16 text-center">
        <h1 className="text-8xl font-bold mb-4">Placecat</h1>
        <p className="text-xl text-gray-800 dark:text-gray-400">
          A cat image placeholder service. Simple, fast, and free.
        </p>
      </header>

      <main className="space-y-12">
        <section id="documentation"></section>
      </main>

      <footer className="mt-16 pt-8 border-t dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
        <p className="mb-4">Any questions?</p>
        <a href="mailto:1yoouoo@gmail.com" className="text-blue-500 hover:underline">
          1yoouoo@gmail.com
        </a>
      </footer>
    </div>
  );
}
