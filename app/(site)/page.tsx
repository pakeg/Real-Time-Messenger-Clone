import Image from "next/image"
import AuthForm from "./components/AuthForm"

export default function Home() {
  console.log(document.cookie)
  return <div className="flex flex-col min-h-screen justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Image alt="Logo" height="48" width="48" className="mx-auto w-auto" src="/logo.png"/>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      
      <AuthForm />
    </div>
  </div>;
}
