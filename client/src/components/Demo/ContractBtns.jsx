import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue, setGreetValue }) {
  const {
    state: { contract, accounts },
  } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [input2Value, setInput2Value] = useState("");

  const handleInputChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };
  const handleInput2Change = (e) => {
    if (/^[a-zA-Z]+$/.test(e.target.value)) {
      setInput2Value(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const greet = async () => {
    const value = await contract.methods.greet().call({ from: accounts[0] });
    setGreetValue(value);
  };

  const write = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };
  const setGreet = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (input2Value === "") {
      alert("Please enter a value to write.");
      return;
    }
    // const newValue = parseInt(input2Value);
    await contract.methods.setGreet(input2Value).send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={read}>read()</button>

      <div onClick={write} className="input-btn">
        write(
        <input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />
        )
      </div>
      <button onClick={greet}>greet()</button>
      <div onClick={setGreet} className="input-btn">
        setGreet(
        <input
          type="text"
          placeholder="string"
          value={input2Value}
          onChange={handleInput2Change}
        />
        )
      </div>
    </div>
  );
}

export default ContractBtns;
