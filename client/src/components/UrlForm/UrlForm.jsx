import React, { useState } from "react";
import axios from "axios";
import styles from "./UrlForm.module.scss";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [userUrl, setUserUrl] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!url) {
      alert("please enter something");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/url/create`, { origUrl: url })
      .then((res) => {
        setUserUrl(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    setUrl("");
  };
  console.log(url);

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>URL Shorty</h1>
      <form className={styles.container__form} onSubmit={onSubmit}>
        <input
          className={styles.container__input}
          type="text"
          placeholder="http://samplesite.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button type="submit" className={styles.container__button}>
          Shorten!
        </button>
      </form>
      {userUrl && (
        <p className={styles.container__text}>
          Here you go:
          <div>
            {" "}
            <a className={styles.container__link} href={userUrl.shortUrl} target="_blank">
              {userUrl.shortUrl}
            </a>{" "}
          </div>
        </p>
      )}
    </div>
  );
};

export default UrlForm;
