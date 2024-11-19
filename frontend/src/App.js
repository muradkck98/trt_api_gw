import React, { useState } from 'react';

const App = () => {
  // API endpoint'leri
  const proxyApiUrl = 'http://localhost:3000/api/proxy/';
  const unifiedApiUrl = 'http://localhost:3000/api/content';
  const translateApiUrl = 'http://localhost:3000/api/translate/digest';

  const [responseData, setResponseData] = useState('');
  const [selectedLang, setSelectedLang] = useState('fra');  // Varsayılan dil "fra" olarak ayarlandı

  // Proxy API butonları için diller
  const languages = ['fra', 'ara', 'bos', 'sqi', 'mkd', 'rus', 'deu'];

  // Proxy API isteği
  const fetchProxyApi = () => {
    fetch(`${proxyApiUrl}${selectedLang}`)
      .then((response) => response.json())
      .then((data) => setResponseData(JSON.stringify(data, null, 2)))
      .catch((error) => console.error('Error fetching Proxy API:', error));
  };

  // Unified Content API isteği
  const fetchUnifiedApi = () => {
    fetch(unifiedApiUrl)
      .then((response) => response.json())
      .then((data) => setResponseData(JSON.stringify(data, null, 2)))
      .catch((error) => console.error('Error fetching Unified Content API:', error));
  };

  // Translate API isteği
  const fetchTranslateApi = () => {
    fetch(translateApiUrl)
      .then((response) => response.json())
      .then((data) => setResponseData(JSON.stringify(data, null, 2)))
      .catch((error) => console.error('Error fetching Translate API:', error));
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    {/* Left Section */}
    <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
      <section style={{ marginBottom: '20px' }}>
        <h2>Proxy API</h2>
        <p><strong>Endpoint</strong>: /api/proxy/:lang</p>
        <p><strong>Method</strong>: GET</p>
        <p><strong>Description</strong>: Fetches content directly from a specific language API.</p>
        <div>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            style={{ margin: '5px', padding: '10px' }}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
          <button onClick={fetchProxyApi} style={{ margin: '5px', padding: '10px' }}>
            Fetch Content in {selectedLang.toUpperCase()}
          </button>
        </div>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>Unified Content API</h2>
        <p><strong>Endpoint</strong>: /api/content</p>
        <p><strong>Method</strong>: GET</p>
        <p><strong>Description</strong>: Fetches and combines data from multiple APIs into a unified structure.</p>
        <button
          onClick={fetchUnifiedApi}
          style={{ padding: '10px', marginTop: '10px' }}
        >
          Fetch Unified Content
        </button>
      </section>

      <section>
        <h2>Translate API</h2>
        <p><strong>Endpoint</strong>: /api/translate/digest</p>
        <p><strong>Method</strong>: GET</p>
        <p><strong>Description</strong>: Aggregates and translates content from multiple APIs into English.</p>
        <button
          onClick={fetchTranslateApi}
          style={{ padding: '10px', marginTop: '10px' }}
        >
          Fetch Translated Content
        </button>
      </section>
    </div>

    {/* Right Section */}
    <div
      style={{
        flex: 2,
        padding: '20px',
        background: '#f4f4f4',
        overflowY: 'auto', // Enable vertical scrolling
        height: '100vh', // Ensure full height for the container
      }}
    >
      <h3>Response Data</h3>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          maxHeight: 'calc(100vh - 60px)', // Ensures scrollable within the viewport
        }}
      >
        {responseData}
      </pre>
    </div>
  </div>
  );
};

export default App;
