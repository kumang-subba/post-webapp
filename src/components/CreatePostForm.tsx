import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import imageUpload from "../lib/imageUpload";
import { PostCreateRequest, PostValidator } from "../lib/validators/post";
import { CategoryMenuItem } from "../types/categoryTypes";
import CategoryMenu from "./CategoryMenu";
import { useNavigate } from "react-router-dom";

const CreatePostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostCreateRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      coverImage: "",
      categories: [],
      content: "",
    },
  });
  const navigate = useNavigate();
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        inlineToolbar: true,
        data: {
          blocks: [],
        },
        placeholder: "Type here to start writing your post......",
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: `${import.meta.env.VITE_API_URL}/link`,
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const url = await imageUpload(file);
                  return {
                    success: 1,
                    file: {
                      url: url,
                    },
                  };
                },
              },
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);
  const [imageError, setImageError] = useState<string>("");
  const [category, setCategory] = useState<CategoryMenuItem[]>([
    {
      label: "technology",
      checked: false,
    },
    {
      label: "gaming",
      checked: false,
    },
    {
      label: "food",
      checked: false,
    },
    {
      label: "science",
      checked: false,
    },
    {
      label: "fitness",
      checked: false,
    },
  ]);
  const [coverImage, setCoverImage] = useState<string>("");
  async function onSubmit(data: PostCreateRequest) {
    const blocks = await ref.current?.save();
    const categories = category.filter((c) => c.checked).map((c) => c.label);
    const payload: PostCreateRequest = {
      title: data.title,
      categories: [...categories],
      coverImage: data.coverImage,
      content: JSON.stringify(blocks),
    };
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        payload
      );
      navigate(`/post/${res.data}`);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSelect = (value: CategoryMenuItem) => {
    category.find((c) => c.label === value.label)!.checked = !value.checked;
    if (category.some((c) => c.checked)) {
      const checkedCategories: string[] = category
        .filter((c) => c.checked)
        .map((c) => c.label);
      // @ts-expect-error I don't know
      setValue("category", checkedCategories);
    }
    setCategory([...category]);
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    try {
      if (event.target.files) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        if (file) {
          const url = await imageUpload(file);
          setValue("coverImage", url);
          setCoverImage(url);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 400) {
          setImageError("Please upload a valid image");
        } else {
          setImageError("Error uploading image");
        }
      }
    }
  };
  const cancelImage = () => {
    setCoverImage("");
    setValue("coverImage", "");
  };
  const { ref: titleRef, ...rest } = register("title");
  return (
    <div className="w-full p-4 bg-zinc-50 dark:bg-slate-800 dark:border-slate-900 rounded-lg border border-zinc-200">
      <form
        id="create-post-form"
        className="w-full flex flex-col gap-5 items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative w-fit">
          <ReactTextareaAutosize
            ref={(e) => {
              titleRef(e);
              // @ts-expect-error doable
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          {errors.title && (
            <div className="absolute left-0 -top-10 bg-slate-200 dark:bg-slate-400 z-10 rounded-md w-fit">
              <div className="absolute left-1/2 -bottom-4 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 -z-10 bg-slate-200 dark:bg-slate-400" />
              <div className="text-rose-600 dark:text-red-900 font-medium px-2 py-1 w-full">
                {errors.title.message}
              </div>
            </div>
          )}
        </div>
        <CategoryMenu
          options={category}
          onSelect={handleSelect}
          errors={errors?.categories?.message}
        />
        <div className="relative">
          {coverImage ? (
            <div className="relative">
              <img src={coverImage} className="max-h-40" />
              <button
                type="button"
                className="absolute right-3 top-3 rounded-full bg-gray-300 p-1.5 hover:bg-gray-400 transition-all dark:bg-slate-700 dark:hover:bg-slate-800"
                onClick={cancelImage}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                id="file"
                name="coverImage"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label
                className="rounded-md font-medium cursor-pointer px-2 py-2 dark:bg-inherit dark:hover:bg-green-600 dark:hover:text-white bg-green-600 border-2 border-green-600 transition-colors text-gray-50 hover:bg-white hover:text-green-600"
                htmlFor="file"
              >
                Upload cover image
              </label>
              {errors?.coverImage?.message ||
                (imageError && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-[110%] bg-slate-200 dark:bg-slate-400 z-10 rounded-md">
                    <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2  rotate-45 -z-10 bg-slate-200 dark:bg-slate-400" />
                    <div className="text-rose-600 dark:text-red-900 font-medium px-2 py-1">
                      {errors?.coverImage?.message || imageError}
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

        <div
          id="editor"
          className="h-[500px] overflow-y-auto scrollbar w-full overflow-x-hidden pr-2"
        />
      </form>
    </div>
  );
};

export default CreatePostForm;
