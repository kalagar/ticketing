import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      onSuccess && onSuccess(response.data);
      return response.data;
    } catch (err) {
      setErrors(() => (
        <div className="alert alert-danger my-3" role="alert">
          <strong>Oops...</strong>
          <ul className="my-0">
            {err.response.data.errors.map((error) => (
              <li>{error.message}</li>
            ))}
          </ul>
        </div>
      ));
    }
  };

  return { doRequest, errors };
};
