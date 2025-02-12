import { IoLogoGoogle, IoLogoGithub } from "react-icons/io";
import { signInWithGithub, signInWithGoogle } from "@/lib/actions";

export const GoogleButton = () => {
  return (
    <form action={signInWithGoogle}>
      <button
        type="submit"
        className="flex items-center justify-center gap-1 py-2.5 rounded-lg uppercase text-white font-medium text-sm bg-blue-500 w-full "
      >
        <IoLogoGoogle />
        Continue with Google
      </button>
    </form>
  );
};

export const GithubButton = () => {
  return (
    <form action={signInWithGithub}>
      <button
        type="submit"
        className="flex items-center justify-center gap-1 py-2.5 rounded-lg uppercase text-white font-medium text-sm bg-gray-500 w-full "
      >
        <IoLogoGithub />
        Continue with Github
      </button>
    </form>
  );
};
