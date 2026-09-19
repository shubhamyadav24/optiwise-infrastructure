import { useEffect, useState } from "react";
import api from "../../api/axios";

const ManageClientLogos = () => {
  const [logos, setLogos] = useState([]);

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLogos = async () => {
    try {
      const res = await api.get("/client-logos");
      setLogos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter client/company name.");
      return;
    }

    if (!file) {
      alert("Please select a logo.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("logo", file);

    try {
      setLoading(true);

      await api.post("/client-logos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setName("");
      setFile(null);

      document.getElementById("clientLogoFile").value = "";

      await fetchLogos();

      alert("Client logo uploaded successfully.");
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
        "Unable to upload logo."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteLogo = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this logo?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/client-logos/${id}`);

      setLogos((prev) =>
        prev.filter((logo) => logo._id !== id)
      );
    } catch (err) {
      console.error(err);

      alert("Unable to delete logo.");
    }
  };

  return (
    <div>

      <div className="admin-header">

        <div>
          <span className="coord-tag">
            Website
          </span>

          <h1>
            Client Logos
          </h1>
        </div>

      </div>


      {/* UPLOAD */}

      <div className="admin-card">

        <h2>
          Add Client Logo
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="admin-form-group">

            <label>
              Client / Company Name
            </label>

            <input
              type="text"
              placeholder="Enter client/company name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>


          <div className="admin-form-group">

            <label>
              Logo
            </label>

            <input
              id="clientLogoFile"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

          </div>


          <button
            type="submit"
            className="btn btn-dark"
            disabled={loading}
          >
            {loading
              ? "Uploading..."
              : "Upload Logo"}
          </button>

        </form>

      </div>


      {/* LOGOS */}

      <div className="admin-header">

        <h2
          style={{
            fontSize: "1.1rem",
            margin: 0,
            textTransform: "none",
          }}
        >
          Uploaded Client Logos
        </h2>

      </div>


      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "15px",
        }}
      >

        {logos.map((logo) => (

          <div
            key={logo._id}
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              padding: "20px",
            }}
          >

            <div
              style={{
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >

              <img
                src={logo.logo}
                alt={logo.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "80px",
                  objectFit: "contain",
                }}
              />

            </div>

            <strong>
              {logo.name}
            </strong>

            <button
              type="button"
              onClick={() => deleteLogo(logo._id)}
              style={{
                display: "block",
                marginTop: "12px",
                color: "#b3261e",
                border: 0,
                background: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ManageClientLogos;