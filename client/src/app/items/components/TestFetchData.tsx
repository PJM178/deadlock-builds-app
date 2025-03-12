const TestFetchData = () => {
  const handleFetchData = async () => {
    const response = await fetch("http://localhost:5000/recipes");
    const data = await response.json();
    console.log(console.log(data));
  }

  return (
    <button onClick={handleFetchData}>test</button>
  );
};

export default TestFetchData;