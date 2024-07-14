import React, { useState } from 'react';
import axios from 'axios';

const GenerateCustomersForm = () => {
    const [context, setContext] = useState('retail');
    const [locale, setLocale] = useState('en_US');
    const [sendTxns, setSendTxns] = useState(false);
    const [enableLogging, setEnableLogging] = useState(false);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/generate-customers', {
                context,
                locale,
                sendTxns,
                enableLogging,
            });
            setResponse(res.data);
        } catch (err) {
            console.error(err);
            setResponse({ error: 'An error occurred' });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Context:
                    <select value={context} onChange={(e) => setContext(e.target.value)}>
                        <option value="retail">Retail</option>
                        <option value="qsr">QSR</option>
                        <option value="fuel">Fuel</option>
                    </select>
                </label>
                <br />
                <label>
                    Locale:
                    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
                        <option value="en_US">English (US)</option>
                        <option value="es_MX">Spanish (Mexico)</option>
                        <option value="pt_PT">Portuguese (Portugal)</option>
                    </select>
                </label>
                <br />
                <label>
                    Send Transactions:
                    <input
                        type="checkbox"
                        checked={sendTxns}
                        onChange={(e) => setSendTxns(e.target.checked)}
                    />
                </label>
                <br />
                <label>
                    Enable Logging:
                    <input
                        type="checkbox"
                        checked={enableLogging}
                        onChange={(e) => setEnableLogging(e.target.checked)}
                    />
                </label>
                <br />
                <button type="submit">Generate Customers</button>
            </form>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default GenerateCustomersForm;
