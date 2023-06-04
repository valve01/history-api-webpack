import * as $ from "jquery";
import Post from "@models/Post";
import json from "./assets/json.json";
import "./styles/style.scss";
import xml from "./assets/data.xml";
import csv from "./assets/data.csv";
import Wlogo from "@/assets/webpack-logo.png";
const post = new Post("Первый пост", Wlogo);
import "./babel";

$("pre").addClass("code").html(post.toString());
console.log(post);
console.log("Post to String", post.toString());
console.log("JSON:", json);
console.log(xml);
console.log(csv);

