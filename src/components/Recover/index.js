import React from 'react';
import {
  Link,
  Redirect
} from "react-router-dom";
import Arweave from 'arweave/web';


class Recover extends React.Component {
    state = {
      value: ''
    };
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
      this.setState({value: e.target.value});
      window.sessionStorage.setItem("BackupShare", e.target.value);
    }

    render() {
      function getTXID() {
        return window.sessionStorage.getItem('transactionID');
      }
      function recoverMnemonic() {
        (async () => {
          const arweave = Arweave.init();
          arweave.transactions.getData(window.sessionStorage.getItem('transactionID'), {decode: true, string: true}).then(data => {
            var secrets = require('secrets.js');
            var shares = [window.sessionStorage.getItem("BackupShare"), data]
            var comb = secrets.combine( shares );
            alert(comb.match(/.{1,4}/g).reduce((acc,char)=>acc+String.fromCharCode(parseInt(char, 16)),""));
            console.log(data);
          });
        })();
      }
        if (window.sessionStorage.getItem("wallet")) {
        return (
            <div>
            	<Header/>
            	<main>
            		<article>
                  <p>Recovering {getTXID()}</p>
                  <p>Please enter backup share provided to you</p>
                  <textarea value={this.state.value} onChange={this.handleChange}></textarea>
                  <br />
                  <button onClick={recoverMnemonic}>Recover</button>
                  <p>If backup share is wrong, nothing will happen. Try to remove whitespaces and check if backup share is true.</p>
            		</article>
            	</main>
            </div>
        );
      }
      else {
        return (<Redirect to="/upload_wallet"/>);
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

export default Recover;
