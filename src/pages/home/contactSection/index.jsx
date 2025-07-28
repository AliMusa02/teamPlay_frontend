import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const formatUKPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 4) return `${digits}`;
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  };

  const validate = () => {
    const newErrors = {};

    // Daha dəqiq email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e) => {
    // Inputdan yalnız rəqəmləri çıxar
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, phone: digits });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Mesaj göndərildi!");
      // reset form (isteğe bağlı)
      setFormData({ email: "", phone: "", message: "" });
    }
  };
  return (
    <section
      id="contact"
      className="w-full bg-gradient-to-b from-[#03215c] via-[#03266e] to-blue-900
 px-6 md:px-12 py-20"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Sol panel */}

        {/* Sağ panel - Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6"
        >
          {/* Email */}
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Telefon */}
          <div>
            <label className="block text-white mb-1">Phone Number</label>
            <div className="flex items-center bg-white/20 rounded-md overflow-hidden">
              <div className="px-3 bg-white/30 flex items-center justify-between w-[100px] h-[48px] gap-2 text-white">
                🇬🇧 +44
              </div>
              <input
                type="tel"
                className="w-full p-3 bg-transparent text-white focus:outline-none"
                placeholder="+44-XXXX-XXXXXX"
                maxLength={17}
                value={formatUKPhone(formData.phone)}
                onChange={handlePhoneChange}
              />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Mesaj */}
          <div>
            <label className="block text-white mb-1">Message</label>
            <textarea
              className="w-full p-3 h-32 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit düyməsi */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-blue-900 font-semibold py-3 rounded-md hover:bg-yellow-300 transition"
          >
            Send Message
          </button>
        </form>
        <div className="w-full lg:w-1/2 text-white space-y-6">
          <h2 className="text-4xl font-bold text-yellow-400">Get in Touch</h2>
          <p className="text-white/80 text-lg">
            Do you have a question, feedback or want to join our mission? Reach
            out to us anytime.
          </p>
          <ul className="space-y-2 text-white/70">
            <li>📧 Email: contact@aliteam.com</li>
            <li>📍 Location: London, UK</li>
            <li>☎️ Phone: +44 1234 567890</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
