import { useState, useRef } from "react";
import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

export const Contact = () => {
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setErrors({ ...errors, captcha: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!captchaValue) newErrors.captcha = "Please verify captcha";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaValue }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrors({ captcha: data.message || "" });
        setSubmitError(data.message || "Failed to send message.");
        return;
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setCaptchaValue(null);
      recaptchaRef.current?.reset();
      setErrors({});

      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      console.error(err);
      setSubmitError("Unable to reach the server. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-16 bg-background/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Contact Me</h2>
          <p className="text-muted-foreground mt-2">Get in touch with me</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <FiMapPin className="text-primary text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Location</h3>
                <p>Simara -01 Bara, Nepal</p>
              </div>
            </div>

            <div className="w-full h-64 rounded-xl overflow-hidden">
              <iframe
                title="My Location"
                width="100%"
                height="100%"
                src="https://www.openstreetmap.org/export/embed.html?bbox=84.967%2C27.166%2C84.983%2C27.177&layer=mapnik&marker=27.171,84.975"
              ></iframe>
            </div>

            <div className="flex items-center gap-4">
              <FiPhone className="text-primary text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Phone</h3>
                <p>+977 9821121315</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMail className="text-primary text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p>nikeshojha71@gmail.com</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {!success && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`p-4 border rounded-xl ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`p-4 border rounded-xl ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>

                {errors.name && <p className="text-red-500">{errors.name}</p>}
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full p-4 border rounded-xl ${
                    errors.subject ? "border-red-500" : ""
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-500">{errors.subject}</p>
                )}

                <textarea
                  rows={5}
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-4 border rounded-xl ${
                    errors.message ? "border-red-500" : ""
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500">{errors.message}</p>
                )}

                <div>
                  <ReCAPTCHA
                    sitekey="6Le1G68sAAAAAPWXfddftvDWxaJfH6dFR5BwSD6K"
                    onChange={handleCaptchaChange}
                    ref={recaptchaRef}
                  />
                  {errors.captcha && (
                    <p className="text-red-500">{errors.captcha}</p>
                  )}
                  {submitError && (
                    <p className="text-red-500 mt-2">{submitError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl"
                >
                  <FiSend />
                  Send Message
                </button>
              </form>
            )}

            {success && (
              <p className="text-green-400 text-lg font-semibold text-center mt-6">
                🚀 Message sent successfully!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
