
import RegisterForm from "@/components/RegisterForm";
import Boxlist from "@/components/Boxlist";

export default function RegisterPage() {
  return (
    <div className="flex flex-row">
      <div className="flex-1 flex justify-between rounded-md shadow-md bg-primary p-[40px] mr-4 py-4">
        <RegisterForm />
      </div>
      <div className="w-[200px]">
        <Boxlist />
      </div>
    </div>
  );
}
