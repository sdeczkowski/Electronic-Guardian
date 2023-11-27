import React, { useState } from "react";
import Switch from "react-switch";
import { FaRegUserCircle } from "react-icons/fa";
import "../styles/style.css"; // Import your custom styles if needed

const Profile = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const handleChange = (checked) => {
    setChecked(checked);
  };
  const handleChange2 = (checked2) => {
    setChecked2(checked2);
  };


  return (
    <div className="xd">
      <div className="xd2">
        <FaRegUserCircle size={300} />
      </div>
      <div className="xd3">
        <hr />
        <h6>Profile</h6>
        <hr />
        <div>Imie</div>
        <div>Nazwisko</div>
        <div className="swi">
        <div>Powiadomienia</div>
        <Switch
          onChange={handleChange}
          checked={checked}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch" // Add your custom class for styling
          id="material-switch"
        />
        </div>
        <div className="swi">
          <div>Tryb ciemny</div>
          <Switch
            onChange={handleChange2}
            checked={checked2}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch2" // Add your custom class for styling
            id="material-switch"
          />
        </div>
        <hr />
        <h6>Account</h6>
        <hr />
        <div>Zmień hasło</div>
        <div>Zmień e-mail</div>
      </div>
    </div>
  );
};

export default Profile;
