import React from "react";
import BreathIcon from "../assets/breath-icon.png";
import PoseIcon from "../assets/poses-icon.png";
import PrintIcon from "../assets/print-icon.png";

const featuresData = [
  {
    icon: BreathIcon,
    title: "Симуляция дыхания",
    text: "Ощути дыхание женщины, хоть и искусственной",
  },
  {
    icon: PoseIcon,
    title: "Позы",
    text: "Экзоскелет, позволяющий ставить куклу в позу снайпера",
  },
  {
    icon: PrintIcon,
    title: "Кастомные принты",
    text: "Отправьте нам принт персонажа для своей кастомной дакимакуры",
  },
];

const Features = () => {
  return (
    <section id="features-section">
      {featuresData.map((feature) => {
        return (
          <div className="feature">
            <img src={feature.icon} alt="" className="features-icon" />
            <div className="informations">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Features;
