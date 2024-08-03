import "./Project.module.css"

import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Project() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "../../unity/unityProjects.loader.js",
    dataUrl: "../../unity/webgl.data",
    frameworkUrl: "../../unity/build.framework.js",
    codeUrl: "../../unity/build.wasm",
  });

  return <Unity unityProvider={unityProvider} style={{
        width: '50vw',
        height: '50vh',
        }}
    />;
}

export default Project;