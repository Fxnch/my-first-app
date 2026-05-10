"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState("")

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("id, text, created_at")
      .order("id", { ascending: false })

    if (error) {
      console.log("FETCH ERROR:", error)
      return
    }

    setMessages(data || [])
  }

  async function addMessage() {
    if (!text.trim()) return

    const { error } = await supabase
      .from("messages")
      .insert({ text })

    if (error) {
      console.log("INSERT ERROR:", error)
      return
    }

    setText("")
    fetchMessages()
  }

  return (
    <main style={{ fontFamily: "sans-serif" }}>
      
      {/* HEADER */}
      <section style={{ padding: 40, background: "#1e3a8a", color: "white" }}>
        <h1 style={{ fontSize: 40, marginBottom: 10 }}>
          Messages Dashboard 🚀
        </h1>
        <p style={{ fontSize: 18, opacity: 0.8 }}>
          View and store data from Supabase in a table
        </p>
      </section>

      {/* INPUT SECTION */}
      <section style={{ padding: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            style={{
              padding: 10,
              flex: 1,
              border: "1px solid #ccc",
              borderRadius: 6,
            }}
          />

          <button
            onClick={addMessage}
            style={{
              padding: "10px 20px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>

        {/* TABLE */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ textAlign: "left", padding: 12 }}>Text</th>
                <th style={{ textAlign: "left", padding: 12 }}>Created At</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td style={{ padding: 12, borderTop: "1px solid #ddd" }}>
                    {m.text}
                  </td>

                  <td style={{ padding: 12, borderTop: "1px solid #ddd" }}>
                    {m.created_at
                      ? new Date(m.created_at).toLocaleString()
                      : "No date"}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>
    </main>
  )
}