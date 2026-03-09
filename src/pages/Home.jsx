import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-BD", { year: "numeric", month: "long", day: "numeric" });
}

export default function Home() {
  const [invoiceInput, setInvoiceInput] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle");

  const checkPayment = async () => {
    if (!invoiceInput.trim()) return;
    setStatus("loading");
    setResult(null);

    try {
      const q = query(
        collection(db, "invoices"),
        where("invoiceNo", "==", invoiceInput.trim())
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        setResult({ id: snap.docs[0].id, ...snap.docs[0].data() });
        setStatus("found");
      } else {
        setStatus("notfound");
      }
    } catch (e) {
      setStatus("notfound");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #060b1a 0%, #0d1b3e 50%, #060b1a 100%)",
      fontFamily: "'Poppins', 'Hind Siliguri', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    }}>

     <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-30px) rotate(3deg)} }
        @keyframes floatR { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .check-btn:hover { transform:translateY(-2px); box-shadow: 0 12px 36px rgba(99,102,241,0.5) !important; }
        .dl-btn:hover { transform:translateY(-2px); }
        input:focus { border-color: rgba(99,102,241,0.6) !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.15) !important; outline: none !important; }
      `}</style>


      <div style={{ position:"fixed", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)", top:-150, left:-150, animation:"float 12s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"fixed", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)", bottom:-100, right:-100, animation:"floatR 10s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"fixed", width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)", top:"40%", right:"10%", animation:"floatR 14s ease-in-out infinite reverse", pointerEvents:"none" }} />


      <div style={{ width:"100%", padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.06)", backdropFilter:"blur(10px)", background:"rgba(6,11,26,0.6)", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:42, height:42, borderRadius:11, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, boxShadow:"0 4px 16px rgba(99,102,241,0.4)" }}>✦</div>
          <div>
            <div style={{ color:"#fff", fontWeight:800, fontSize:20, letterSpacing:"-0.5px" }}>Radiance</div>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11 }}>Academic Coaching Center</div>
          </div>
        </div>
      </div>

      <div style={{ width:"100%", maxWidth:640, padding:"60px 20px 40px", animation:"fadeUp 0.6s ease" }}>
  
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.25)",
            borderRadius:100, padding:"6px 16px", marginBottom:20
          }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#6366f1", animation:"pulse 2s infinite" }} />
            <span style={{ color:"#a5b4fc", fontSize:13, fontWeight:500 }}>পেমেন্ট যাচাই পোর্টাল</span>
          </div>

          <h1 style={{ color:"#fff", fontSize:"clamp(28px,5vw,42px)", fontWeight:800, margin:"0 0 14px", lineHeight:1.2, letterSpacing:"-1px" }}>
            আপনার পেমেন্ট<br/>
            <span style={{ background:"linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              স্ট্যাটাস দেখুন
            </span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:15, margin:0, fontFamily:"'Hind Siliguri', sans-serif" }}>
            Invoice নম্বর দিয়ে আপনার পেমেন্ট তথ্য যাচাই করুন
          </p>
        </div>


        <div style={{
          background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)",
          border:"1px solid rgba(255,255,255,0.09)", borderRadius:24,
          padding:"32px 28px", marginBottom:28,
          boxShadow:"0 20px 60px rgba(0,0,0,0.3)"
        }}>
          <label style={{ color:"rgba(255,255,255,0.6)", fontSize:13, fontWeight:500, display:"block", marginBottom:10 }}>Invoice নম্বর</label>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <input
              type="text"
              value={invoiceInput}
              onChange={e => setInvoiceInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && checkPayment()}
              placeholder="যেমন: 001-001"
              style={{
                flex:1, minWidth:180, padding:"15px 18px", borderRadius:14,
                background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)",
                color:"#fff", fontSize:16, fontFamily:"'Poppins',sans-serif",
                transition:"all 0.2s"
              }}
            />
            <button
              className="check-btn"
              onClick={checkPayment}
              disabled={status === "loading"}
              style={{
                padding:"15px 28px", borderRadius:14, border:"none", cursor:"pointer",
                background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                color:"#fff", fontSize:15, fontWeight:600, whiteSpace:"nowrap",
                boxShadow:"0 8px 24px rgba(99,102,241,0.35)", transition:"all 0.25s"
              }}
            >
              {status === "loading" ? (
                <span style={{ display:"inline-block", width:18, height:18, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
              ) : " চেক করুন"}
            </button>
          </div>
        </div>


        {status === "notfound" && (
          <div style={{
            background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)",
            borderRadius:20, padding:32, textAlign:"center", animation:"fadeUp 0.4s ease"
          }}>
            <div style={{ fontSize:52, marginBottom:12 }}>😔</div>
            <h3 style={{ color:"#fca5a5", fontSize:18, fontWeight:700, margin:"0 0 8px" }}>পাওয়া যায়নি</h3>
            <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, margin:0, fontFamily:"'Hind Siliguri',sans-serif" }}>
              এই Invoice নম্বরের কোনো পেমেন্ট তথ্য নেই।<br/>
              সঠিক নম্বর দিয়ে আবার চেষ্টা করুন।
            </p>
          </div>
        )}

        {status === "found" && result && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>

            <div style={{ textAlign:"center", marginBottom:20 }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.25)",
                borderRadius:100, padding:"8px 20px"
              }}>
                <span style={{ color:"#4ade80", fontSize:16 }}>✓</span>
                <span style={{ color:"#86efac", fontSize:14, fontWeight:600 }}>পেমেন্ট নিশ্চিত হয়েছে</span>
              </div>
            </div>


            <div style={{
              background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)",
              border:"1px solid rgba(255,255,255,0.08)", borderRadius:24,
              overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.3)"
            }}>

              <div style={{ background:"linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.2))", padding:"24px 28px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
                  <div>
                    <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginBottom:4 }}>Invoice</div>
                    <div style={{ color:"#a5b4fc", fontSize:22, fontWeight:800, letterSpacing:"-0.5px" }}>#{result.invoiceNo}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginBottom:4 }}>তারিখ</div>
                    <div style={{ color:"#fff", fontSize:14, fontWeight:500 }}>{formatDate(result.date)}</div>
                  </div>
                </div>
              </div>


              <div style={{ padding:"24px 28px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
                  {[
                    ["Student Name", result.name],
                    ["Course", result.course],
                    ["Batch", result.batch],
                    ["Time Period for this payment", result.timePeriod],
                  ].map(([label, value]) => (
                    <div key={label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:14, padding:"16px 18px", border:"1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ color:"rgba(255,255,255,0.4)", fontSize:12, marginBottom:6, fontFamily:"'Hind Siliguri',sans-serif" }}>{label}</div>
                      <div style={{ color:"#fff", fontSize:15, fontWeight:600, fontFamily:"'Hind Siliguri',sans-serif" }}>{value || "—"}</div>
                    </div>
                  ))}
                </div>


                <div style={{
                  background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                  borderRadius:16, padding:"20px 24px",
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  boxShadow:"0 8px 32px rgba(99,102,241,0.3)", marginBottom:20
                }}>
                  <div style={{ color:"rgba(255,255,255,0.8)", fontSize:14 }}>মোট পরিমাণ</div>
                  <div style={{ color:"#fff", fontSize:26, fontWeight:800 }}>
                    ৳{parseInt(result.amount || 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      <div style={{ marginTop:"auto", padding:"24px", textAlign:"center", color:"rgba(255,255,255,0.2)", fontSize:12, borderTop:"1px solid rgba(255,255,255,0.05)", width:"100%" }}>
        © 2024 Radiance Coaching Center · Tongi, Gazipur
      </div>
    </div>
  );
}