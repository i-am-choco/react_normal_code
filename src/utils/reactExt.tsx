import { message, notification } from "antd";
import React from "react";

export class ComponentExt<P= {}, S={}> extends React.Component<P, S> {
    $message = message
    $notification = notification
}