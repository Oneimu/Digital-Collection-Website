import React from 'react';
import { useParams } from "react-router-dom";

export default function Post() {
    let params = useParams()

    return <h1>{params.postId}</h1>
}
