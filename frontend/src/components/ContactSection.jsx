import { useState } from "react";
import api from "../api/axios";
import "./contact.css";

const CONTACTS = [
  {
    name: "Anil Yadav",
    phone: "9039345023",
    role: "Project Enquiries",
  },
  {
    name: "Heeralal Yadav",
    phone: "9630716170",
    role: "Construction & Planning",
  },
  {
    name: "Shubham Yadav",
    phone: "7489819747",
    role: "Design & Survey",
  },
];

const ContactSection = ({ compact = false }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    try {
      await api.post("/contact", form);

      setStatus("sent");

      setForm({
        name: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section
      className={`contact ${compact ? "contact--compact" : ""}`}
      id="contact"
    >
      <div className="container">

        {/* =====================================
            CONTACT INTRO
        ====================================== */}

        <div className="contact__intro">

          <div className="contact__intro-left">

            <div className="contact__eyebrow">
              <span></span>
              TALK TO US
            </div>

            <h2 className="contact__title">
              Let's build
              <br />
              something <em>great.</em>
            </h2>

          </div>

          <p className="contact__lede">
            Tell us about your plot, project or requirements.
            Our team will help you understand the next steps,
            from planning and surveying to design and construction.
          </p>

        </div>


        {/* =====================================
            LEFT CONTACT DETAILS
            RIGHT CONTACT FORM
        ====================================== */}

        <div className="contact__layout">


          {/* =====================================
              LEFT — CONTACT DETAILS
          ====================================== */}

          <div className="contact__info">

            <div className="contact__details-header">

              <div>
                <span>CONTACT DETAILS</span>

                <h3>
                  We're here to help.
                </h3>
              </div>

            </div>


            <p className="contact__details-description">
              Reach our team directly for planning,
              construction, design, surveying and
              project enquiries.
            </p>


            {/* CONTACT PEOPLE */}

            <div className="contact__people">

              {CONTACTS.map((contact, index) => (
                <a
                  key={contact.phone}
                  href={`tel:+91${contact.phone}`}
                  className="contact__person"
                >

                  <div className="contact__person-number">
                    0{index + 1}
                  </div>

                  <div className="contact__person-info">

                    <span className="contact__person-role">
                      {contact.role}
                    </span>

                    <strong>
                      {contact.name}
                    </strong>

                    <span className="contact__person-phone">
                      +91 {contact.phone}
                    </span>

                  </div>

                  <span className="contact__person-arrow">
                    ↗
                  </span>

                </a>
              ))}

            </div>


            {/* OFFICE ADDRESS */}

            <div className="contact__office">

              <div className="contact__address-icon">
                +
              </div>

              <div className="contact__address-content">

                <span>
                  VISIT OUR OFFICE
                </span>

                <p>
                  206, Girirajj Building,
               
                  Bhawarkuan, Indore
                </p>

              </div>

            </div>

          </div>


          {/* =====================================
              RIGHT — PROJECT ENQUIRY FORM
          ====================================== */}

          <div className="contact__form-wrap">

            <div className="contact__form-head">

              <div>

                <span>
                  PROJECT ENQUIRY
                </span>

                <h3>
                  Tell us what
                  <br />
                  you're planning.
                </h3>

              </div>

              <div className="contact__form-mark">
                +
              </div>

            </div>


            <form
              className="contact__form"
              onSubmit={onSubmit}
            >

              {/* NAME + PHONE */}

              <div className="contact__row">

                <div className="contact__field">

                  <label htmlFor="name">
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={form.name}
                    onChange={onChange}
                  />

                </div>


                <div className="contact__field">

                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    required
                    value={form.phone}
                    onChange={onChange}
                  />

                </div>

              </div>


              {/* SERVICE */}

              <div className="contact__field">

                <label htmlFor="service">
                  Service Required
                </label>

                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={onChange}
                  required
                >

                  <option value="">
                    Select a service
                  </option>

                  <option>
                    2D Planning & 3D Elevation
                  </option>

                  <option>
                    Contractor & Builder
                  </option>

                  <option>
                    Interior & Exterior Design
                  </option>

                  <option>
                    Project Consultancy
                  </option>

                  <option>
                    TS & DGPS Survey
                  </option>

                  <option>
                    Not sure yet
                  </option>

                </select>

              </div>


              {/* PROJECT DETAILS */}

              <div className="contact__field">

                <label htmlFor="message">
                  Project Details
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your plot, project, location or requirements..."
                  value={form.message}
                  onChange={onChange}
                />

              </div>


              {/* SUBMIT */}

              <button
                className="contact__submit"
                type="submit"
                disabled={status === "sending"}
              >

                <span>
                  {status === "sending"
                    ? "Sending..."
                    : "Send Project Enquiry"}
                </span>

                <b>
                  →
                </b>

              </button>


              {/* SUCCESS */}

              {status === "sent" && (
                <div className="contact__status contact__status--ok">

                  <span>✓</span>

                  Thanks! We've received your enquiry.
                  We'll contact you shortly.

                </div>
              )}


              {/* ERROR */}

              {status === "error" && (
                <div className="contact__status contact__status--err">

                  <span>!</span>

                  Something went wrong.
                  Please call us directly or try again.

                </div>
              )}

            </form>


            {/* FORM FOOTER */}

            <div className="contact__form-footer">

              <span>
                OPTIWISE INFRASTRUCTURE
              </span>

              <span>
                INDORE • MADHYA PRADESH
              </span>

            </div>

          </div>

        </div>


        {/* =====================================
            FULL WIDTH GOOGLE MAP
        ====================================== */}

        <div className="contact__map-section">

        

          <div className="contact__map">

            <iframe
              title="Optiwise Infrastructure Office Location"
              src="https://www.google.com/maps?q=206%20Girirajj%20Building%2C%20Bhawarkuan%2C%20Indore&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;