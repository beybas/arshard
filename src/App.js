import React from "react";
import {
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter
} from "react-router-dom";
import Login from './components/Login'
import Account from './components/Account'
import Upload from './components/Upload'
import Construct from './components/Construct'
import Recover from './components/Recover'

export default function App() {
  return (
    <HashRouter>
      <div>
        <Switch>
          <Route path="/recover">
            <Recover />
          </Route>
          <Route path="/construct">
            <Construct />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/upload_wallet">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

function Home() {
  return (
    <div>
      <Header/>
      <main>  
        <article>
          <p>Securely backup BIP39 mnemonics. One share of your BIP39 mnemonics stored securely on Arweave.</p>
          <p>BIP39 mnemonics are compatible with <b>Bitcoin, Trezor, Ledger and many more cryptocurrencies and wallets</b>!</p>
          <p>This application uses Shamir's Secret Sharing, so without one of the private key shares (except the one stored at Arweave, obviously), the private key can't reconstructed.</p>
          <p>You can view source code on <a href="https://github.com/beybas/arshard">GitHub</a>, source code is licensed under MIT license.</p>
          <br/>
          <Link to="/upload_wallet"><button>Upload wallet</button></Link>
        </article>
      </main>
    </div>
    );
}

function Logout() {
  window.sessionStorage.setItem("wallet", "");
  return (
      <div>
        <Redirect to="/upload_wallet"/>
      </div>
    )
}


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