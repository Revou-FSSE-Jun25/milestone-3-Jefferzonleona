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

    if (res?.ok) {
      router.push("/") // redirect ke home
    } else {
      alert("Login gagal, periksa username/password")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login RevoShop</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  )
}
