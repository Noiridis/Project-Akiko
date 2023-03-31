import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const HordeModelSelector = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch('https://stablehorde.net/api/v2/status/models?type=text');
      const data = await response.json();
      const formattedData = data.map((model) => ({
        value: model.name,
        label: model.name,
      }));
      setModels(formattedData);
      // Set the default selected model if there are models
      if (formattedData.length > 0) {
        setSelectedModel(formattedData[0]);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedModel(selectedOption);
    localStorage.setItem('hordeModel', selectedOption.value);
  };

  return (
    <>
    <h3>Horde Model Selector</h3>
    <div id='endpoint-container'>
      <Select
        id="options"
        inputId="model-select"
        value={selectedModel}
        onChange={handleChange}
        options={models}
      />
    </div>
    </>
  );
};

export default HordeModelSelector;