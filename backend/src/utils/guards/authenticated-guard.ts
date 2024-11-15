import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Observable } from 'rxjs';
import { Socket } from "socket.io";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient<Socket>();
    console.log(
      "AuthenticatedGuard(테스트용 로그, client IP) : ",
      client.handshake.headers["x-real-ip"],
    );
    /*
    client.handshake 구조

    {
        headers: {
            upgrade: 'websocket',
            connection: 'Upgrade',
            host: 'localhost',
            'x-real-ip': '192.168.176.1',
            'x-forwarded-for': '192.168.176.1',
            'x-forwarded-proto': 'http',
            'sec-websocket-version': '13',
            'sec-websocket-key': 'aTecGCs4/MMBaKgMje1nsg==',
            'sec-websocket-extensions': 'permessage-deflate; client_max_window_bits'
        },
        time: 'Fri Nov 15 2024 06:26:25 GMT+0000 (Coordinated Universal Time)',
        address: '192.168.176.5',
        xdomain: false,
        secure: false,
        issued: 1731651985286,
        url: '/socket.io/?EIO=4&transport=websocket',
        query: [Object: null prototype] { EIO: '4', transport: 'websocket' },
    }
    */

    // TODO: 토큰 검증 로직

    return true;
  }
}
