import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  let navigate = useNavigate();
  async function handleReg(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;

    const { data } = await axios.post("/reg-user", { name });
    console.log(data);

    const { ok, newUser } = data;

    if (ok === true) {
      navigate(`/chats`);
    }
  }

  return (
    <div>
      <h1>Please enter your name for entare to chats</h1>
      <form onSubmit={handleReg}>
        <input type="text" name="name" placeholder="your name" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Auth;
