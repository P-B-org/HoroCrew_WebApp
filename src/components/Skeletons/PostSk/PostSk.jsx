import React from "react";
import "./PostSk.css";

export const PostSk = () => {
  return (
    <div className="card-sk">
      <div className="skeleton">
        <div className="t-white mast">
          <p className="skeleton-name"></p>
          <p className="skeleton-location"></p>
        </div>
      </div>
      <div className="skeleton">
        <div className="t-white mast">
          <p className="skeleton-name"></p>
          <p className="skeleton-location"></p>
        </div>
      </div>
      <div className="skeleton">
        <div className="t-white mast">
          <p className="skeleton-name"></p>
          <p className="skeleton-location"></p>
        </div>
      </div>
    </div>
  );
};
