import React from "react";
import { io, Socket } from "socket.io-client";
import { config } from "@shared/config/environment";

interface SocketOptions {
  url: string;
  accessToken?: string;
  onConnect?: () => void;
  onDisconnect?: (reason: Socket.DisconnectReason) => void;
  onError?: (error: Error) => void;
  onReconnectAttempt?: (attempt: number) => void;
  onReconnectFailed?: () => void;
}

interface SocketState {
  isConnected: boolean;
  isReconnecting: boolean;
  reconnectAttempt: number;
  error: Error | null;
}

const SOCKET_URL = config.socketUrl;

export function useSocketIO(options: SocketOptions) {
  const socketRef = React.useRef<Socket>();
  const [socketState, setSocketState] = React.useState<SocketState>({
    isConnected: false,
    isReconnecting: false,
    reconnectAttempt: 0,
    error: null,
  });
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const cleanupSocket = React.useCallback((socket: Socket) => {
    try {
      socket.offAny(); // 모든 리스너 제거
      socket.disconnect(); // 연결 종료
      setSocketState({
        isConnected: false,
        isReconnecting: false,
        reconnectAttempt: 0,
        error: null,
      });
    } catch (error) {
      console.error("Socket cleanup failed:", error);
    }
  }, []);

  const initializeSocket = React.useCallback(
    (accessToken: string) => {
      if (socketRef.current) {
        cleanupSocket(socketRef.current);
        socketRef.current = undefined;
      }

      const socket = io(SOCKET_URL + optionsRef.current.url, {
        withCredentials: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        autoConnect: false,
        transports: ["websocket"],
        auth: {
          token: accessToken,
        },
      });

      socket.on("connect", () => {
        setSocketState((prev) => ({
          ...prev,
          isConnected: true,
          isReconnecting: false,
          reconnectAttempt: 0,
          error: null,
        }));
        optionsRef.current.onConnect?.();
      });

      socket.on("disconnect", (reason) => {
        setSocketState((prev) => ({
          ...prev,
          isConnected: false,
          error: null,
        }));
        optionsRef.current.onDisconnect?.(reason);
      });

      socket.on("reconnect_attempt", (attempt) => {
        setSocketState((prev) => ({
          ...prev,
          isReconnecting: true,
          reconnectAttempt: attempt,
          error: null,
        }));
        optionsRef.current.onReconnectAttempt?.(attempt);
      });

      socket.on("connect_error", (error) => {
        setSocketState((prev) => ({
          ...prev,
          error: error instanceof Error ? error : new Error("Connection error"),
        }));
        optionsRef.current.onError?.(error);
      });

      socket.connect();
      socketRef.current = socket;
      return socket;
    },
    [cleanupSocket],
  );

  React.useEffect(() => {
    let isSubscribed = true;

    const connectSocket = async () => {
      try {
        const response = await fetch("/api/users/token");
        const json = await response.json();
        const { accessToken } = json.data;

        if (!accessToken) {
          throw new Error("Access token이 없어 소켓을 연결할 수 없습니다!");
        }

        if (isSubscribed) {
          initializeSocket(accessToken);
        }
      } catch (error) {
        console.error("Socket connection failed:", error);
        setSocketState((prev) => ({
          ...prev,
          error:
            error instanceof Error
              ? error
              : new Error("Unknown error occurred"),
        }));
      }
    };

    connectSocket();

    return () => {
      isSubscribed = false;
      if (socketRef.current) {
        cleanupSocket(socketRef.current);
        socketRef.current = undefined;
      }
    };
  }, [initializeSocket, cleanupSocket]);

  const on = React.useCallback(
    (event: string, callback: (data: unknown) => void) => {
      socketRef.current?.on(event, callback);
      return () => {
        socketRef.current?.off(event, callback);
      };
    },
    [],
  );

  const off = React.useCallback((eventName: string) => {
    socketRef.current?.off(eventName);
  }, []);

  const emit = React.useCallback((event: string, data: unknown) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
      return true;
    }

    return false;
  }, []);

  const reconnect = React.useCallback(() => {
    if (!socketState.isConnected && !socketState.isReconnecting) {
      socketRef.current?.connect();
    }
  }, [socketState.isConnected, socketState.isReconnecting]);

  const disconnect = React.useCallback(() => {
    if (socketRef.current) {
      cleanupSocket(socketRef.current);
      socketRef.current = undefined;
    }
  }, [cleanupSocket]);

  return {
    ...socketState,
    emit,
    on,
    off,
    reconnect,
    disconnect,
    socket: socketRef.current,
  };
}
