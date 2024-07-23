const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-2 text-lg">Page Not Found</p>
            <a className="mt-4 underline text-blue-400" href="/">Let's get you back to home page</a>
        </div>
    );
};

export default NotFound;
