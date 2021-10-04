import "./App.css";
import { Component } from "react";
import { HashRouter, NavLink, Route } from "react-router-dom";
import From_Logo from "./assets/images/From_Logo.jpg";
import Home from "./Components/Home";
import Games from "./Components/Games";
import DLCs from "./Components/DLCs";
import DemonsSouls from "./Components/DemonsSouls";
import DarkSouls from "./Components/DarkSouls";
import DarkSoulsII from "./Components/DarkSoulsII";
import DarkSoulsIII from "./Components/DarkSoulsIII";
import Bloodborne from "./Components/Bloodborne";
import Sekiro from "./Components/Sekiro";
import Cart from "./Components/Cart";



class App extends Component {
  
  render() {

    
    return (
      <div>
        <div id="header">
          <img src={From_Logo} alt="FromLogo" id="headerLogo"></img>
          
          
      </div>
      <HashRouter>
            <NavLink to="/cart"><button className="cartBtn" id="cartBtn">Go To Cart</button></NavLink>
            <Route path="/cart" component={Cart}/>
          </HashRouter>
      
        <HashRouter>
        <div id="filterGames">
          <NavLink exact to="/"><button className="cartBtn">SHOW ALL</button></NavLink><br></br>
          <NavLink to="/games"><button className="cartBtn">Games</button></NavLink>
          <NavLink to="/DLCs"><button className="cartBtn">DLCs</button></NavLink>
          <NavLink to="/demonssouls"><button className="cartBtn">Demon's Souls</button></NavLink>
          <NavLink to="/darksouls"><button className="cartBtn">Dark Souls</button></NavLink>
          <NavLink to="/darksoulsII"><button className="cartBtn">Dark Souls II</button></NavLink>
          <NavLink to="/darksoulsIII"><button className="cartBtn">Dark Souls III</button></NavLink>
          <NavLink to="/bloodborne"><button className="cartBtn">Bloodborne</button></NavLink>
          <NavLink to="/Sekiro"><button className="cartBtn">Sekiro</button></NavLink>
        </div>
        

        <div>
          <Route exact path="/"component={Home}/>
          <Route path="/games" component={Games}/>
          <Route path="/DLCs" component={DLCs}/>
          <Route path="/demonssouls" component={DemonsSouls}/>
          <Route path="/darksouls" component={DarkSouls}/>
          <Route path="/darksoulsII" component={DarkSoulsII}/>
          <Route path="/darksoulsIII" component={DarkSoulsIII}/>
          <Route path="/bloodborne" component={Bloodborne}/>
          <Route path="/sekiro" component={Sekiro}/>
        </div>
        </HashRouter>
        
          
        <div id="footer">
          <p>I own nothing. This is a fanmade website for practice.</p>
        </div>
      </div>
    );
  }
}

export default App;
