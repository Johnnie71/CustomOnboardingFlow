import Image from "next/image";
import SignUpForm from '@/app/components/forms/SignupForm'

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <SignUpForm />
    </div>
  );
}
