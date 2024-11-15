import React from "react";
import { io, Socket } from "socket.io-client";

interface SocketOptions {
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

const SOCKET_URL = "http://175.45.205.245/api/chat";

function useEffectOnce(callback: () => void) {
  const isUsedRef = React.useRef(false);
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    if (!isUsedRef.current) {
      isUsedRef.current = true;
      callbackRef.current();
    }
  }, []);
}

/**
 * 기본적으로 소켓을 연결 했을 경우 기본적으로 수행되어야 하는 메서드가 등록 되어 있습니다.
 *
 * @description
 * 다음과 같은 이벤트들을 처리합니다:
 *
 * - connect: 소켓이 연결되었을 때
 * - disconnect: 소켓이 연결이 끊어졌을 때
 * - reconnect_attempt: 소켓이 재연결을 시도할 때
 * - error: 소켓에서 에러가 발생했을 때
 *
 * 반환되는 객체를 이용하여 소켓의 연결 상태를 확인하고, 이벤트 리스너를 등록하거나 제거할 수 있습니다.
 */
export function useSocketIO(options: SocketOptions) {
  const socketRef = React.useRef<Socket>();
  const [socketState, setSocketState] = React.useState<SocketState>({
    isConnected: false,
    isReconnecting: false,
    reconnectAttempt: 0,
    error: null,
  });

  const initializeSocket = React.useCallback(() => {
    const socket = io(SOCKET_URL, {
      reconnectionDelayMax: 10000,
      reconnectionAttempts: 10,
      reconnection: true,
      transports: ["websocket"],
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
      options.onConnect?.();
    });

    socket.on("disconnect", (reason) => {
      setSocketState((prev) => ({
        ...prev,
        isConnected: false,
        error: null,
      }));
      options.onDisconnect?.(reason);
    });

    socket.on("reconnect_attempt", (attempt) => {
      setSocketState((prev) => ({
        ...prev,
        isReconnecting: true,
        reconnectAttempt: attempt,
        error: null,
      }));
      options.onReconnectAttempt?.(attempt);
    });

    socket.on("error", (error: Error) => {
      setSocketState((prev) => ({
        ...prev,
        error,
      }));
      options.onError?.(error);
    });
  }, [options]);

  useEffectOnce(() => {
    initializeSocket();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = undefined;
    };
  });

  /**
   * 기존에 등록된 이벤트 리스너를 제거하거나 새로운 이벤트 리스너를 등록하는 메서드
   */
  const on = React.useCallback(
    (event: string, callback: (data: unknown) => void) => {
      socketRef.current?.on(event, callback);
      return () => {
        socketRef.current?.off(event, callback);
      };
    },
    [],
  );

  /**
   * 특정 이벤트에 대한 콜백을 한번만 실행하는 메서드
   */
  const once = React.useCallback(
    (event: string, callback: (data: unknown) => void) => {
      socketRef.current?.once(event, callback);
    },
    [],
  );

  /**
   * 서버로 이벤트를 전송하는 메서드
   */
  const emit = React.useCallback((event: string, data: unknown) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  /**
   * 소켓의 연결이 끊어진 경우 다시 수동으로 연결하는 메서드
   */
  const reconnect = React.useCallback(() => {
    if (!socketState.isConnected && !socketState.isReconnecting) {
      socketRef.current?.connect();
    }
  }, [socketState.isConnected, socketState.isReconnecting]);

  /**
   * 소캣의 연결을 수동으로 끊는 메서드
   */
  const disconnect = React.useCallback(() => {
    socketRef.current?.disconnect();
  }, []);

  return {
    ...socketState,
    emit,
    on,
    once,
    reconnect,
    disconnect,
    socket: socketRef.current,
  };
}
