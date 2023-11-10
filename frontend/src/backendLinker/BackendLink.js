import {useContext, useState} from "react";
import {current_user, UserContext, UseUserContext} from "../App";

const central_uri = "http://127.0.0.1:5000/";
// const central_uri = "http://ec2-13-59-237-43.us-east-2.compute.amazonaws.com:5000/"

export async function post(path, body) {
    return await fetch(central_uri + path, {
        method: "post",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function get(path, params) {
    const { currentUser, setCurrentUser } = UseUserContext(); // Bypass access to context outside of a React element
    let paramPath = path;
    if (currentUser !== null && !("session_id" in params)) { // Auto assign session id
        params.session_id = currentUser.session_id;
    }
    if (Object.keys(params).length !== 0) {
        paramPath = paramPath + "?";
        Object.entries(params).forEach((entry, index) => {
            if (index !== 0) {
                paramPath = paramPath + "&";
            }
            paramPath = paramPath + entry[0] + "=" + entry[1];
        });
    }
    return await fetch(central_uri + paramPath, {
        method: "get",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
}