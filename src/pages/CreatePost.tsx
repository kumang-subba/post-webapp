import CreatePostForm from "../components/CreatePostForm";

const CreatePost = () => {
  return (
    <main className="flex-1 flex flex-col mx-auto w-5/6 md:w-4/5 lg:w-2/3 h-full gap-6 px-8 md:px-16 xl:px-32 pt-24 py-5">
      <h1 className="text-6xl font-semibold">Ready to Inspire?</h1>
      <h2 className="text-4xl">
        Create a <span className="text-green-600">Post</span>
      </h2>
      <CreatePostForm />
      <button
        type="submit"
        className="w-full bg-green-500 text-xl font-medium hover:bg-green-400 dark:bg-green-700 dark:hover:bg-green-600 transition-colors py-2 rounded-sm"
        form="create-post-form"
      >
        Post
      </button>
    </main>
  );
};

export default CreatePost;
