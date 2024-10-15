import React from "react";
import Stack from "../components/Stack/Stack";
import Layer from "../components/Stack/Layer";

function Home() {
    return (
        <>
            <Stack height="400px">
                <Layer type="singleColor" color="orange" opacity="1" zIndex={1} />
                <Layer type="singleColor" color="blue" opacity="0.5" zIndex={2} />
            </Stack>
            <h1>hello react</h1>
        </>
    );
}

export default Home;
