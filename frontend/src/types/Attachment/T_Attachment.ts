import { T_Call } from "../Call/T_Call";
import { T_CallInteraction } from "../Call/T_CallInteraction";

export interface T_Attachment {
    id: number;
    description: string;
    file: string;
    callId: number;
    call: T_Call;
    serviceOrderId: number;
    solicitationId: number;
    CallInteraction: T_CallInteraction[];
    createdAt: Date;
    updateAt: Date;
  }