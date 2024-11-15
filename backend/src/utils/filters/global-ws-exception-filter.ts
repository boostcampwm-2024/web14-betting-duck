import { ArgumentsHost, Catch, WsExceptionFilter } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

@Catch()
export class GlobalWsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException | object, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient();

    const errorMessage =
      exception instanceof WsException
        ? exception.message
        : exception || "Internal server error";

    client.emit("error", { message: errorMessage });

    console.log(exception);

    // TODO: 상위로 에러 전파
    // throw exception;
  }
}
