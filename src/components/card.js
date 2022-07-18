import React, { useState, useEffect } from "react";

const Card = () => {
  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/search/repositories?q=created:>2021-08-13&sort=stars&order=desc"
      );
      const jsonData = await response.json();
      const currentSubmit = jsonData.items.filter(
        (item) =>
          new Date(item.created_at).toLocaleString("en-US", {
            day: "2-digit",
          }) <= 30
      );
      setProfile(currentSubmit);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="outter_container">
      {profile.map((data) => {
        const {
          name,
          description,
          stargazers_count,
          open_issues_count,
          owner,
          full_name,
          created_at,
        } = data;

        return (
          <>
            <div className="container" key={name}>
              <div>
                {" "}
                <img src={owner.avatar_url} alt={name} />
              </div>
              <div className="text-container">
                {" "}
                <p className="repo_name">{full_name}</p>
                <p>{description}</p>
                <div className="stargazers_count-container">
                  <p className="stars-container">Stars: {stargazers_count}</p>
                  <p className="stars-container">Issues: {open_issues_count}</p>
                  <p className="submitted">
                    Submitted{" "}
                    {new Date(created_at).toLocaleString("en-US", {
                      day: "2-digit",
                    })}{" "}
                    days ago by {name}
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Card;
