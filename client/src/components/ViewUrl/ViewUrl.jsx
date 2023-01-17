import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ViewUrl.module.scss";

const ViewUrl = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    let intervalId;
    const fetchUrlAndSetUrl = async () => {
      const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/url`);
      setUrls(result.data);
    };
    fetchUrlAndSetUrl();
    intervalId = setInterval(fetchUrlAndSetUrl, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <table className={styles.container__table}>
        <thead className={styles.table__dark}>
          <tr>
            <th>Original Url</th>
            <th>Short Url</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, idx) => (
            <tr key={idx}>
              <td>{url.origUrl}</td>
              <td>
                <a href={`${url.shortUrl}`} target="_blank">
                  {url.shortUrl}
                </a>
              </td>
              <td>{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUrl;
