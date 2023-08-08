import clsx from "clsx";

export default function AuthSocialButton({ Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex w-full justify-center rounded-md bg-inputprimary px-4 py-2 text-textsecondary shadow-sm ring-1 ring-inset ring-borderprimary",
        "hover:bg-hoverprimary focus:outline-offset-0"
      )}
    >
      <Icon/>
    </button>
  );
}