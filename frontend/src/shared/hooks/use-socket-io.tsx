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

  const initializeSocket = React.useCallback((accessToken: string) => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = undefined;
    }

    const socket = io(SOCKET_URL + optionsRef.current.url, {
      withCredentials: true,
      reconnectionDelayMax: 10000,
      reconnectionAttempts: 10,
      reconnection: true,
      transports: ["websocket"],
      auth: {
        token: accessToken,
      },
    });

    socketRef.current = socket;

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

    socket.on("error", (error: Error) => {
      setSocketState((prev) => ({
        ...prev,
        error,
      }));
      optionsRef.current.onError?.(error);
    });

    return socket;
  }, []);

  React.useEffect(() => {
    let isSubscribed = true;

    const connectSocket = async () => {
      try {
        const response = await fetch("/api/users/token");
        const json = await response.json();
        const { accessToken } = json.data;

        if (!accessToken) {
          throw new Error("Access token 이 없어 소켓을 연결할 수 없습니다!");
        }

        if (isSubscribed) {
          initializeSocket(accessToken);
        }
      } catch (error) {
        console.error(error);
      }
    };

    connectSocket();

    return () => {
      isSubscribed = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = undefined;
      }
    };
  }, [initializeSocket]);

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

  const once = React.useCallback(
    (event: string, callback: (data: unknown) => void) => {
      socketRef.current?.once(event, callback);
    },
    [],
  );

  const emit = React.useCallback((event: string, data: unknown) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  const reconnect = React.useCallback(() => {
    if (!socketState.isConnected && !socketState.isReconnecting) {
      socketRef.current?.connect();
    }
  }, [socketState.isConnected, socketState.isReconnecting]);

  const disconnect = React.useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = undefined; // 소켓 인스턴스 제거
    }
  }, []);

  return {
    ...socketState,
    emit,
    on,
    off,
    once,
    reconnect,
    disconnect,
    socket: socketRef.current,
  };
}
