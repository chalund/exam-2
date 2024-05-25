import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <section className="flex items-center md:h-screen p-16 bg-gray-50 dark:bg-gray-700">
    <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-8xl text-gray-600 dark:text-gray-100">
                <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl md:text-3xl dark:text-gray-300">Sorry, we couldn't find this page.</p>
            <Link to="/" className="px-8 py-2 text-lg font-semibold rounded-full bg-violet-700 text-gray-50 hover:text-gray-200"> Back to Home</Link>
        </div>
    </div>
</section>

    
    </div>
  );
};

export default NotFoundPage;
