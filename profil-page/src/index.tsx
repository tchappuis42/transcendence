import * as React from "react";
import * as ReactDOM from "react-dom";
import UserProfile from "./components/ProfilUser"
import Component from "./components/FirstComponent";
import UserInterface from "./components/UserComponent";
import Profile from "./components/userInformations";
import Clic from "./components/mesureClicTime";

ReactDOM.render (
    <div>
        <h1>Hello, welcome to React and Typescript</h1>
        {/*<Clic/>*/}
        {/*<Component/>*/}
        {/*<br/>*/}
        {/*<Profile/>*/}
        {/*<UserInterface name={"kevin"} age={28} address={"Rue de la Tour 42"} dob={new Date()} familyMember={5} sister={"Celia"} brother={"Emmanuel"} mother={"Regina"} father={"Hervé"} />*/}
        <UserProfile/>
    </div>,
    document.getElementById("root")
);