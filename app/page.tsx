export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm dark:bg-gray-600 flex flex-col gap-3">
        {['ti', 'me', 'you', 'your self'].map((person, i) => {
          return (
            <div key={i} className="flex items-center gap-5 group">
              <div className="size-10 bg-blue-400 rounded-full"/>
              <span className="text-lg font-medium group-hover:text-red-500">{person}</span>
              <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full text-sm relative">
                <span className="z-10">{i}</span>
                <div className="size-6 bg-red-500 rounded-full absolute animate-ping" />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
