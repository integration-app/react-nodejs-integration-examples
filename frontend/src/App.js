import { IntegrationAppProvider, useIntegrationApp } from "@integration-app/react";
import { useEffect, useState } from "react";

function App() {

    const [accessToken, setAccessToken] = useState()

    useEffect(() => {
        (async () => {
            // Get Integration App Access Token from your backend
            const tokenResp = await fetch("http://localhost:8080/integration-token")
            setAccessToken(await tokenResp.json())
        })()
    }, [])
    if (accessToken) {
        return (
            // IntegrationAppProvider allows you to use Integration.app React hooks in all child components
            <IntegrationAppProvider token={accessToken}>

                <div class="mockup-code">
                    <pre data-prefix="$"> <code> const iApp = useIntegrationApp(); </code></pre>
                    <pre data-prefix="$"> <code> iApp.open() </code></pre>
                </div>
                <div class="flex justify-center px-4 py-16 ">

                    <Integrations />
                </div>
            </IntegrationAppProvider>
        )
    }
}

function Integrations() {
    const iApp = useIntegrationApp()
    return (
        <button onClick={() => iApp.open()} className="btn btn-wide btn-primary">Integrations</button>
    )
}

export default App