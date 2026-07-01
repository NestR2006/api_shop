import { useEffect, useState } from "react";

import "../../styles/userInformation.css";

interface UserInfo{
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  address: string,
}

const UserInformation = () => {
  const [data, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const loadUser = async () => {
      const response = await fetch("/api/user-info", {
        credentials: "include",
      });
      const userInfo = await response.json();
      setUserInfo(userInfo.user);
    };

    loadUser();
  }, []);

  return (
    <section id="user-information">
      <h1 className="welcome-text">Личный кабинет</h1>
      <div className="profile-card">
        <div className="info-group">
          <h3>Личные данные</h3>
          <div className="info-item">
            <span className="label">Имя:</span>
            <span className="value">{data?.firstName}</span>
          </div>
          <div className="info-item">
            <span className="label">Фамилия:</span>
            <span className="value">{data?.lastName}</span>
          </div>
        </div>

        <div className="info-group">
          <h3>Контакты и доставка</h3>
          <div className="info-item">
            <span className="label">Телефон:</span>
            <span className="value">{data?.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Почта:</span>
            <span className="value">{data?.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Адрес:</span>
            <span className="value">{data?.address}</span>
          </div>
        </div>
        <button className="edit-profile-btn">Редактировать профиль</button>
      </div>
    </section>
  );
};

export default UserInformation;
