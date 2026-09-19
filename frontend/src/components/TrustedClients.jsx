import { useEffect, useState } from "react";
import api from "../api/axios";
import "./trustedClients.css";

const DEFAULT_LOGOS = [
  {
    _id: "default-15",
    name: "Client 15",
    logo: "https://onessinfra.com/images/clients/client15.png",
  },
  {
    _id: "default-16",
    name: "Client 16",
    logo: "https://onessinfra.com/images/clients/client16.png",
  },
  {
    _id: "default-1",
    name: "Client 1",
    logo: "https://onessinfra.com/images/clients/client1.png",
  },
  {
    _id: "default-2",
    name: "Client 2",
    logo: "https://onessinfra.com/images/clients/client2.png",
  },
  {
    _id: "default-17",
    name: "Client 17",
    logo: "https://onessinfra.com/images/clients/client17.png",
  },
  {
    _id: "default-18",
    name: "Client 18",
    logo: "https://onessinfra.com/images/clients/client18.png",
  },
  {
    _id: "default-19",
    name: "Client 19",
    logo: "https://onessinfra.com/images/clients/client19.png",
  },
  {
    _id: "default-20",
    name: "Client 20",
    logo: "https://onessinfra.com/images/clients/client20.png",
  },
  {
    _id: "default-21",
    name: "Client 21",
    logo: "https://onessinfra.com/images/clients/client21.png",
  },
  {
    _id: "default-22",
    name: "Client 22",
    logo: "https://onessinfra.com/images/clients/client22.png",
  },
  {
    _id: "default-23",
    name: "Client 23",
    logo: "https://onessinfra.com/images/clients/client23.png",
  },
];

const TrustedClients = () => {
  const [logos, setLogos] = useState(DEFAULT_LOGOS);

  useEffect(() => {
    api
      .get("/client-logos")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setLogos(res.data);
        }
      })
      .catch((err) => {
        console.error("Client logos error:", err);
      });
  }, []);

  /*
    Make sure we have at least 12 logos.
    This allows two rows of 6.
  */
  const displayLogos = [...logos, ...logos];

  const rowOne = displayLogos.slice(0, 6);
  const rowTwo = displayLogos.slice(6, 12);

  /*
    Duplicate each row so CSS animation
    can continuously loop without an empty gap.
  */
  const renderLogos = (items) => (
    <>
      {items.map((client, index) => (
        <div
          className="trusted-client"
          key={`${client._id}-${index}`}
        >
          <img
            src={client.logo}
            alt={client.name || "Trusted client"}
            loading="lazy"
          />
        </div>
      ))}
    </>
  );

  return (
    <section className="trusted-clients">

      <div className="container">

        {/* HEADER */}

        <div className="trusted-clients__header">

          <div>
            <span className="trusted-clients__eyebrow">
              OUR CLIENTS
            </span>

            <h2>
              Trusted by the <em>best.</em>
            </h2>
          </div>

          <p>
            Businesses, professionals and project partners
            who trust Optiwise Infrastructure for their
            planning, design and construction requirements.
          </p>

        </div>


        {/* ROW 1 */}

        <div className="trusted-track-wrapper">

          <div className="trusted-track trusted-track--left">

            {renderLogos(rowOne)}
            {renderLogos(rowOne)}

          </div>

        </div>


        {/* ROW 2 */}

        <div className="trusted-track-wrapper">

          <div className="trusted-track trusted-track--right">

            {renderLogos(rowTwo)}
            {renderLogos(rowTwo)}

          </div>

        </div>

      </div>

    </section>
  );
};

export default TrustedClients;