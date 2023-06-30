import React from "react";

/* NON FUNCTIONAL COMPONENT */
const AddressList = (addresses) => {
  return (
    <div>
      <select>
        {addresses && addresses.length > 0
          ? addresses.map((address, index) => (
              <option key={index} value={address}>
                {address}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default AddressList;
