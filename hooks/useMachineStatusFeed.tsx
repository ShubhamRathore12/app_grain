import { useEffect, useRef, useState } from 'react';

interface DeviceStatus {
  machineName: string;
  machineStatus?: boolean;
  internetStatus?: boolean;
  hasNewData?: boolean;
  lastUpdated?: string;
}

interface MachineStatusResponse {
  machines: DeviceStatus[];
  timestamp: string;
}

interface UseMachineStatusFeedReturn {
  status: MachineStatusResponse;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMachineStatusFeed(
  apiUrl: string = 'https://your-api-endpoint.com/machine-status',
  refreshInterval: number = 30000 // 30 seconds
): UseMachineStatusFeedReturn {
  const [status, setStatus] = useState<MachineStatusResponse>({
    machines: [],
    timestamp: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMachineStatus = async (): Promise<void> => {
    try {
      setError(null);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MachineStatusResponse = await response.json();
      
      setStatus({
        machines: data.machines || [],
        timestamp: data.timestamp || new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to fetch machine status:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      
      // Use mock data for development/fallback
      const mockData: MachineStatusResponse = {
        machines: [
          {
            machineName: 'GTPL_122_S7_1200',
            machineStatus: true,
            internetStatus: true,
            hasNewData: true,
            lastUpdated: new Date().toISOString(),
          },
          {
            machineName: 'KABO_200',
            machineStatus: false,
            internetStatus: true,
            hasNewData: false,
            lastUpdated: new Date().toISOString(),
          },
          {
            machineName: 'GTPL_108',
            machineStatus: true,
            internetStatus: false,
            hasNewData: true,
            lastUpdated: new Date().toISOString(),
          },
          // Add more mock data as needed
        ],
        timestamp: new Date().toISOString(),
      };
      
      setStatus(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async (): Promise<void> => {
    setIsLoading(true);
    await fetchMachineStatus();
  };

  useEffect(() => {
    // Initial fetch
    fetchMachineStatus();

    // Set up interval for periodic updates
    if (refreshInterval > 0) {
      intervalRef.current = setInterval(fetchMachineStatus, refreshInterval) as unknown as NodeJS.Timeout;
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [apiUrl, refreshInterval]);

  return {
    status,
    isLoading,
    error,
    refetch,
  };
}