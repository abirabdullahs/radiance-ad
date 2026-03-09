import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return unsub;
  }, []);

  if (user === undefined) return (
    <div style={{
      minHeight:"100vh", background:"#060b1a", display:"flex",
      alignItems:"center", justifyContent:"center"
    }}>
      <div style={{
        width:48, height:48, border:"3px solid rgba(99,102,241,0.3)",
        borderTopColor:"#6366f1", borderRadius:"50%",
        animation:"spin 0.8s linear infinite"
      }} />
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return user ? children : <Navigate to="/login" />;
}
