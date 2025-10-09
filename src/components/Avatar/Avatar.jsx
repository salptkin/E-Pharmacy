import React from "react";
import styles from "./Avatar.module.css";

const Avatar = ({ name, size = "medium" }) => {
  // İsim ve soyisimden baş harfleri al
  const getInitials = (fullName) => {
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const initials = getInitials(name);

  // Renk paleti
  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
    "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"
  ];

  // İsme göre renk seç (tutarlı olması için)
  const getColorIndex = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % colors.length;
  };

  const backgroundColor = colors[getColorIndex(name)];

  return (
    <div 
      className={`${styles.avatar} ${styles[size]}`}
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
