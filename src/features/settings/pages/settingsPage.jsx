import React, { useState } from "react";
import SectionTitle from "../components/Sections";

function FieldLabel({ children }) {
  return (
    <p className="text-[#4a6a80] text-[9px] font-bold tracking-[0.15em] uppercase mb-1.5">
      {children}
    </p>
  );
}

function Input({ value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full bg-[#0a1520] border border-[#1e3045] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#00d4aa] transition-colors placeholder-[#4a6a80]"
    />
  );
}
export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "hammah sadiq",
    email: "hammah@paydpay.io",
    phone: "+234 801 234 5678",
    company: "PayDpaY Ltd.",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  const set = (key) => (e) =>
    setProfile((p) => ({ ...p, [key]: e.target.value }));
  return (
    <div className="bg-[#070e1a] p-6 flex flex-col gap-4">
      <div className="bg-[#0d1b2a] border border-[#1e3045] rounded-xl p-6">
        <SectionTitle>Profile Settings</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
          <div>
            <FieldLabel>Name</FieldLabel>
            <Input value={profile.name} onChange={set("name")} />
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            <Input value={profile.email} onChange={set("email")} type="email" />
          </div>
          <div>
            <FieldLabel>Phone</FieldLabel>
            <Input value={profile.phone} onChange={set("phone")} type="tel" />
          </div>
          <div>
            <FieldLabel>Company</FieldLabel>
            <Input value={profile.company} onChange={set("company")} />
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="bg-[#00d4aa] w-[30%] hover:bg-[#00bfa0] active:scale-95 text-[#070e1a] font-bold text-sm px-6 py-2.5 rounded-lg transition-all duration-150"
      >
        {saved ? "Saved ✓" : "Save Changes"}
      </button>
    </div>
  );
}
