import React, {useEffect, useState} from "react";
import {
  Link,
  Redirect
} from "react-router-dom";
import Arweave from 'arweave/web';


class Construct extends React.Component {
    state = {
      all_transactions: [],
      value: ''
    };
    componentDidMount() {
      if (window.sessionStorage.getItem("wallet")) {
        (async () => {
          const arweave = Arweave.init();
          var address = window.sessionStorage.getItem("WalletAddress");
          const txids = await arweave.arql({
            op: "and",
            expr1: {
              op: "equals",
              expr1: "from",
              expr2: address
            },
            expr2: {
              op: "equals",
              expr1: "App-Name",
              expr2: "arshard"
            }
          });
          console.log(txids);
          this.setState({ all_transactions: txids });
        })();
      }
    }

    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
      this.setState({value: e.target.value});
      window.sessionStorage.setItem("transactionID", e.target.value);
    }

    render() {
        if (window.sessionStorage.getItem("wallet")) {
        return (
            <div>
            	<Header/>
            	<main>
            		<article>
                  <h3>Transaction(s)</h3>
                  <br/>
                  {this.state.all_transactions.map(tx => (
                    <li key={tx.key}>{tx}</li>
                  ))}
                  <p>Please copy and paste one of the transaction(s) above that you wan't to recover mnemonic</p>
                  <input type="text" id="txid" name="txid" placeholder="Enter TX" value={this.state.value} onChange={this.handleChange} ></input>
                  <br/>
                  <Link to="/recover"><button>Recover</button></Link>
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

export default Construct;
