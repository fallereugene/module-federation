import React, { Suspense } from "react";
import { App } from "./app";
import { ModuleLoader } from "./module-loader";
import { provider } from "../core";
import "../styles/app.css";

/**
 * В данном случае адрес представляет собой константу
 * В production-ready решении могут использоваться как переменные окружения (.env), так и получение
 * какого то конфигурационного файла, на основании которого можно строить карту соответствия и загружать соответствующие приложения
 */
const REMOTE_URL_PATH = "http://localhost:8082/remoteEntry.js";

/**
 * Значение SCOPE должно соответствовать полю name в конфигурации ModuleFederationPlugin удаленного приложения
 * См. /dynamic-modules/remote/webpack.config.js
 */
const SCOPE = "remoteApp";
/**
 * Значение SCOPE должно соответствовать импортируемым компонентам (поля перечислены в exposes) в конфигурации ModuleFederationPlugin удаленного приложения
 * См. /dynamic-modules/remote/webpack.config.js
 */
const MODULE = "./RemoteApplication";

export const Root = () => {
  const [isReady, setReadyState] = React.useState(false);

  return (
    <div>
      <h1>React App (Host)</h1>
      <App isReady={isReady} />
      <Suspense fallback={<div>Загрузка...</div>}>
        {
          <ModuleLoader
            url={REMOTE_URL_PATH}
            scope={SCOPE}
            module={MODULE}
            hostProvider={provider}
            registerRemoteApplication={() => setReadyState(true)}
          />
        }
      </Suspense>
      <div />
    </div>
  );
};

export default Root;
