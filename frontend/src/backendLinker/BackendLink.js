import {useContext, useState} from "react";
import {UserContext, UseUserContext} from "../App";

//export const central_uri = "http://127.0.0.1:5000/";
 export const central_uri = "http://ec2-13-59-237-43.us-east-2.compute.amazonaws.com:5000/"

export async function post(path, currentUser, body) {
    if (currentUser !== null) {
        if (!("uid" in body)) body.uid = currentUser.id;
        path = path + "?session_id=" + currentUser.session_id;
    }
    return await fetch(central_uri + path, {
        method: "post",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function get(path, currentUser, params) {
    if (currentUser !== null) {
        if (!("session_id" in params)) params.session_id = currentUser.session_id;
        if (!("uid" in params)) params.uid = currentUser.id;
    }
    let paramPath = path;
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