import { useState, useEffect } from 'react';

type NodeType = {
  id: string;
  name: string;
  settings: {
    [key: string]: any;
  };
};

type NodeSetting = {
  key: string;
  value: any;
};

type UseNodeTypesResult = {
  nodeTypes: NodeType[];
  nodeSettings: NodeSetting[];
};

const useNodeTypes = (): UseNodeTypesResult => {
  const [nodeTypes, setNodeTypes] = useState<NodeType[]>([]);
  const [nodeSettings, setNodeSettings] = useState<NodeSetting[]>([]);

  useEffect(() => {
    // Fetch node types from an API or any other data source
    const fetchNodeTypes = async () => {
      try {
        // Replace this with your actual API call or data retrieval logic
        const response = await fetch('/api/nodetypes');
        const data = await response.json();
        setNodeTypes(data);
      } catch (error) {
        console.error('Failed to fetch node types:', error);
      }
    };

    // Fetch node settings from an API or any other data source
    const fetchNodeSettings = async () => {
      try {
        // Replace this with your actual API call or data retrieval logic
        const response = await fetch('/api/nodesettings');
        const data = await response.json();
        setNodeSettings(data);
      } catch (error) {
        console.error('Failed to fetch node settings:', error);
      }
    };

    fetchNodeTypes();
    fetchNodeSettings();
  }, []);

  return { nodeTypes, nodeSettings };
};

export default useNodeTypes;