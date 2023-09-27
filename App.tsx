import Message from './Message';

function App() {
  
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <header><h1>Enter your user ID</h1></header>
      <label>
        UserName: <input name="myInput" />
      </label>
      <br />
      <label>
        Password:  <input name="myInput" />
      </label>
      {/*<div><Message /></div>;*/}
      <br></br>
      <button type="reset">Clear</button>
      <button type="submit">Log In </button>
    </form>
  );

}

export default App;