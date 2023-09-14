import * as React from "react";
import "../style/my-style.css";
import * as events from "events";
import {useState} from "react";
let logo: any = "file:///Users/dino/Downloads/reshot-icon-code-CZ2NMXUGQ8.svg";

export default class FirstComponent extends React.Component<{}> {
    render() {
        return (
            <div>
                <h3 className="red-text large-text"> A Simple React Component Example with Typescript</h3>
                <div>
                    <img height={250} src={logo}/>
                </div>
                <p>This component shows the Logrocket logo.</p>
                <p>For more info on Logrocket: https://logrocket.com</p>
                <div className="wrapper">
                    <p className="box1">box1</p>
                    <p className="box2">box2</p>
                    <p className="box3">box3</p>
                </div>
                <div className="grid">
                    <p className="box1">box1</p>
                    <p className="box2">box2</p>
                    <p className="box3">box3</p>
                    <p className="box4">box4</p>
                    <p className="box5">box5</p>
                    <p className="box6">box6</p>
                </div>
                <div className="boxing">
                    <div className="boxA">boxA</div>
                    <div className="boxB">boxB</div>
                    <div className="boxC">boxC</div>
                </div>
                <div className="clearfix">
                    <h1 className="large-text">Simple float example.</h1>
                    <div className="description">float</div>
                    <p className="legend">
                        Floating an element changes the behavior of that element and the block level elements that follow it in normal flow.
                        <br/>
                        The floated element is moved to the left or right and removed from normal flow, and the surrounding content floats around it.
                    </p>
                </div>
                <div>
                    <h1>Positioning</h1>

                    <p>I am a basic block level element.</p>
                    <p className="positioned">I am a basic block level element.</p>
                    <p>I am a basic block level element.</p>
                </div>
                <div>
                    <h1>Relative Positioning</h1>

                    <p>I am a basic block level element in relative position.</p>
                    <p className="positionedR">I am a basic block level element in relative position.</p>
                    <p>I am a basic block level element in relative position.</p>
                </div>
                <div>
                    <h1>Absolute Positioning</h1>

                    <p>I am a basic block level element in absolut position.</p>
                    <p className="positionedA">I am a basic block level element in absolut position.</p>
                    <p>I am a basic block level element in absolut position.</p>
                </div>
                <div>
                    <h1>sticky Positioning</h1>
                    <p className="positionedS">sticky positioning</p>
                    <p className="legend">Welcome to an introduction to RESTful APIs with NestJS. Understanding JavaScript and TypeScript
                        will make it easier to follow the directions in this article, but you don't necessarily need
                        to be proficient.
                    </p>
                    <p className="legend">NestJS is one of the most rapidly growing frameworks for building Node.js server-side applications.
                        Companies such as Roche, Adidas, and Autodesk, all trust NestJS when it comes to building efficient
                        and scalable server-side applications.
                    </p>
                    <p className="legend">NestJS is based heavily on Angular, and uses Angular-like modules, services, controllers, pipes,
                        and decorators. This allows NestJS to help developers create scalable, testable, loosely coupled,
                        and easily maintainable applications. NestJS was built with TypeScript, but it can also support
                        pure JavaScript development.
                    </p>
                    <p className="legend">NestJS offers a level of abstraction above two very popular Node.js frameworks, either Express.
                        js or Fastify. This means that all of the great middleware that are available for Express.js and
                        Fastify can also be used with NestJS.
                    </p>

                </div>
                <div>
                    <h1>Fixed Positioning</h1>
                    <p className="positionedF">Fixed positioning</p>
                    <p className="legend">Welcome to an introduction to RESTful APIs with NestJS. Understanding JavaScript and TypeScript
                         will make it easier to follow the directions in this article, but you don't necessarily need
                        to be proficient.
                    </p>
                    <p className="legend">NestJS is one of the most rapidly growing frameworks for building Node.js server-side applications.
                        Companies such as Roche, Adidas, and Autodesk, all trust NestJS when it comes to building efficient
                        and scalable server-side applications.
                    </p>
                    <p className="legend">NestJS is based heavily on Angular, and uses Angular-like modules, services, controllers, pipes,
                        and decorators. This allows NestJS to help developers create scalable, testable, loosely coupled,
                        and easily maintainable applications. NestJS was built with TypeScript, but it can also support
                        pure JavaScript development.
                    </p>
                    <p className="legend">NestJS offers a level of abstraction above two very popular Node.js frameworks, either Express.
                        js or Fastify. This means that all of the great middleware that are available for Express.js and
                        Fastify can also be used with NestJS.
                    </p>
                </div>
                <form>
                    <h1>Table layout</h1>
                    <h3 className="legend">what is your name:</h3>
                    <div>
                        <label htmlFor="fname">first name:</label>
                        <input type="text" id="fname"/>
                    </div>
                    <div>
                        <label htmlFor="lname">last name:</label>
                        <input type="text" id="lname"/>
                    </div>
                    <div>
                        <label htmlFor="brith">birth date:</label>
                        <input type="number" id="birth"/>
                    </div>
                </form>
            </div>
        );
    }
}
