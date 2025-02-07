
import RegisterForm from "@/components/RegisterForm";
import Boxlist from "@/components/Boxlist";

export default function RegisterPage() {
  return (
    <main className="px-4">
      <div className=" flex flex-row">
        <div className="flex-1 bg-background mr-4 py-8">
          <div className="container mx-auto px-4">
            <RegisterForm />
          </div>
        </div>
        <div className="w-[200px]">
          <Boxlist />
        </div>
      </div>
    </main>

  );
}
