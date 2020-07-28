import React from 'react';
import {
  Link,
  Redirect
} from "react-router-dom";
import Arweave from 'arweave/web';


class Account extends React.Component {

    render() {
        function GetWalletAddress() {
          const arweave = Arweave.init();
          arweave.wallets.jwkToAddress(JSON.parse(window.sessionStorage.getItem("wallet"))).then((address) => {
            window.sessionStorage.setItem("WalletAddress", address);
          });
        }
        function GetAddress() {
          return window.sessionStorage.getItem("WalletAddress");
        }
        function GetMnemonic() {
          const bip39 = require('bip39')
          const mnemonic = bip39.generateMnemonic()
          window.sessionStorage.setItem("Mnemonic", mnemonic);
          return mnemonic;
        }
        function MnemonicShare() {
          var secrets = require('secrets.js');
          var shares = secrets.share(window.sessionStorage.getItem("Mnemonic").split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),""), 2, 2); 
          var comb = secrets.combine(shares);
          window.sessionStorage.setItem("Share", shares[0]);
          window.sessionStorage.setItem("BackupShare", shares[1]);
          // Check if shares match with actual mnemonic when reconstructed
          if (window.sessionStorage.getItem("Mnemonic") == comb.match(/.{1,4}/g).reduce((acc,char)=>acc+String.fromCharCode(parseInt(char, 16)),"")) {
            return shares[0];
          } else {
            alert("Something is wrong! Don't use this mnemonic.")
          }
        }
        if (window.sessionStorage.getItem("wallet")) {
        return (
            <div>
            	<Header/>
            	<main>
            		<article>
                {GetWalletAddress()}
                  <p>Welcome to ar-shard!</p>
                  <Link to="/logout"><button>Logout</button></Link>

                  <h4>Generate mnemonic</h4>
                  <p>Automatically generated BIP39 mnemonic that is compatible with Bitcoin, Ethereum and hardware wallets. This will change every time you update this page.</p>
                  <textarea id="mnemonic" disabled>{GetMnemonic()}</textarea>
                  <p>Back up following string at different place than mnemonic, you'll need this string to construct mnemonic again with Arweave.</p>
                  <textarea id="backup" disabled>{MnemonicShare()}</textarea>
                  <br />
                  <Link to="/upload"><button>Upload back up</button></Link> <Link to="/construct"><button>Construct back up</button></Link>
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

export default Account;
