import wsWrapper from "./wsWrapper";

export const WSSingletone = (() => {
    let _ip: string
    let _port: string
    let _instance: wsWrapper
    
    return {
        create: (ip: string, port: string) => {
            if (_instance == null) {
                _instance = new wsWrapper(ip, port)
            }
            if (_ip !== ip || _port !== port) {
                _instance.establishConnection(ip, port)
            }
            _ip = ip
            _port = port
            return _instance
        },
        get: () => {
            return _instance
        }
    }
})()