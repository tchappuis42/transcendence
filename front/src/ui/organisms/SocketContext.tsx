import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { AuthStatus, useAuth } from "./useAuth";
import { useAccount } from "./useAccount";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => {
	return useContext(SocketContext);
};

interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const { status } = useAuth();

	useEffect(() => {
		/*	console.log(status)
			if (status === AuthStatus.Authenticated) {*/
		const newSocket = io("http://localhost:4000", { query: { user: "test" } });
		setSocket(newSocket);
		return () => {
			newSocket.disconnect();
		}
		/*};/*
			return undefined;*/
	}, [/*status*/]);

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
};