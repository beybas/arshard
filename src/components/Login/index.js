import React from 'react';
import {
  Link,
  Redirect
} from "react-router-dom";


class Login extends React.Component {

    render() {
    	let fileReader;
    	
    	const handleFileRead = (e) => {
    	  const content = fileReader.result;
    	  console.log(content)
    	  window.sessionStorage.setItem("wallet", content);
    	};
    	
    	const handleFileChosen = (file) => {
    	  fileReader = new FileReader();
    	  fileReader.onloadend = handleFileRead;
    	  fileReader.readAsText(file);
    	};
      if (window.sessionStorage.getItem("wallet")) {
        return (<Redirect to="/account"/>);
      } else {
        return (
            <div>
            	<Header/>
            	<main>
            		<article>
            		<p>Arweave wallet with a balance over zero is required. For more information about Arweave, please visit <a href="https://arweave.org">arweave.org</a>.</p>
            		<form>
            		  <fieldset>
            		    <legend>Upload Wallet</legend>
            		    <label for="arweave">Arweave wallet file</label>
            		    <input type="file" id="file" accept='.json' onChange={e => handleFileChosen(e.target.files[0])} required/>
            		    <Link to="/account"><button>Continue</button></Link>
            		  </fieldset>
            		</form>
            		</article>
            	</main>
            </div>
        );
      }
    };
};

function Header() {
  return (
    <header>
      <h1>arshard</h1>
      <nav>
      <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/upload_wallet">
              Upload Wallet <small>(Login)</small>
            </Link>
          </li>
          <li>
            <Link to="/account">
              Account
            </Link>
          </li>
          <li>
            <Link to="/construct">
              Construct
            </Link>
          </li>
        </ul>
      </nav>
      <br/>
    </header>
    );
}

export default Login;
