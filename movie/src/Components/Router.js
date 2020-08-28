import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";
import Home from "../Routes/Home";
import Search from "../Routes/Search";
import TV from "../Routes/TV";
import Detail from "../Routes/Detail";
import Popular from "../Routes/Popular";
export default () => (
    <BrowserRouter>
        <>
            <Route path="/" exact component={Home()} />
            <Route path="/detail" exact component={Detail} />
            <Route path="/search" exact component={Search()} />
            <Route path="/tv"  component={TV} />
            <Route path="/tv/popular" component={Popular} />
        </>
    </BrowserRouter>
)

