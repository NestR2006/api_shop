import React from "react";

import "../styles/userInformation.css";

let userInformation = {
  firstName: "Test",
  lastName: "Abdulah",
  town: "NYC",
  phoneNumber: "+14882281337",
  address: "Dom 673 ul. Huj sosi",
};

const UserInformation = () => {
  return (
    <section id="user-information">
      <h1 className="welcome-text">Личный кабинет</h1>
      <div className="profile-card">
        <div className="info-group">
          <h3>Личные данные</h3>
          <div className="info-item">
            <span className="label">Имя:</span>
            <span className="value">{userInformation.firstName}</span>
          </div>
          <div className="info-item">
            <span className="label">Фамилия:</span>
            <span className="value">{userInformation.lastName}</span>
          </div>
        </div>

        <div className="info-group">
          <h3>Контакты и доставка</h3>
          <div className="info-item">
            <span className="label">Город:</span>
            <span className="value">{userInformation.town}</span>
          </div>
          <div className="info-item">
            <span className="label">Телефон:</span>
            <span className="value">{userInformation.phoneNumber}</span>
          </div>
          <div className="info-item">
            <span className="label">Адрес:</span>
            <span className="value">{userInformation.address}</span>
          </div>
        </div>
        <button className="edit-profile-btn">Редактировать профиль</button>
      </div>
    </section>
  );
};

export default UserInformation;
