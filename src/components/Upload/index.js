import React from 'react';
import {
  Link,
  Redirect
} from "react-router-dom";
import Arweave from 'arweave/web';


class Upload extends React.Component {

    render() {
        function GetMnemonic() {
          return window.sessionStorage.getItem("Mnemonic");
        }
        function GetShare() {
          return window.sessionStorage.getItem("Share");
        }
        function GetBackupShare() {
          return window.sessionStorage.getItem("BackupShare");
        }
        async function ArweaveUpload() {
          const arweave = Arweave.init();
          var BackupShare = GetBackupShare();
          let key = JSON.parse(window.sessionStorage.getItem("wallet"));
          let transaction = await arweave.createTransaction({
              data: `${BackupShare}`,
          }, key);
          transaction.addTag('App-Name', 'arshard');
          await arweave.transactions.sign(transaction, key);
          const response = await arweave.transactions.post(transaction);
          console.log(response);
          alert('Uploaded as ' + transaction.id)
        }
        if (window.sessionStorage.getItem("wallet")) {
        return (
            <div>
            	<Header/>
            	<main>
            		<article>
                  <h5>Mnemonic</h5>
                  <p>This mnemonic is being used</p>
                  <textarea disabled>{GetMnemonic()}</textarea>
                  <h5>Share</h5>
                  <p>Please confirm you have saved this to elsewhere</p>
                  <textarea disabled>{GetShare()}</textarea>
                  <h5>Backup Share</h5>
                  <p>This will uploaded to Arweave and without the "Share", you won't be able to get "Mnemonic".</p>
                  <textarea disabled>{GetBackupShare()}</textarea>
                  <br />
                  <button onClick={ArweaveUpload}>Upload</button>
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

export default Upload;
