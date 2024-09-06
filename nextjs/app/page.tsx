import FormStep from "./components/FormStep";

export default function Home() {

  return (
    <div className="flex justify-center items-center w-full h-screen text-black">
      <div className="w-[30%] h-100 rounded-lg border border-gray-400">
        <FormStep />
      </div>
    </div>
  );
}
