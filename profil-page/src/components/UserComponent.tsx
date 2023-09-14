import * as React from "react";
import User from "../tsFiles/interface";
import UserFamily from "../tsFiles/interface";

export default class UserComponent extends React.Component<User, UserFamily> {
    constructor(props: User) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>User Component</h1>
                <br/>
                Hello, <b>{this.props.name}.</b>
                <br/>
                You are, <b>{this.props.age} year old.</b>
                <br/>
                You lives in, <b>{this.props.address}.</b>
                <br/>
                You are born, <b>{this.props.dob.toDateString()}.</b>
                <br/>
                Your family is composed of, <b>{this.props.familyMember}.</b>
                <br/>
                Your sister's name is, <b>{this.props.sister}.</b>
                <br/>
                Your brother's name is, <b>{this.props.brother}.</b>
                <br/>
                Your mother's name is, <b>{this.props.mother}.</b>
                <br/>
                Your father's name is, <b>{this.props.father}.</b>
                </div>
        )
    }
}
