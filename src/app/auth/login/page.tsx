"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    })
    if (res?.ok) router.push("/")
    else alert("Login gagal, periksa username/password")
  }

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-md rounded w-80 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Login RevoShop</h1>
        <input
          type="text"
          placeholder="Username"
          className="border w-full px-3 py-2 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full px-3 py-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  )
}
