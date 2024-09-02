import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export default function FormButton({
  children,
  loadingText = "",
  className = ""
}: {
  children: ReactNode;
  loadingText?: string;
  className?: string;
}) {
  const { formState: { isValid, isDirty, isSubmitting } } = useFormContext();

  return (
    <button
      className={cn("flex h-14 items-center justify-center space-x-2 bg-primary rounded-md w-36 text-center text-white ", className)}
      disabled={!isValid || !isDirty || isSubmitting}
      type={isSubmitting ? "button" : "submit"}
    >
      {!isSubmitting ? children : <Loading text={loadingText} />}

      <span aria-live="assertive" className="js-loadingMsg sr-only">
        {/* <!-- Use JavaScript to inject the the loading message --> */}
        <span>Form is submitting</span>
      </span>
    </button>
  );
}




export const Loading = ({ text = "" }) => {
  return (
    <div className="flex items-center justify-center text-color dark:text-dark-default">
      <div className={text ? "mr-2" : ""}>
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={4}
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>

      <span className="">{text}</span>
    </div>
  );
};
