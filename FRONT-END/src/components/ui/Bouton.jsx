import React from 'react'
// cela va etre reutilisable plus tard
function Button({ children }) {
  return (
  <button className='border rounded-md m-2 p-2'>{children}</button>
  );
}
export default Button;
