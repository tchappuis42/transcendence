import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { AuthStatus, useAuth } from "./useAuth";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => {
	return useContext(SocketContext);
};

interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const { status, account } = useAuth();

	useEffect(() => {
		if (status === AuthStatus.Authenticated) {
			const newSocket = io("/", { query: { user: account?.id } });
			setSocket(newSocket);
			return () => {
				newSocket.disconnect();
			}
		};
		return undefined;
	}, [status]);

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
};